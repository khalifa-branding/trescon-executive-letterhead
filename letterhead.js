/**
 * Trescon Global Executive Letterhead Studio Logic (Direct WYSIWYG Composition Architecture)
 */

// Preset Address Database
const ADDRESS_PRESETS = {
  bangalore: {
    entity: "Trescon Global Business Solutions Pvt Ltd.",
    address: "1st floor, Prom’S Complex, 3h, 7th C Main Rd, 3rd Block Koramangala, Bengaluru, Karnataka – 560034",
    extra: "",
    cin: "CIN: U74900KA2016PTC086221",
    email: "info@tresconglobal.com",
    web: "tresconglobal.com"
  },
  manipal: {
    entity: "Trescon Global Business Solutions Pvt Ltd.",
    address: "H (23), 5th Floor, Pragathi Business District #412, above Reliance Trends, Laxmindra Nagar, Manipal, Udupi, Karnataka – 576104",
    extra: "",
    cin: "CIN: U74900KA2016PTC086221",
    email: "info@tresconglobal.com",
    web: "tresconglobal.com"
  },
  mangalore: {
    entity: "Trescon Global Business Solutions Pvt Ltd.",
    address: "1st Floor, Bejai Post, Ajantha Business Center, Bejai – Kapikad Road, Mangaluru, Karnataka – 575004",
    extra: "",
    cin: "CIN: U74900KA2016PTC086221",
    email: "info@tresconglobal.com",
    web: "tresconglobal.com"
  },
  dubai: {
    entity: "Trescon Events Organizing Ltd.",
    address: "Office 806, 8th Floor, Liberty House, Dubai International Financial Centre, DIFC, Dubai, UAE",
    extra: "License number CL6668.",
    cin: "",
    email: "uae@tresconglobal.com",
    web: "tresconglobal.com"
  }
};

// Global Update Footer & Office Preset Function
window.updateFooter = function() {
  const selectElem = document.getElementById('office-preset');
  const selectedKey = selectElem ? selectElem.value : 'bangalore';
  const data = ADDRESS_PRESETS[selectedKey] || ADDRESS_PRESETS.bangalore;

  const companyElem = document.getElementById('preview-footer-company');
  const addressElem = document.getElementById('preview-footer-address');
  const emailElem = document.getElementById('preview-email');
  const webElem = document.getElementById('preview-web');

  if (companyElem) companyElem.textContent = data.entity;

  let inlineAddr = data.address;
  if (data.cin) {
    inlineAddr += `<br>[${data.cin}]`;
  } else if (data.extra) {
    inlineAddr += `<br>[${data.extra}]`;
  }

  if (addressElem) addressElem.innerHTML = inlineAddr;
  if (emailElem) emailElem.textContent = data.email;
  if (webElem) webElem.textContent = data.web;
};

// Real-time A4 Page Overflow Verification
window.checkOverflow = function() {
  const editor = document.querySelector('.ql-editor');
  const container = document.getElementById('quill-editor-canvas');
  if (!editor || !container) return;
  
  // Available height verification
  const isOverflowing = editor.scrollHeight > container.clientHeight;
  
  let warningBanner = document.getElementById('overflow-warning');
  if (isOverflowing) {
    if (!warningBanner) {
      warningBanner = document.createElement('div');
      warningBanner.id = 'overflow-warning';
      warningBanner.className = 'no-print';
      warningBanner.style.cssText = 'position: fixed; top: 70px; left: 50%; transform: translateX(-50%); background-color: #ef4444; color: white; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; z-index: 1000; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); display: flex; align-items: center; gap: 8px; pointer-events: none;';
      warningBanner.innerHTML = `
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        Warning: Content exceeds A4 page height! Please shorten text to fit on one page.
      `;
      document.body.appendChild(warningBanner);
    }
  } else {
    if (warningBanner) {
      warningBanner.remove();
    }
  }
};

// Update Sheet Margin Styles (Admin Setting)
window.updateMargins = function() {
  const selectElem = document.getElementById('margins-preset');
  const sheet = document.getElementById('letterhead-sheet');
  if (!selectElem || !sheet) return;

  const selectedValue = selectElem.value;
  
  // Remove all margin classes
  sheet.classList.remove('margins-normal', 'margins-compact', 'margins-wide');
  sheet.classList.add(`margins-${selectedValue}`);
  
  // Persist in localStorage so users/writers get the admin margin layout by default
  localStorage.setItem('trescon_letterhead_margins', selectedValue);
  
  // Verify overflow immediately after margin adjustment
  if (window.checkOverflow) window.checkOverflow();
  
  // Re-scale container
  if (window.autoFitCanvas) window.autoFitCanvas();
};

// Toggle Watermark Overlay (Admin Setting)
window.toggleWatermark = function() {
  const toggle = document.getElementById('watermark-toggle');
  const watermark = document.getElementById('watermark-logo-overlay');
  if (!toggle || !watermark) return;
  if (toggle.checked) {
    watermark.style.display = 'block';
  } else {
    watermark.style.display = 'none';
  }
};

// Toggle Symmetrical Preview Mode (Hides formatting toolbar & sets editor to read-only)
window.togglePreviewMode = function() {
  const body = document.body;
  const btnText = document.getElementById('preview-btn-text');
  if (!window.quill) return;

  const isPreview = body.classList.toggle('preview-active');
  
  if (isPreview) {
    window.quill.enable(false); // set editor to read-only
    if (btnText) btnText.textContent = "Edit Letter";
  } else {
    window.quill.enable(true); // set editor back to editable
    if (btnText) btnText.textContent = "Preview";
  }
  
  // Update overflow state after toggling editor modes
  if (window.checkOverflow) window.checkOverflow();
};

// Inject Signature Preset Block at Cursor or End of Document
window.injectSignature = function(preset) {
  if (!window.quill) return;
  
  let sigHtml = '';
  if (preset === 'chairman') {
    sigHtml = `
      <p><br></p>
      <p>Warm regards,</p>
      <p><br></p>
      <p><strong>Mohammed Saleem</strong></p>
      <p>Founder & Chairman</p>
      <p>Trescon Global Business Solutions Pvt. Ltd.</p>
    `;
  } else if (preset === 'ceo') {
    sigHtml = `
      <p><br></p>
      <p>Sincerely yours,</p>
      <p><br></p>
      <p><strong>Sandeep Bahl</strong></p>
      <p>Chief Executive Officer</p>
      <p>Trescon Global Business Solutions Pvt. Ltd.</p>
    `;
  }

  // Append preset HTML block safely to Quill editor contents
  const currentHtml = window.quill.root.innerHTML;
  window.quill.root.innerHTML = currentHtml + sigHtml;
  window.quill.focus();
};

// Toggle Admin Sidebar panel view
window.toggleAdminSidebar = function() {
  const sidebar = document.getElementById('admin-sidebar');
  if (!sidebar) return;
  
  if (sidebar.style.marginLeft === '0px' || sidebar.style.marginLeft === '') {
    sidebar.style.marginLeft = '-300px';
  } else {
    sidebar.style.marginLeft = '0px';
  }
  
  // Re-fit canvas layout scaling after transition animation finishes
  setTimeout(() => {
    if (window.autoFitCanvas) window.autoFitCanvas();
  }, 310);
};

// Export A4 sheet directly to high-fidelity PDF via html2pdf
window.exportToPdf = function() {
  const element = document.getElementById('letterhead-sheet');
  const selectElem = document.getElementById('office-preset');
  const selectedKey = selectElem ? selectElem.value : 'bangalore';

  // Force clean preview view during export
  const body = document.body;
  const originalPreviewState = body.classList.contains('preview-active');
  if (!originalPreviewState) {
    body.classList.add('preview-active');
    if (window.quill) window.quill.enable(false);
  }

  // Temporarily reset CSS transform scaling to ensure pixel-perfect 1:1 html2canvas resolution
  element.style.transform = 'none';
  element.style.width = '210mm';
  element.style.height = '297mm';
  element.style.margin = '0';

  const opt = {
    margin: 0,
    filename: `Trescon_Letterhead_${selectedKey.toUpperCase()}_${new Date().toISOString().slice(0, 10)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      logging: false,
      scrollY: 0,
      scrollX: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    // Restore layout states
    if (!originalPreviewState) {
      body.classList.remove('preview-active');
      if (window.quill) window.quill.enable(true);
    }
    if (window.autoFitCanvas) {
      window.autoFitCanvas();
    }
  });
};

// Native Browser Printing Trigger
window.printDocument = function() {
  window.print();
};

document.addEventListener('DOMContentLoaded', () => {

  // Role-Based Access Engine Configuration
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.has('admin') || urlParams.get('role') === 'admin';
  const body = document.body;

  if (isAdmin) {
    body.classList.remove('role-user');
    body.classList.add('role-admin');
    
    // Set admin sidebar open by default in Admin view
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) sidebar.style.marginLeft = '0px';
  } else {
    body.classList.remove('role-admin');
    body.classList.add('role-user');
    
    // Hide admin sidebar completely for standard users
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) {
      sidebar.style.display = 'none';
      sidebar.style.marginLeft = '-300px';
    }
  }

  // Load Saved Page Margins from localStorage
  const savedMargins = localStorage.getItem('trescon_letterhead_margins') || 'normal';
  const sheet = document.getElementById('letterhead-sheet');
  const marginsSelector = document.getElementById('margins-preset');
  if (sheet) {
    sheet.classList.remove('margins-normal', 'margins-compact', 'margins-wide');
    sheet.classList.add(`margins-${savedMargins}`);
  }
  if (marginsSelector) {
    marginsSelector.value = savedMargins;
  }

  // Initialize Quill Editor inside the A4 canvas sheet
  window.quill = null;
  const editorCanvasContainer = document.getElementById('quill-editor-canvas');

  if (window.Quill && editorCanvasContainer) {
    const toolbarOptions = [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean']
    ];

    window.quill = new Quill('#quill-editor-canvas', {
      theme: 'snow',
      placeholder: 'Type or compose your letter here directly on the A4 page...',
      modules: { 
        toolbar: toolbarOptions
      }
    });

    // Move Quill Toolbar to the Top Navigation Bar Toolbar
    const qlToolbar = editorCanvasContainer.parentElement.querySelector('.ql-toolbar');
    const topToolbarContainer = document.getElementById('editor-top-toolbar');
    if (qlToolbar && topToolbarContainer) {
      topToolbarContainer.appendChild(qlToolbar);
    }

    // Populate Editor (Load saved draft if available, otherwise load default template)
    const savedDraft = localStorage.getItem('trescon_letterhead_draft');
    if (savedDraft) {
      window.quill.root.innerHTML = savedDraft;
    } else {
      window.quill.root.innerHTML = `
        <p><strong>To,</strong></p>
        <p><strong>Mr. Alex Turner</strong></p>
        <p>Chief Executive Officer</p>
        <p>Apex Global Innovations Ltd.</p>
        <p>Bengaluru, Karnataka</p>
        <p><br></p>
        <p><strong>Subject: Formal Proposal & Corporate Partnership Engagement</strong></p>
        <p><br></p>
        <p>Dear Mr. Turner,</p>
        <p><br></p>
        <p>I hope this message finds you well. I am writing on behalf of Trescon Global to submit our comprehensive proposal for the upcoming enterprise technology summit and strategic collaboration initiatives. Our team has tailored this framework to align with your organization's vision, key deliverables, and expansion roadmaps.</p>
        <p>As a premier B2B events and business solutions firm operating across seven global territories, Trescon is committed to connecting businesses with high-impact market opportunities. The enclosed document details our execution timeline, stakeholder engagement models, and target milestones for optimal business outcome.</p>
        <p><br></p>
        <p>Warm regards,</p>
        <p><br></p>
        <p><strong>Mohammed Saleem</strong></p>
        <p>Founder & Chairman</p>
        <p>Trescon Global Business Solutions Pvt. Ltd.</p>
      `;
    }

    // Verify overflow on load and hook inside Quill text-change listener
    if (window.checkOverflow) {
      window.checkOverflow();
      window.quill.on('text-change', () => {
        window.checkOverflow();
        // Autosave draft to localStorage
        localStorage.setItem('trescon_letterhead_draft', window.quill.root.innerHTML);
      });
    }
  }

  // Bind Office Location Preset Selector
  const selectElem = document.getElementById('office-preset');
  if (selectElem) {
    selectElem.addEventListener('change', window.updateFooter);
  }

  // Trigger initial footer content sync
  window.updateFooter();
  window.toggleWatermark();

  // Symmetrical Viewport Auto-Fit Scaling Engine
  function autoFitCanvas() {
    const previewArea = document.querySelector('.preview-area');
    const paperContainer = document.querySelector('.paper-container');
    const sheet = document.getElementById('letterhead-sheet');

    if (!previewArea || !paperContainer || !sheet) return;

    sheet.style.transform = 'none';

    // Symmetrical page padding buffer calculation (adjusting for visible admin sidebar if active)
    const sidebar = document.getElementById('admin-sidebar');
    const sidebarWidth = (isAdmin && sidebar && sidebar.style.display !== 'none' && sidebar.style.marginLeft === '0px') ? 300 : 0;
    
    const containerWidth = Math.max(previewArea.clientWidth - 48, 280);
    const containerHeight = Math.max(previewArea.clientHeight - 52, 350);

    // Standard A4 Dimensions @ 96 DPI
    const sheetWidth = 794;
    const sheetHeight = 1123;

    const scaleX = containerWidth / sheetWidth;
    const scaleY = containerHeight / sheetHeight;
    const scale = Math.min(scaleX, scaleY, 1.0);

    sheet.style.transform = `scale(${scale})`;
    sheet.style.transformOrigin = 'top center';

    paperContainer.style.height = `${sheet.offsetHeight * scale}px`;
    paperContainer.style.width = `${sheetWidth * scale}px`;
    paperContainer.style.margin = 'auto';
  }

  window.autoFitCanvas = autoFitCanvas;
  window.addEventListener('resize', autoFitCanvas);
  setTimeout(autoFitCanvas, 50);
});
