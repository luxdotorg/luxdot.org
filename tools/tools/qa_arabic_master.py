from pathlib import Path
from bs4 import BeautifulSoup
import subprocess, re, sys
ROOT=Path(__file__).resolve().parents[1]
errors=[]
htmls=list(ROOT.glob('*.html'))+list((ROOT/'research').glob('*.html'))
for p in htmls:
    soup=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
    ids=[]
    for e in soup.find_all(id=True):
        i=e.get('id');
        if i in ids: errors.append(f'duplicate id {p.relative_to(ROOT)}::{i}')
        ids.append(i)
    for tag,attr in [('a','href'),('script','src'),('link','href'),('img','src')]:
        for e in soup.find_all(tag):
            u=e.get(attr)
            if not u or u.startswith(('http://','https://','#','mailto:','tel:','data:','javascript:')): continue
            u=u.split('?',1)[0].split('#',1)[0]
            if u and not (p.parent/u).resolve().exists(): errors.append(f'missing {p.relative_to(ROOT)} -> {u}')
    for z in soup.select('[data-locale="ar"]'):
        txt=' '.join(z.stripped_strings)
        if re.search(r'\b(?:LuxDot|LUXDOT|First Guardian)\b',txt): errors.append(f'latin brand in Arabic zone: {p.relative_to(ROOT)}')
for p in list(ROOT.glob('*.js'))+list((ROOT/'research').glob('*.js')):
    r=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
    if r.returncode: errors.append(f'JS syntax {p.relative_to(ROOT)}: {r.stderr.strip()}')
print('PASS' if not errors else 'FAIL')
for x in errors: print('-',x)
sys.exit(1 if errors else 0)
