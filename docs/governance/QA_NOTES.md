# QA Scope v1

The first governance release intentionally uses dependency-light checks suitable for LuxDot's static-first repository:

- required governance and entry files exist;
- canonical `VERSION` format is valid;
- JavaScript files pass Node syntax parsing;
- HTML files pass a basic parser sanity check;
- a focused credential guard checks common private credential forms.

These checks are intentionally conservative. They do not claim to prove semantic correctness, link validity, accessibility, translation quality or research accuracy. Those gates can be expanded incrementally after the baseline workflow is observed on the existing repository.
