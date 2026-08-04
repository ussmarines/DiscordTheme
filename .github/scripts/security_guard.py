#!/usr/bin/env python3
"""Check tracked files without printing detected secret or identity values."""
from __future__ import annotations
import hashlib, os, re, subprocess, sys, unicodedata
from pathlib import Path
MAX_BYTES = 20 * 1024 * 1024
ALLOWED_ENV = {".env.example", ".env.sample", ".env.template", ".env.dist"}
FORBIDDEN_NAMES = {".env", ".npmrc", ".pypirc", ".netrc", "auth.json", "credentials.json", "service-account.json", "id_rsa", "id_ed25519"}
FORBIDDEN_SUFFIXES = {".pem", ".key", ".p12", ".pfx", ".jks", ".keystore", ".tfstate"}
PRIVATE_KEY_MARKERS = (b"-----BEGIN PRIVATE KEY-----", b"-----BEGIN ENCRYPTED PRIVATE KEY-----", b"-----BEGIN RSA PRIVATE KEY-----", b"-----BEGIN OPENSSH PRIVATE KEY-----", b"-----BEGIN EC PRIVATE KEY-----")
FORBIDDEN_IDENTITY_HASHES = {"01e76a28977874f8b72265d0d39fa47c4105083556013f84ded1dad7798d01f7", "ccb810ff1aea7ea61ea5c412bf549ca31b9d217d34357893d0ed97a54303b666", "ec29e4a50ab3326b494e6126f3299ed436b1c24d3c508e364ee48345fc6c7a0b", "a6710e26418bd4c6d2ee839605cd40c313ac3b79e599c1be31aa2bd711c665e3"}
TOKEN_RE = re.compile(r"[a-z0-9]+")
ASCII_TOKEN_RE = re.compile(rb"[A-Za-z0-9]{3,}")
def tracked_paths():
    result = subprocess.run(["git", "ls-files", "-z"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return [Path(os.fsdecode(item)) for item in result.stdout.split(b"\0") if item]
def tokens(text):
    normalized = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii").lower()
    return TOKEN_RE.findall(normalized)
def identity_match(values):
    candidates = list(values) + ["".join(values[i:i+2]) for i in range(max(0, len(values)-1))] + ["".join(values[i:i+3]) for i in range(max(0, len(values)-2))]
    return any(hashlib.sha256(value.encode()).hexdigest() in FORBIDDEN_IDENTITY_HASHES for value in candidates)
def main():
    findings = set()
    for path in tracked_paths():
        name = path.name.lower()
        if name.startswith(".env") and name not in ALLOWED_ENV: findings.add(f"{path}: tracked environment file")
        if name in FORBIDDEN_NAMES or (name.startswith("credentials.") and name.endswith(".json")): findings.add(f"{path}: tracked credential file")
        if path.suffix.lower() in FORBIDDEN_SUFFIXES: findings.add(f"{path}: tracked key or credential container")
        try:
            if path.stat().st_size > MAX_BYTES: continue
            data = path.read_bytes()
        except OSError:
            findings.add(f"{path}: unreadable tracked file"); continue
        if any(marker in data for marker in PRIVATE_KEY_MARKERS): findings.add(f"{path}: private-key material marker")
        if b"\0" in data:
            binary_tokens = [v.decode("ascii", "ignore").lower() for v in ASCII_TOKEN_RE.findall(data)]
            if identity_match(binary_tokens): findings.add(f"{path}: forbidden personal identifier in binary data")
            continue
        for line_number, line in enumerate(data.decode("utf-8", "replace").splitlines(), 1):
            if identity_match(tokens(line)): findings.add(f"{path}:{line_number}: forbidden personal identifier")
    if findings:
        print("Security guard blocked the repository state:")
        for finding in sorted(findings): print(f"- {finding}")
        print("Matched values were not printed. Remove or replace the material and rotate any exposed secret.")
        return 1
    print("Security guard passed: no tracked credential file, private-key marker or forbidden identity reference found.")
    return 0
if __name__ == "__main__": sys.exit(main())
