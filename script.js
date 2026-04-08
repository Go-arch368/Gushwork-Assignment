document.addEventListener('DOMContentLoaded', () => {

    /* --- Sticky Header Logic --- */
    const topbar = document.getElementById('sticky-topbar');
    const header = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            topbar.classList.add('is-sticky');
            header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        } else {
            topbar.classList.remove('is-sticky');
            header.style.boxShadow = 'none';
        }
    });

    /* --- Image Zoom Logic --- */
    const zoomContainer = document.getElementById('zoom-container');
    const zoomImage = document.getElementById('main-product-image');

    if (zoomContainer && zoomImage) {
        zoomContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = zoomContainer.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;

            zoomImage.style.transformOrigin = `${x}% ${y}%`;
            zoomImage.style.transform = 'scale(2)';
        });

        zoomContainer.addEventListener('mouseleave', () => {
            zoomImage.style.transformOrigin = 'center center';
            zoomImage.style.transform = 'scale(1)';
        });
    }

    /* --- FAQ Accordion Logic --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* --- Manufacturing Process Logic --- */
    const tabs = document.querySelectorAll('.process-tab');
    const tabContents = document.querySelectorAll('.process-content-item');
    const processNextBtn = document.querySelector('.process-nav-footer .next');
    const processPrevBtn = document.querySelector('.process-nav-footer .prev');

    function setActiveStep(targetId) {
        tabs.forEach(t => {
            t.classList.remove('active');
            if (t.getAttribute('data-tab') === targetId) t.classList.add('active');
        });

        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetId) content.classList.add('active');
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveStep(tab.getAttribute('data-tab'));
        });
    });

    if (processNextBtn && processPrevBtn) {
        processNextBtn.addEventListener('click', () => {
            const currentActive = document.querySelector('.process-content-item.active');
            const currentIndex = Array.from(tabContents).indexOf(currentActive);
            const nextIndex = (currentIndex + 1) % tabContents.length;
            setActiveStep(tabContents[nextIndex].id);
        });

        processPrevBtn.addEventListener('click', () => {
            const currentActive = document.querySelector('.process-content-item.active');
            const currentIndex = Array.from(tabContents).indexOf(currentActive);
            const prevIndex = (currentIndex - 1 + tabContents.length) % tabContents.length;
            setActiveStep(tabContents[prevIndex].id);
        });
    }

    /* --- Horizontal Scroll for Applications (Arrows) --- */
    const appGrid = document.querySelector('.app-grid');
    const nextBtn = document.querySelector('.arrow-btn[aria-label="Next"]');
    const prevBtn = document.querySelector('.arrow-btn[aria-label="Previous"]');

    if (appGrid && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            appGrid.scrollBy({ left: 300, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            appGrid.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    /* --- Modal Logic --- */
    const catalogueModal = document.getElementById('catalogueModal');
    const quoteModal = document.getElementById('quoteModal');
    const btnDownloadDatasheet = document.getElementById('btnDownloadDatasheet');
    const btnRequestQuote = document.getElementById('btnRequestQuote');
    const closeCatalogueModal = document.getElementById('closeCatalogueModal');
    const closeQuoteModal = document.getElementById('closeQuoteModal');

    if (btnDownloadDatasheet && catalogueModal) {
        btnDownloadDatasheet.addEventListener('click', (e) => {
            e.preventDefault();
            catalogueModal.classList.add('active');
        });
    }

    if (btnRequestQuote && quoteModal) {
        btnRequestQuote.addEventListener('click', (e) => {
            e.preventDefault();
            quoteModal.classList.add('active');
        });
    }

    if (closeCatalogueModal) {
        closeCatalogueModal.addEventListener('click', (e) => {
            e.preventDefault();
            catalogueModal.classList.remove('active');
        });
    }

    if (closeQuoteModal) {
        closeQuoteModal.addEventListener('click', (e) => {
            e.preventDefault();
            quoteModal.classList.remove('active');
        });
    }

    // Close on clicking outside the modal content
    if (catalogueModal) {
        catalogueModal.addEventListener('click', (e) => {
            if (e.target === catalogueModal) catalogueModal.classList.remove('active');
        });
    }

    if (quoteModal) {
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) quoteModal.classList.remove('active');
        });
    }

});

/* --- Global Thumbnail Switcher --- */
window.changeImage = function(btn) {
    const mainImg = document.getElementById('main-product-image');
    const imageSrc = btn.getAttribute('data-image');
    
    if (mainImg && imageSrc) {
        mainImg.src = imageSrc;
        
        // Update active class
        document.querySelectorAll('.thumb-wrapper').forEach(w => w.classList.remove('active'));
        btn.classList.add('active');
    }
};
