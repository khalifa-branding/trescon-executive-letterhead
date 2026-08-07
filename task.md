# Task List: Role-Based Editor Layout & Admin Dashboard Controls

- [x] Create/Update Implementation Plan (`implementation_plan.md`)
- [x] Refactor Web Layout (`letterhead.html` and `index.html`)
  - [x] Add full-width Top Header Bar hosting logo, Quill formatting toolbar, actions, and Admin Toggle Cog
  - [x] Re-purpose left sidebar as collapsible Admin Sidebar (`#admin-sidebar`)
  - [x] Add Admin features: Regional Office Location preset, Watermark Toggle, and Signature presets
- [x] Implement Role & Layout Logic (`letterhead.js`)
  - [x] Detect `role=admin` or `admin=true` URL query parameter
  - [x] Hide Admin Sidebar and Toggle button for standard users (default)
  - [x] Render Quill editor inside `#quill-editor-canvas` on A4 sheet
  - [x] Bind Quill toolbar to top header bar `#editor-top-toolbar`
  - [x] Add Watermark Toggle handler
  - [x] Add Signature presets handler (injects preset signature blocks into Quill)
- [x] Stylize Interface Layout (`letterhead.css`)
  - [x] Style top header bar (dark theme glassmorphism, responsive alignment)
  - [x] Style collapsible admin sidebar panels and switches
  - [x] Style sheet watermark background layout
  - [x] Calibrate print styles to hide top header bar and admin sidebar during print/export
- [x] Run Deployment Script (`deploy-letterhead.ps1`)
