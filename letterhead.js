/**
 * Trescon Global Executive Letterhead Studio Logic (Plain Composer with Toggleable A4 Preview)
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

// Programmatic Formatting of Today's Date (e.g. 7th August 2026)
function getFormattedDate() {
  const date = new Date();
  const day = date.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) suffix = "st";
  else if (day === 2 || day === 22) suffix = "nd";
  else if (day === 3 || day === 23) suffix = "rd";
  
  return `${day}${suffix} ${month} ${year}`;
}

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

// Real-time A4 Page Preview Overflow Verification
window.checkOverflow = function() {
  const previewBody = document.getElementById('letterhead-preview-body');
  const isPreviewActive = document.body.classList.contains('preview-active');
  
  if (!previewBody || !isPreviewActive) {
    const warningBanner = document.getElementById('overflow-warning');
    if (warningBanner) warningBanner.remove();
    return;
  }
  
  // Available height verification in A4 canvas container
  const isOverflowing = previewBody.scrollHeight > previewBody.clientHeight;
  
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
  
  sheet.classList.remove('margins-normal', 'margins-compact', 'margins-wide');
  sheet.classList.add(`margins-${selectedValue}`);
  
  localStorage.setItem('trescon_letterhead_margins', selectedValue);
  
  if (window.checkOverflow) window.checkOverflow();
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

// Toggle between Plain Compose Mode and A4 Layout Preview Mode
window.togglePreviewMode = function() {
  const body = document.body;
  const btnText = document.getElementById('preview-btn-text');
  const composeView = document.getElementById('compose-workspace');
  const previewView = document.getElementById('preview-workspace');
  if (!window.quill || !composeView || !previewView) return;

  const isPreview = body.classList.toggle('preview-active');
  
  if (isPreview) {
    // Copy content from plain editor to read-only A4 sheet preview body
    const contentHtml = window.quill.root.innerHTML;
    const previewBody = document.getElementById('letterhead-preview-body');
    if (previewBody) previewBody.innerHTML = contentHtml;

    composeView.style.display = 'none';
    previewView.style.display = 'block';
    
    if (btnText) btnText.textContent = "Edit Letter";
    
    if (window.autoFitCanvas) window.autoFitCanvas();
  } else {
    composeView.style.display = 'block';
    previewView.style.display = 'none';
    
    if (btnText) btnText.textContent = "Preview";
  }
  
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
  
  setTimeout(() => {
    if (window.autoFitCanvas) window.autoFitCanvas();
  }, 310);
};

// Export A4 sheet directly to high-fidelity PDF via html2pdf
window.exportToPdf = function() {
  if (!window.quill) return;

  // Render content onto A4 sheet behind the scenes
  const previewBody = document.getElementById('letterhead-preview-body');
  if (previewBody) {
    previewBody.innerHTML = window.quill.root.innerHTML;
  }

  const element = document.getElementById('letterhead-sheet');
  const selectElem = document.getElementById('office-preset');
  const selectedKey = selectElem ? selectElem.value : 'bangalore';

  // Temporarily reset CSS transform scaling to ensure pixel-perfect 1:1 html2canvas resolution
  const originalTransform = element.style.transform;
  const originalWidth = element.style.width;
  const originalHeight = element.style.height;
  const originalMargin = element.style.margin;

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
    // Restore scaling layout
    if (window.autoFitCanvas) {
      window.autoFitCanvas();
    }
  });
};

// Native Browser Printing Trigger
window.printDocument = function() {
  if (!window.quill) return;
  const previewBody = document.getElementById('letterhead-preview-body');
  if (previewBody) {
    previewBody.innerHTML = window.quill.root.innerHTML;
  }
  window.print();
};

document.addEventListener('DOMContentLoaded', () => {

  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.has('admin') || urlParams.get('role') === 'admin';
  const body = document.body;

  if (isAdmin) {
    body.classList.remove('role-user');
    body.classList.add('role-admin');
    
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) sidebar.style.marginLeft = '0px';
  } else {
    body.classList.remove('role-admin');
    body.classList.add('role-user');
    
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

  // Initialize Quill Editor inside the plain Compose workspace card
  window.quill = null;
  const editorComposeContainer = document.getElementById('quill-editor-compose');

  if (window.Quill && editorComposeContainer) {
    const toolbarOptions = [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean']
    ];

    window.quill = new Quill('#quill-editor-compose', {
      theme: 'snow',
      placeholder: 'Compose your official letter details here directly...',
      modules: { 
        toolbar: toolbarOptions
      }
    });

    // Move Quill Toolbar to the Top Navigation Bar Toolbar
    const qlToolbar = editorComposeContainer.parentElement.querySelector('.ql-toolbar');
    const topToolbarContainer = document.getElementById('editor-top-toolbar');
    if (qlToolbar && topToolbarContainer) {
      topToolbarContainer.appendChild(qlToolbar);
    }

    // Populate Editor (Load saved draft if available, otherwise load default template with today's auto-date)
    const savedDraft = localStorage.getItem('trescon_letterhead_draft');
    if (savedDraft) {
      window.quill.root.innerHTML = savedDraft;
    } else {
      const todayDate = getFormattedDate();
      window.quill.root.innerHTML = `
        <p><strong>To,</strong></p>
        <p><strong>Mr. Alex Turner</strong></p>
        <p>Chief Executive Officer</p>
        <p>Apex Global Innovations Ltd.</p>
        <p>Bengaluru, Karnataka</p>
        <p><br></p>
        <p>Date: ${todayDate}</p>
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

    // Hook inside Quill text-change listener to autosave drafts
    window.quill.on('text-change', () => {
      localStorage.setItem('trescon_letterhead_draft', window.quill.root.innerHTML);
    });
  }

  // Bind Office Location Preset Selector
  const selectElem = document.getElementById('office-preset');
  if (selectElem) {
    selectElem.addEventListener('change', window.updateFooter);
  }

  // Trigger initial footer content sync
  window.updateFooter();
  window.toggleWatermark();

  // Symmetrical Viewport Auto-Fit Scaling Engine (Runs in Preview view only)
  function autoFitCanvas() {
    const previewArea = document.querySelector('.preview-area');
    const paperContainer = document.querySelector('.paper-container');
    const sheet = document.getElementById('letterhead-sheet');
    const previewView = document.getElementById('preview-workspace');

    if (!previewArea || !paperContainer || !sheet || previewView.style.display === 'none') return;

    sheet.style.transform = 'none';

    const sidebar = document.getElementById('admin-sidebar');
    const sidebarWidth = (isAdmin && sidebar && sidebar.style.display !== 'none' && sidebar.style.marginLeft === '0px') ? 300 : 0;
    
    const containerWidth = Math.max(previewArea.clientWidth - 48, 280);
    const containerHeight = Math.max(previewArea.clientHeight - 52, 350);

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
