/**
 * Trescon Global Executive Letterhead Studio Logic (Plain Composer with Multi-Page Toggleable A4 Pagination)
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

  // Re-run pagination if preview mode is active to apply new footer addresses
  if (document.body.classList.contains('preview-active') && window.quill) {
    window.paginateDocument(window.quill.root.innerHTML);
  }
};

// Create a single strict A4 Sheet DOM structure
window.createNewA4Sheet = function(pageNumber) {
  const sheet = document.createElement('article');
  sheet.className = 'a4-sheet';
  sheet.id = `letterhead-sheet-page-${pageNumber}`;
  
  // Get active margins preset
  const selectMargins = document.getElementById('margins-preset');
  const savedMargins = selectMargins ? selectMargins.value : (localStorage.getItem('trescon_letterhead_margins') || 'normal');
  sheet.classList.add(`margins-${savedMargins}`);
  
  // Set inline styles for strict A4 canvas height locks
  sheet.style.cssText = `
    width: 100% !important;
    max-width: 210mm !important;
    height: 297mm !important;
    min-height: 297mm !important;
    max-height: 297mm !important;
    overflow: hidden !important;
    margin-bottom: 40px;
    box-sizing: border-box !important;
    position: relative;
    background-color: #ffffff !important;
    color: #1e293b !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
    display: flex;
    flex-direction: column;
  `;
  
  // Get office address data
  const selectElem = document.getElementById('office-preset');
  const selectedKey = selectElem ? selectElem.value : 'bangalore';
  const data = ADDRESS_PRESETS[selectedKey] || ADDRESS_PRESETS.bangalore;
  
  let inlineAddr = data.address;
  if (data.cin) {
    inlineAddr += `<br>[${data.cin}]`;
  } else if (data.extra) {
    inlineAddr += `<br>[${data.extra}]`;
  }

  // Watermark status
  const watermarkToggle = document.getElementById('watermark-toggle');
  const watermarkDisplay = (watermarkToggle && watermarkToggle.checked) ? 'block' : 'none';

  sheet.innerHTML = `
    <!-- WATERMARK LOGO OVERLAY -->
    <div class="watermark-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); width: 320px; height: 320px; background-image: url('brand_assets/10-years-trescon-logo.png'); background-size: contain; background-repeat: no-repeat; background-position: center; opacity: 0.035; pointer-events: none; z-index: 1; display: ${watermarkDisplay};"></div>

    <!-- TOP ACCENT RULE -->
    <div class="top-accent-bar" style="height: 5px; background: linear-gradient(90deg, #007876 0%, #00a5a3 100%); margin-bottom: 16px !important; width: 100%;"></div>

    <!-- HEADER SECTION -->
    <header class="letter-header" style="position: relative; z-index: 5; display: flex; justify-content: space-between; align-items: flex-end; width: 100%; min-height: 48px; padding-top: 8px !important; padding-left: 20px; padding-right: 20px; opacity: 1; visibility: visible; box-sizing: border-box;">
      <div class="header-logo-block" style="height: 60px !important; display: flex !important; align-items: flex-end; opacity: 1; visibility: visible;">
        <img src="brand_assets/10-years-trescon-logo.png" alt="Trescon Global Logo" class="letterhead-logo" style="height: 60px !important; max-height: 60px !important; width: auto !important; display: block; visibility: visible; opacity: 1;">
      </div>
      <div class="header-meta-block" style="display: flex; flex-direction: column; align-items: flex-end; gap: 2px;">
        <div class="header-contact-line" style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #4a5568;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00A5A3" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          <span>${data.email}</span>
        </div>
        <div class="header-contact-line" style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #4a5568;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00A5A3" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4-10z"></path></svg>
          <span>${data.web}</span>
        </div>
      </div>
    </header>
    <div class="header-gradient-rule" style="height: 1px; background: linear-gradient(90deg, rgba(0,120,118,0.8) 0%, rgba(0,165,163,0) 100%); margin-top: 10px !important; margin-bottom: 16px !important; width: 100%;"></div>

    <!-- MAIN BODY AREA (PAGINATED CHUNKS) -->
    <div class="letter-body blank-canvas-space" style="flex: 1; min-height: 0 !important; position: relative; z-index: 5; box-sizing: border-box; overflow: hidden; padding-bottom: 20px;"></div>

    <!-- FOOTER SECTION -->
    <footer class="letter-footer" style="margin-top: auto; padding-top: 4px; margin-bottom: 0; padding-bottom: 4px; padding-left: 20px; padding-right: 20px; position: relative; z-index: 5; box-sizing: border-box; width: 100%;">
      <div class="footer-divider" style="height: 1px; background-color: #00A5A3; margin-top: 8px !important; margin-bottom: 6px !important; opacity: 0.8; width: 100%;"></div>
      <div class="footer-address-block" style="margin-bottom: 2px;">
        <p class="footer-company-name" style="font-weight: 700; font-size: 0.74rem; color: #01373D; margin: 0 0 1px 0; line-height: 1.1;">${data.entity}</p>
        <p class="footer-address" style="font-size: 11px !important; color: #4A5568; line-height: 1.15 !important; margin: 0;">
          ${inlineAddr}
        </p>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #dce3e6 !important; margin-top: 6px !important; padding-top: 4px !important; box-sizing: border-box;">
        <p class="footer-disclaimer" style="font-size: 10px !important; color: #64748b !important; line-height: 1.15 !important; margin: 0; padding-bottom: 2px; flex: 1;">
          <strong>Disclaimer:</strong> The information shared by Trescon is confidential and intended solely for the recipient. &copy; 2025 Trescon.
        </p>
        <span style="font-size: 10px; color: #64748b; font-weight: 700; flex-shrink: 0; margin-left: 10px;">Page ${pageNumber}</span>
      </div>
    </footer>
  `;
  
  return sheet;
};

// Dynamic Pagination Algorithm (Flows HTML block elements across A4 sheets)
window.paginateDocument = function(htmlContent) {
  const wrapper = document.getElementById('sheets-wrapper');
  if (!wrapper) return;
  
  wrapper.innerHTML = ''; // Clear previous sheets
  
  const parser = document.createElement('div');
  parser.innerHTML = htmlContent;
  
  const childNodes = Array.from(parser.childNodes);
  let currentPageNumber = 1;
  let currentSheet = window.createNewA4Sheet(currentPageNumber);
  wrapper.appendChild(currentSheet);
  
  let currentBody = currentSheet.querySelector('.letter-body');
  
  // Available height inside the A4 sheet page body before it hits footer limits
  // At A4 scale, sheet height is 1123px. Padding + Header + Footer = ~390px. Remaining body clientHeight = ~730px.
  const MAX_BODY_HEIGHT = 740;

  function appendElement(el) {
    if (el.nodeType === Node.TEXT_NODE && el.textContent.trim() === '') return;

    const clone = el.cloneNode(true);
    currentBody.appendChild(clone);

    // If current element height overflows page height (scrollHeight measured correctly on visible DOM elements)
    if (currentBody.scrollHeight > MAX_BODY_HEIGHT) {
      
      // If it's a list (UL/OL), split the list items across pages
      if (clone.tagName === 'UL' || clone.tagName === 'OL') {
        clone.remove(); // remove full list

        const listItems = Array.from(el.childNodes);
        let listClone = document.createElement(el.tagName);
        currentBody.appendChild(listClone);

        for (const item of listItems) {
          if (item.nodeType === Node.TEXT_NODE && item.textContent.trim() === '') continue;

          const itemClone = item.cloneNode(true);
          listClone.appendChild(itemClone);

          if (currentBody.scrollHeight > MAX_BODY_HEIGHT) {
            itemClone.remove(); // remove overflowing item

            if (listClone.children.length === 0) {
              listClone.remove();
            }

            // Create new sheet
            currentPageNumber++;
            currentSheet = window.createNewA4Sheet(currentPageNumber);
            wrapper.appendChild(currentSheet);
            currentBody = currentSheet.querySelector('.letter-body');

            // Open new list on new page
            listClone = document.createElement(el.tagName);
            currentBody.appendChild(listClone);
            listClone.appendChild(itemClone);
          }
        }
      } else {
        // Simple element overflow: remove from current page and place on next page
        clone.remove();

        currentPageNumber++;
        currentSheet = window.createNewA4Sheet(currentPageNumber);
        wrapper.appendChild(currentSheet);
        currentBody = currentSheet.querySelector('.letter-body');

        currentBody.appendChild(clone);
      }
    }
  }

  for (const el of childNodes) {
    appendElement(el);
  }
};

// Update Sheet Margin Styles (Admin Setting)
window.updateMargins = function() {
  const selectElem = document.getElementById('margins-preset');
  if (!selectElem) return;

  const selectedValue = selectElem.value;
  localStorage.setItem('trescon_letterhead_margins', selectedValue);
  
  // Re-run pagination only if preview mode is active
  if (document.body.classList.contains('preview-active') && window.quill) {
    window.paginateDocument(window.quill.root.innerHTML);
  }
  
  if (window.autoFitCanvas) window.autoFitCanvas();
};

// Toggle Watermark Overlay (Admin Setting)
window.toggleWatermark = function() {
  const toggle = document.getElementById('watermark-toggle');
  if (!toggle) return;
  
  const watermarkState = toggle.checked;
  const overlays = document.querySelectorAll('.watermark-overlay');
  
  overlays.forEach(overlay => {
    overlay.style.display = watermarkState ? 'block' : 'none';
  });
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
    // Show preview container first so that DOM height calculations are non-zero!
    composeView.style.display = 'none';
    previewView.style.display = 'block';

    // Now run pagination to split editor text into strict A4 pages
    window.paginateDocument(window.quill.root.innerHTML);
    
    if (btnText) btnText.textContent = "Edit Letter";
    
    if (window.autoFitCanvas) window.autoFitCanvas();
  } else {
    composeView.style.display = 'block';
    previewView.style.display = 'none';
    
    if (btnText) btnText.textContent = "Preview";
  }
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

  const previewView = document.getElementById('preview-workspace');
  const composeView = document.getElementById('compose-workspace');
  const originalDisplay = previewView ? previewView.style.display : 'none';
  const originalComposeDisplay = composeView ? composeView.style.display : 'block';

  // Temporarily show preview container for pagination measurements
  if (previewView) previewView.style.display = 'block';
  if (composeView) composeView.style.display = 'none';

  // Run pagination
  window.paginateDocument(window.quill.root.innerHTML);

  const sheets = document.querySelectorAll('.a4-sheet');
  const selectElem = document.getElementById('office-preset');
  const selectedKey = selectElem ? selectElem.value : 'bangalore';

  if (sheets.length === 0) {
    if (previewView) previewView.style.display = originalDisplay;
    if (composeView) composeView.style.display = originalComposeDisplay;
    return;
  }

  // Temporarily reset CSS scale transforms for pixel-perfect A4 canvas snapshots
  sheets.forEach(sheet => {
    sheet.style.transform = 'none';
    sheet.style.width = '210mm';
    sheet.style.height = '297mm';
    sheet.style.margin = '0 0 10mm 0';
  });

  const element = document.getElementById('sheets-wrapper');

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
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'], before: '.a4-sheet' } // Insert pagebreaks before each sheet element
  };

  html2pdf().set(opt).from(element).save().then(() => {
    // Restore display states
    if (previewView) previewView.style.display = originalDisplay;
    if (composeView) composeView.style.display = originalComposeDisplay;
    
    // Restore preview scaling
    if (window.autoFitCanvas) {
      window.autoFitCanvas();
    }
  });
};

// Native Browser Printing Trigger
window.printDocument = function() {
  if (!window.quill) return;

  const previewView = document.getElementById('preview-workspace');
  const composeView = document.getElementById('compose-workspace');
  const originalDisplay = previewView ? previewView.style.display : 'none';
  const originalComposeDisplay = composeView ? composeView.style.display : 'block';

  // Temporarily show preview container for printing pagination
  if (previewView) previewView.style.display = 'block';
  if (composeView) composeView.style.display = 'none';

  window.paginateDocument(window.quill.root.innerHTML);
  window.print();

  // Restore display states after print dialog closes
  if (previewView) previewView.style.display = originalDisplay;
  if (composeView) composeView.style.display = originalComposeDisplay;
  if (window.autoFitCanvas) window.autoFitCanvas();
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

  // Symmetrical Viewport Auto-Fit Scaling Engine (Supports multi-page stacking)
  function autoFitCanvas() {
    const previewArea = document.querySelector('.preview-area');
    const paperContainer = document.querySelector('.paper-container');
    const sheets = document.querySelectorAll('.a4-sheet');
    const previewView = document.getElementById('preview-workspace');

    if (!previewArea || !paperContainer || sheets.length === 0 || previewView.style.display === 'none') return;

    // Symmetrical page padding buffer calculation (adjusting for visible admin sidebar if active)
    const containerWidth = Math.max(previewArea.clientWidth - 48, 280);
    const containerHeight = Math.max(previewArea.clientHeight - 52, 350);

    const sheetWidth = 794;
    const sheetHeight = 1123;

    const scale = Math.min(containerWidth / sheetWidth, containerHeight / sheetHeight, 1.0);

    let totalScaledHeight = 0;
    sheets.forEach(sheet => {
      sheet.style.transform = `scale(${scale})`;
      sheet.style.transformOrigin = 'top center';
      sheet.style.margin = '0 auto 40px auto';
      totalScaledHeight += sheet.offsetHeight * scale + 40; // account for margin-bottom gap
    });

    paperContainer.style.height = `${totalScaledHeight}px`;
    paperContainer.style.width = `${sheetWidth * scale}px`;
    paperContainer.style.margin = 'auto';
    paperContainer.style.display = 'flex';
    paperContainer.style.flexDirection = 'column';
    paperContainer.style.alignItems = 'center';
  }

  window.autoFitCanvas = autoFitCanvas;
  window.addEventListener('resize', autoFitCanvas);
  setTimeout(autoFitCanvas, 50);
});
