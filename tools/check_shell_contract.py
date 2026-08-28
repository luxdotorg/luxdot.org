from pathlib import Path

shell = Path('player-shell.html').read_text(encoding='utf-8')
required = [
    "history.replaceState({luxdotShell:true,page:current},'',publicUrl(current))",
    "history.pushState({luxdotShell:true,page:current},'',publicUrl(current))",
    "e.origin!==location.origin",
    "u.searchParams.delete('luxembed')",
    "frame.src=embedded(current)",
]
missing = [needle for needle in required if needle not in shell]
if missing:
    raise SystemExit('Shell navigation contract missing: ' + ', '.join(missing))
if "page='+encodeURIComponent" in shell:
    raise SystemExit('Shell must not expose nested player-shell URLs after startup.')
print('Shell navigation contract passed.')
