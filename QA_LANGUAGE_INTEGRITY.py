from pathlib import Path
import re, sys, json
ROOT=Path(__file__).resolve().parent
SUP={'ar','en','nl'}
# Pages added/changed from v4.3.85 onward MUST be listed here only after they contain all 3 locale blocks
# or an equivalent page-specific i18n module. Update BASELINE_LEGACY only when a legacy page is fully repaired.
BASELINE_LEGACY=set(json.loads((ROOT/'LANGUAGE_LEGACY_BASELINE.json').read_text(encoding='utf-8')))
fail=[]
for p in ROOT.glob('*.html'):
    t=p.read_text(encoding='utf-8',errors='ignore')
    ar=len(re.findall(r'[\u0600-\u06ff]',t))
    if ar<120: continue
    locales=set(re.findall(r'data-locale=[\"\'](ar|en|nl)[\"\']',t))
    stem=re.escape(p.stem)
    specific=bool(re.search(rf'{stem}-i18n\.js',t)) or 'data-lux-i18n-complete' in t
    if p.name not in BASELINE_LEGACY and not (SUP<=locales or specific):
        fail.append(f'{p.name}: Arabic-rich new page without AR/EN/NL localization contract')
if fail:
    print('LANGUAGE INTEGRITY: FAIL')
    print('\n'.join('- '+x for x in fail));sys.exit(1)
print('LANGUAGE INTEGRITY: PASS')
