# sibnight cleanup notes

This snapshot rebuilds the polish layer from the last stable base instead of stacking more patch CSS.

What changed:
- rewrote `src/zz-prototype-layout.css` from scratch as a visual-only layer
- removed broad structural overrides that previously caused regressions
- fixed the topbar search double-layer/superposition by styling only the outer search wrapper
- locked message hover to the full list row without transforms
- made build ordering explicit in `scripts/lib/build-theme.js`
