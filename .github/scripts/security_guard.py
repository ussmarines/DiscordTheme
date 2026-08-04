#!/usr/bin/env python3
"""Scan tracked files and Git history without printing matched private values."""
from __future__ import annotations
import argparse
from dataclasses import asdict,dataclass
from datetime import datetime,timezone
import hashlib,json,os,re,subprocess,sys,unicodedata
from pathlib import Path
MAX=20*1024*1024;ENVS={'.env.example','.env.sample','.env.template','.env.dist'};NAMES={'.env','.pypirc','.netrc','auth.json','credentials.json','service-account.json','id_rsa','id_ed25519'};SUFFIX={'.pem','.key','.p12','.pfx','.jks','.keystore','.tfstate'}
HASHES={'01e76a28977874f8b72265d0d39fa47c4105083556013f84ded1dad7798d01f7','ccb810ff1aea7ea61ea5c412bf549ca31b9d217d34357893d0ed97a54303b666','ec29e4a50ab3326b494e6126f3299ed436b1c24d3c508e364ee48345fc6c7a0b','a6710e26418bd4c6d2ee839605cd40c313ac3b79e599c1be31aa2bd711c665e3'}
KEYS=tuple(b'-----BEGIN '+v for v in(b'PRIVATE KEY-----',b'ENCRYPTED PRIVATE KEY-----',b'RSA PRIVATE KEY-----',b'OPENSSH PRIVATE KEY-----',b'EC PRIVATE KEY-----'));SELF='.github/scripts/security_guard.py';TOK=re.compile(r'[a-z0-9]+');BTOK=re.compile(rb'[A-Za-z0-9]{3,}')
@dataclass(frozen=True)
class F:scope:str;location:str;category:str
def git(a,d=None):return subprocess.run(['git',*a],input=d,check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE).stdout
def toks(s):return TOK.findall(unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower())
def match(a):
 c=list(a)+[''.join(a[i:i+2])for i in range(max(0,len(a)-1))]+[''.join(a[i:i+3])for i in range(max(0,len(a)-2))]
 return any(hashlib.sha256(x.encode()).hexdigest()in HASHES for x in c)
def content(d,k=True):
 r=[]
 if k and any(x in d for x in KEYS):r.append((None,'private-key material marker'))
 if b'\0'in d:
  if match([x.decode('ascii','ignore').lower()for x in BTOK.findall(d)]):r.append((None,'forbidden personal identifier in binary data'))
  return r
 for n,l in enumerate(d.decode('utf-8','replace').splitlines(),1):
  if match(toks(l)):r.append((n,'forbidden personal identifier'))
 return r
def tree():
 f=[]
 for p in[Path(os.fsdecode(x))for x in git(['ls-files','-z']).split(b'\0')if x]:
  n=p.name.lower()
  if n.startswith('.env')and n not in ENVS:f.append(F('tracked-tree',str(p),'tracked environment file'))
  if n in NAMES:f.append(F('tracked-tree',str(p),'tracked credential file'))
  if p.suffix.lower()in SUFFIX:f.append(F('tracked-tree',str(p),'tracked key or credential container'))
  try:
   if p.stat().st_size>MAX:continue
   d=p.read_bytes()
  except OSError:f.append(F('tracked-tree',str(p),'unreadable tracked file'));continue
  for ln,c in content(d,p.as_posix()!=SELF):f.append(F('tracked-tree',f'{p}:{ln}'if ln else str(p),c))
 return f
def metadata():
 out=git(['log','--all','--format=%H%x1f%an%x1f%ae%x1f%cn%x1f%ce%x1f%B%x1e']).decode('utf-8','replace');f=[];ns=('author name','author email','committer name','committer email','message')
 for rec in out.split('\x1e'):
  p=rec.strip('\n').split('\x1f',5)
  if len(p)!=6:continue
  sha,*vs=p
  for n,v in zip(ns,vs):
   if match(toks(v)):f.append(F('git-history',f'commit:{sha[:12]}',f'forbidden personal identifier in {n}'))
 return f
def blobs():
 o={}
 for l in git(['rev-list','--objects','--all']).decode('utf-8','replace').splitlines():oid,_,p=l.partition(' ');o.setdefault(oid,p)
 ch=git(['cat-file','--batch-check=%(objectname) %(objecttype) %(objectsize)'],('\n'.join(o)+'\n').encode()).decode();ids=[]
 for l in ch.splitlines():
  p=l.split()
  if len(p)==3 and p[1]=='blob'and int(p[2])<=MAX:ids.append(p[0])
 pr=subprocess.Popen(['git','cat-file','--batch'],stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL);assert pr.stdin and pr.stdout;f=[]
 for oid in ids:
  pr.stdin.write((oid+'\n').encode());pr.stdin.flush();h=pr.stdout.readline().decode().split()
  if len(h)!=3:continue
  d=pr.stdout.read(int(h[2]));pr.stdout.read(1);p=o.get(oid)or'<unknown-path>'
  for ln,c in content(d,p!=SELF):f.append(F('git-history',f'blob:{oid[:12]}:{p}'+(f':{ln}'if ln else''),c.replace('forbidden personal identifier','forbidden personal identifier in historical content')))
 pr.stdin.close();pr.wait(timeout=30);return f
def main():
 p=argparse.ArgumentParser();p.add_argument('--history',action='store_true');p.add_argument('--report',type=Path);a=p.parse_args();f=tree()
 if a.history:f+=metadata()+blobs()
 f=sorted(set(f),key=lambda x:(x.scope,x.location,x.category))
 if a.report:a.report.parent.mkdir(parents=True,exist_ok=True);a.report.write_text(json.dumps({'schema_version':1,'generated_at_utc':datetime.now(timezone.utc).isoformat(),'history_enabled':a.history,'safe_output':True,'matched_values_included':False,'status':'findings'if f else'passed','finding_count':len(f),'findings':[asdict(x)for x in f]},indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
 if f:
  for x in f:print(f'- {x.location}: {x.category} [{x.scope}]')
  print('No matched value was printed.');return 1
 print('Security guard passed without exposing matched values.');return 0
if __name__=='__main__':sys.exit(main())
