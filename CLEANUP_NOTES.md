# Cleanup notes

- Removed `src/zz-prototype-layout.css`.
- Merged its stable layout rules into existing source files:
  - `src/main.css`
  - `src/top-bar.css`
  - `src/animations.css`
  - `src/chatbar.css`
- Simplified the top search styling:
  - only the outer top-bar search wrapper is styled as the visible block
  - inner search elements are transparent and fill the wrapper
  - removed the double-block effect that was shrinking the real search field
- Kept Discord structural layout untouched:
  - no new grid/flex overrides for the native top bar
  - no new sidebar structure overrides
  - no broad right-panel overrides
