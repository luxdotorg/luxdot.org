# جرد الأصل العربي في LuxDot

تم تشغيل الفحص الآلي على **543 صفحة HTML**. يفحص التقرير النص الثابت المرئي بعد استبعاد السكربتات والأنماط وSVG، لذلك يكشف الصفحات التي ما يزال محتواها التحريري في المصدر لاتينياً/إنجليزياً حتى لو حاولت طبقات JavaScript تعريبها لاحقاً.

## الخلاصة

| التصنيف | العدد |
|---|---:|
| أصل إنجليزي/لاتيني واضح | 29 |
| مختلط يحتاج مراجعة/ترحيل | 32 |
| أصل عربي غالب | 445 |
| نص ثابت قليل | 37 |

إجمالي قائمة الأولوية الحالية: **61 صفحة**. وجود صفحة في القائمة لا يعني بالضرورة أن كل كلمة فيها يجب تعريبها؛ الأسماء الأصلية والنقوش وعناوين المصادر يمكن أن تبقى بلغتها. الهدف هو أن يصبح **المتن التحريري العربي هو الأصل** وأن تكون اللغات الأخرى ترجمات عنه.

## أصل إنجليزي/لاتيني واضح — الأولوية الأعلى

- `belief-violence-memory.html`
- `buddhist.html`
- `chaam-deep-history.html`
- `gita.html`
- `grote-kerk-north-transept.html`
- `hendrick-busman.html`
- `human-writing-geometry-atlas.html`
- `humanity.html`
- `jan-van-velthoven.html`
- `janssen-family.html`
- `kevelaer-chaam-timeline.html`
- `knowledge-graph.html`
- `manuaal-1422-people-land.html`
- `media.html`
- `nusantara.html`
- `paulina-withagen-rescue.html`
- `prince-claus-bridge.html`
- `projects.html`
- `research/circle-of-care-25km-original.html`
- `tongerlo-fourteen-churches.html`
- `urania-nassau.html`
- `van-velthoven-family.html`
- `verwithagen-erasmus.html`
- `west-brabant-family-memory-network.html`
- `withagen-chaam-toponym.html`
- `withagen-family.html`
- `withagen-jansen-dekoning.html`
- `withagen-van-den-boom.html`
- `withagen-wwii.html`

## صفحات مختلطة — تحتاج مراجعة بنيوية

- `border-chapels-route.html`
- `brabant-research-architecture.html`
- `burial-settlement-layers.html`
- `chaam-genealogy.html`
- `chaam-midwives.html`
- `chaam-sacred-memory.html`
- `everyday-good.html`
- `hank-raamsdonk-war-memory.html`
- `historic-brabant-crossborder.html`
- `home.html`
- `hoogstraten.html`
- `jansen-de-koning-network.html`
- `java-script.html`
- `jochem-van-velthoven.html`
- `luxdot-hypotheses.html`
- `messianic-names-numbers-atlas.html`
- `name-date-matrix.html`
- `oosterhout-1422-people-land.html`
- `pet-goat-apocalypse-media.html`
- `polleke-mummy-cat.html`
- `praxis.html`
- `sacred-120km-network.html`
- `shaam-brabant-network.html`
- `st-bartholomew-memory.html`
- `ter-brake-cadastral-investigation.html`
- `ter-brake-power-network.html`
- `thijs-loss-consolation.html`
- `totalitarian-victims-memory.html`
- `van-velthoven-grote-kerk.html`
- `war-reconstruction-memory.html`
- `what-is-luxdot.html`
- `willibrord-echternach.html`

## ملاحظة عن `what-is-luxdot.html`

بعد بدء الترحيل أصبحت العربية فيه هي الأصل والفallback، والإنجليزية نسخة ترجمة صريحة. سيظل الفاحص القديم يراه «مختلطاً» لأنه يقيس مجموع النصين داخل HTML نفسه؛ لذلك سيُطوَّر الفاحص في المرحلة التالية ليتعرف على وسم `data-canonical="ar"` ويصنّف الصفحات المهاجرة بنيوياً بصورة أدق.

## قاعدة الترحيل

لا نحل المشكلة بإخفاء الإنجليزية عبر CSS أو باستبدال كلمات منفردة. لكل صفحة ذات محتوى تحريري نثبت متناً عربياً كاملاً أولاً، ثم ترتبط به الترجمات. إذا لم تتوفر ترجمة مكتملة للغة المطلوبة، يظهر الأصل العربي بدلاً من الرجوع إلى الإنجليزية.
