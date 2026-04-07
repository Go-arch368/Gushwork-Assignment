document.addEventListener('DOMContentLoaded', () => {

    /* --- Sticky Header Logic --- */
    const topbar = document.getElementById('sticky-topbar');
    const header = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            topbar.style.display = 'block';
            topbar.classList.add('is-sticky');
            header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        } else {
            topbar.style.display = 'none';
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

    /* --- Manufacturing Process Tabs Logic --- */
    const tabs = document.querySelectorAll('.process-tab');
    const tabContents = document.querySelectorAll('.process-content-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');

            // Update tab buttons
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update content items
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });

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
