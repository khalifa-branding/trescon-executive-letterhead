# Task List: Role-Based Editor Layout & Admin Dashboard Controls

- [ ] Create/Update Implementation Plan (`implementation_plan.md`)
- [ ] Refactor Web Layout (`letterhead.html` and `index.html`)
  - [ ] Add full-width Top Header Bar hosting logo, Quill formatting toolbar, actions, and Admin Toggle Cog
  - [ ] Re-purpose left sidebar as collapsible Admin Sidebar (`#admin-sidebar`)
  - [ ] Add Admin features: Regional Office Location preset, Watermark Toggle, and Signature presets
- [ ] Implement Role & Layout Logic (`letterhead.js`)
  - [ ] Detect `role=admin` or `admin=true` URL query parameter
  - [ ] Hide Admin Sidebar and Toggle button for standard users (default)
  - [ ] Render Quill editor inside `#quill-editor-canvas` on A4 sheet
  - [ ] Bind Quill toolbar to top header bar `#editor-top-toolbar`
  - [ ] Add Watermark Toggle handler
  - [ ] Add Signature presets handler (injects preset signature blocks into Quill)
- [ ] Stylize Interface Layout (`letterhead.css`)
  - [ ] Style top header bar (dark theme glassmorphism, responsive alignment)
  - [ ] Style collapsible admin sidebar panels and switches
  - [ ] Style sheet watermark background layout
  - [ ] Calibrate print styles to hide top header bar and admin sidebar during print/export
- [ ] Run Deployment Script (`deploy-letterhead.ps1`)
