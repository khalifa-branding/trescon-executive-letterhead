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

// Export A4 sheet directly to high-fidelity PDF via html2pdf
window.exportToPdf = function() {
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
    // Restore scaling auto-fit logic
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

    // Move Quill Toolbar to Sidebar Container
    const qlToolbar = editorCanvasContainer.parentElement.querySelector('.ql-toolbar');
    const sidebarToolbarContainer = document.getElementById('editor-sidebar-toolbar');
    if (qlToolbar && sidebarToolbarContainer) {
      sidebarToolbarContainer.appendChild(qlToolbar);
    }

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

  // Bind Office Location Preset Selector
  const selectElem = document.getElementById('office-preset');
  if (selectElem) {
    selectElem.addEventListener('change', window.updateFooter);
  }

  // Trigger initial footer content sync
  window.updateFooter();

  // Symmetrical Viewport Auto-Fit Scaling Engine
  function autoFitCanvas() {
    const previewArea = document.querySelector('.preview-area');
    const paperContainer = document.querySelector('.paper-container');
    const sheet = document.getElementById('letterhead-sheet');

    if (!previewArea || !paperContainer || !sheet) return;

    sheet.style.transform = 'none';

    // Symmetrical page padding buffer calculation
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
