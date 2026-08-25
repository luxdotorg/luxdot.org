from pathlib import Path

p=Path("calendar.html")
if not p.exists():
    raise SystemExit("calendar.html not found. Run this from the luxdot.org repository root.")

s=p.read_text(encoding="utf-8")

MARK="LUXDOT-KALKI-2026-08-25"
if MARK in s:
    print("Kalki update already installed; no changes made.")
    raise SystemExit(0)

block=r"""
<!-- LUXDOT-KALKI-2026-08-25 -->
<section id="lux-kalki-20260825" style="max-width:1100px;margin:14px auto;padding:0 20px">
  <article style="border:1px solid #4f5530;border-radius:16px;padding:16px;background:#0b1007">
    <div style="font:800 10px Arial;color:#d2b15b;letter-spacing:.12em">SAVIOR ATLAS · KALKI · 25 AUG 2026</div>
    <h3 style="margin:.65em 0">Kalki · النصوص القديمة مقابل ادعاءات 2026</h3>
    <p style="line-height:1.9;color:#b7c9bd">
      فحص نصّي يفصل بين وصف Kalki في النصوص البورانية الأساسية وبين الادعاءات الحديثة التي تحدد ظهوره في 2026.
      النصوص الأساسية لا تعطي سنة ميلادية محددة. بالتوازي، تُسجَّل قراءة Bhavishya Malika / Satya Yuga 2032
      بوصفها ادعاءً لحركة معاصرة، لا تحققًا مثبتًا للنبوءة.
    </p>
    <p style="font-size:10px;color:#87988c">
      التصنيف: المخلّص / نبوءات · الحالة المنهجية: نص أصلي ≠ تفسير معاصر ≠ تحقق مثبت
    </p>
    <a href="savior-atlas.html" style="color:#d2b15b">أطلس المخلّص ↗</a>
  </article>
</section>
"""

needle='</main>'
if needle not in s:
    raise SystemExit("Could not find </main> in current calendar.html; nothing changed.")

s=s.replace(needle, block+"\n"+needle, 1)
p.write_text(s,encoding="utf-8")
print("Updated calendar.html successfully. Existing live content was preserved.")
