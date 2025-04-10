document.addEventListener('DOMContentLoaded', () => {
    // Navbar and scroll functionality
    const navEl = document.querySelector('.nav');
    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const dropdowns = document.querySelectorAll('.navbar-nav .dropdown');
    const backToTopButton = document.getElementById('back-to-top');

    const checkScroll = () => {
        if (window.scrollY >= 56 || toggleButton.getAttribute('aria-expanded') === 'true') {
            navEl.classList.add('nav-scrolled');
            navEl.setAttribute('data-bs-theme', 'dark');
        } else {
            navEl.classList.remove('nav-scrolled');
            navEl.setAttribute('data-bs-theme', 'light');
        }

        if (window.scrollY > 100) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    backToTopButton.onclick = function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    };

    window.addEventListener('scroll', checkScroll);
    toggleButton.addEventListener('click', checkScroll);
    navbarCollapse.addEventListener('hidden.bs.collapse', checkScroll);

    // Dropdown hover functionality
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.querySelector('.dropdown-menu').classList.add('show');
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdown.querySelector('.dropdown-menu').classList.remove('show');
        });
    });

    const toggleCentering = () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.toggle('center-dropdown', window.innerWidth >= 992);
        });
    };

    toggleCentering();
    window.addEventListener('resize', toggleCentering);

    // Language switcher
    function setLanguage(lang) {
        // Hide all language-specific content
        var elements = document.querySelectorAll('.lang');
        elements.forEach(function(el) {
            el.classList.remove('active');
        });

        // Show the selected language content
        document.getElementById(lang).classList.add('active');
    }
    
    // Hero section parallax
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        document.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }

    // SLIDER SECTION INTERACTION
    const sliderPanels = document.querySelectorAll('#slider-section .panel');
    
    if (sliderPanels.length > 0) {
        // Map slider panels to their corresponding sections
        const sectionMap = {
            0: 'video',                 // slider-7.jpeg - Videos
            1: null,                    // slider-6.jpeg - Stand (not implemented)
            2: 'silhouettes-accordion', // slider-1.jpeg - Silhouettes and image-accordion together
            3: null,                    // slider-5.jpeg - Not implemented
            4: 'front-wall',            // slider-3.jpeg - Front Wall
            5: 'back-wall',             // slider-4.jpeg - Back Wall
            6: null                     // slider-2.jpeg - Not implemented
        };
        
        // Empty the slider nav (no explore button needed)
        const sliderNav = document.querySelector('#slider-section .slider-nav');
        if (sliderNav) sliderNav.innerHTML = '';
        
        // Function to hide all sections
        function hideAllSections() {
            const sectionsToHide = ['video', 'front-wall', 'back-wall', 'image-accordion', 'silhouettes'];
            sectionsToHide.forEach(id => {
                const section = document.getElementById(id);
                if (section) section.style.display = 'none';
            });
        }
        
        // Initially hide all sections except default one
        hideAllSections();
        
        // Add click event listeners to each panel in the slider
        sliderPanels.forEach((panel, index) => {
            panel.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                
                // Remove active class from all slider panels
                sliderPanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked panel
                this.classList.add('active');
                
                // Hide all sections first
                hideAllSections();
                
                // Get the corresponding section ID
                const sectionId = sectionMap[index];
                
                if (sectionId === 'silhouettes-accordion') {
                    // Special handling for silhouettes section
                    
                    // Make both sections visible
                    const imageAccordion = document.getElementById('image-accordion');
                    const silhouettesSection = document.getElementById('silhouettes');
                    
                    if (imageAccordion) imageAccordion.style.display = 'flex';
                    if (silhouettesSection) silhouettesSection.style.display = 'block';
                    
                    // Reset silhouettes to show the first one
                    const silhouetteContainers = document.querySelectorAll('.silhouette-container');
                    silhouetteContainers.forEach(s => s.classList.remove('active'));
                    
                    const firstSilhouette = document.getElementById('silhouette-1');
                    if (firstSilhouette) firstSilhouette.classList.add('active');
                    
                    // Activate the first panel in the image accordion
                    const accordionPanels = document.querySelectorAll('#image-accordion .panel');
                    accordionPanels.forEach(p => p.classList.remove('active'));
                    if (accordionPanels.length > 0) accordionPanels[0].classList.add('active');
                    
                    // Scroll to image accordion
                    if (imageAccordion) imageAccordion.scrollIntoView({ behavior: 'smooth' });
                    
                } else if (sectionId) {
                    // Regular section - show and scroll to it
                    const section = document.getElementById(sectionId);
                    if (section) {
                        section.style.display = 'block';
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // IMAGE ACCORDION AND SILHOUETTES INTERACTION
    // This section is completely separate from the slider section above
    const imageAccordionPanels = document.querySelectorAll('#image-accordion .panel');
    
    if (imageAccordionPanels.length > 0) {
        // Hover effect for image accordion
        imageAccordionPanels.forEach(panel => {
            panel.addEventListener('mouseenter', () => {
                imageAccordionPanels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
            });
        });
        
        // Initially hide silhouettes unless explicitly shown by slider panel
        const silhouettesSection = document.getElementById('silhouettes');
        if (silhouettesSection && window.location.hash !== '#silhouettes-accordion') {
            silhouettesSection.style.display = 'none';
        }
        
        // Click handler for image accordion panels
        imageAccordionPanels.forEach((panel, index) => {
            panel.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                
                // Make sure silhouettes section is visible when clicking on image accordion
                if (silhouettesSection) silhouettesSection.style.display = 'block';
                
                // Remove active class from all panels in image accordion
                imageAccordionPanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked panel
                panel.classList.add('active');
                
                // Remove active class from all silhouette containers
                const silhouettes = document.querySelectorAll('.silhouette-container');
                silhouettes.forEach(silhouette => silhouette.classList.remove('active'));
                
                // Show only the corresponding silhouette
                const selectedSilhouette = document.getElementById(`silhouette-${index + 1}`);
                if (selectedSilhouette) {
                    selectedSilhouette.classList.add('active');
                    
                    // Scroll smoothly to align the bottom of the silhouettes section with the bottom of the viewport
                    if (silhouettesSection) {
                        const viewportHeight = window.innerHeight;
                        const silhouettesBottom = silhouettesSection.getBoundingClientRect().bottom + window.scrollY;
                        
                        window.scrollTo({
                            top: silhouettesBottom - viewportHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
});

// Open PDF Function
function openPDF() {
    window.open('../assets/document/CATALOGUE.pdf', '_blank');
}

// Dynamic Background Blur Effect
const bgElement = document.querySelector('.background');
if (bgElement) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            bgElement.classList.add('blur-background');
        } else {
            bgElement.classList.remove('blur-background');
        }
    });
}

// Dark Mode Toggle
const toggleDarkMode = document.getElementById('dark-mode-toggle');
if (toggleDarkMode) {
    toggleDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Theme Integration
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('siteTheme', newTheme);
    });
    
    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// Fallback Image for Broken Links
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        img.src = 'fallback-image.png';
    });
});

// Frame popup functionality
function showEnlargedFrame(frameNumber) {
    var popupId = 'popup-frame' + frameNumber;
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}