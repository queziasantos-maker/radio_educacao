# Responsive fix

This version addresses the reported regression:

- The canvas is resized again after the HUD becomes visible.
  This fixes the missing answer cards and restores the full visible scene.
- Desktop question-box geometry is no longer controlled by mobile-oriented
  JavaScript rules.
- Desktop keeps the original box proportions and now has a clear hierarchy:
  context < source < question.
- Smartphone question-box behavior is preserved from the previous working
  version.
- Smartphone answer cards are calculated from the actual canvas width and
  remain inside the viewport.
- Portrait and landscape smartphone layouts are supported.
