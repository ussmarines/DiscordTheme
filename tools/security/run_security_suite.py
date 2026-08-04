#!/usr/bin/env python3
from __future__ import annotations
import argparse,json,os,shutil,subprocess,sys
from datetime import datetime,timezone
from pathlib import Path
def run(n,c,r,w,o=None):
 h=o.open('wb')if o else None
 try:k=subprocess.run(c,cwd=w,stdout=h or subprocess.DEVNULL,stderr=subprocess.DEVNULL).returncode
 except OSError:k=127
 finally:
  if h:h.close()
 r[n]={'exit_code':k,'status':'passed'if k==0 else'findings-or-error'}
def main():
 p=argparse.ArgumentParser();p.add_argument('--profile',choices=('quick','full'),default='full');p.add_argument('--enforce',action='store_true');a=p.parse_args();w=Path(__file__).resolve().parents[2];m=Path(os.environ['LOCALAPPDATA'])/'ussmarines-security-tools'/'installed-tools.json'
 if not m.is_file():raise RuntimeError('Installer les outils une fois depuis SpaceShooter ou MailPerch.')
 t=json.loads(m.read_text(encoding='utf-8-sig'))['tools'];d=w/'tools/security/.reports'/datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S');d.mkdir(parents=True);r={};g=[sys.executable,str(w/'.github/scripts/security_guard.py'),'--report',str(d/'identity.json')];g+=['--history']if a.profile=='full'else[];run('identity',g,r,w);g=[t['gitleaks']['executable'],'git'if a.profile=='full'else'dir','.'];g+=['--log-opts=--all']if a.profile=='full'else[];g+=['--redact=100','--exit-code=2','--report-format=json',f"--report-path={d/'gitleaks.json'}"];run('gitleaks',g,r,w);run('opengrep',[t['opengrep']['executable'],'scan','--config',str(w/'.security/opengrep/project-security.yml'),'--json-output',str(d/'opengrep.json'),'--error',str(w)],r,w);v=t['trivy']['executable'];run('trivy',[v,'filesystem','--scanners','vuln,misconfig','--format','json','--output',str(d/'trivy.json'),'--exit-code','1',str(w)],r,w);run('sbom',[v,'filesystem','--format','cyclonedx','--output',str(d/'sbom.json'),str(w)],r,w)
 if(w/'package-lock.json').is_file()and shutil.which('npm.cmd'):run('npm',['npm.cmd','audit','--omit=dev','--json'],r,w,d/'npm.json')
 c=shutil.which('composer.bat')or shutil.which('composer');
 if(w/'composer.lock').is_file()and c:run('composer',[c,'audit','--locked','--format=json'],r,w,d/'composer.json')
 run('zizmor',[t['zizmor']['executable'],'--offline','--format','json',str(w)],r,w,d/'zizmor.json');f=sum(x['exit_code']!=0 for x in r.values());(d/'summary.json').write_text(json.dumps({'safe_output':True,'matched_values_included':False,'failed_checks':f,'results':r},indent=2));print(d);return 1 if a.enforce and f else 0
if __name__=='__main__':raise SystemExit(main())
