function initImageMap() {
    const img = document.querySelector('#back-wall img[usemap]');
    if (!img) return;

    // Multiple initialization attempts
    const initAttempts = [
        () => $('map').imageMapResize(), // Immediate try
        () => img.complete && $('map').imageMapResize(), // If image already loaded
        () => setTimeout(() => $('map').imageMapResize(), 300), // Short delay
        () => setTimeout(() => $('map').imageMapResize(), 1000) // Longer delay
    ];

    // Run all attempts
    initAttempts.forEach(attempt => {
        try {
            if (typeof $ !== 'undefined' && $.fn.imageMapResize) {
                attempt();
            }
        } catch (e) {
            console.error('ImageMapResizer attempt failed:', e);
        }
    });

    // Click handler for areas
    document.querySelectorAll('map area').forEach(area => {
        area.addEventListener('click', function(e) {
            e.preventDefault();
            const frameNum = this.getAttribute('title').match(/\d+/)?.[0];
            if (frameNum) showEnlargedFrame(parseInt(frameNum));
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {

      // 1. Initialize image map first
      initImageMap();
    
      // 2. Set up intersection observer for back wall (renamed to backWallObserver)
      const backWallObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  initImageMap();
              }
          });
      }, { threshold: 0.1 });
      
      const backWall = document.getElementById('back-wall');
      if (backWall) backWallObserver.observe(backWall);
  
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
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
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

    // SLIDER SECTION INTERACTION
    const sliderPanels = document.querySelectorAll('#slider-section .panel');
    
    if (sliderPanels.length > 0) {
        const sectionMap = {
            0: 'video',
            1: null,
            2: 'silhouettes-accordion',
            3: null,
            4: 'front-wall',
            5: 'back-wall',
            6: null
        };
        
        function hideAllSections() {
            ['video', 'front-wall', 'back-wall', 'image-accordion', 'silhouettes'].forEach(id => {
                const section = document.getElementById(id);
                if (section) section.style.display = 'none';
            });
        }
        
        hideAllSections();
        
        sliderPanels.forEach((panel, index) => {
            panel.addEventListener('click', function(e) {
                e.stopPropagation();
                sliderPanels.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                hideAllSections();
                
                const sectionId = sectionMap[index];
                
                if (sectionId === 'silhouettes-accordion') {
                    const imageAccordion = document.getElementById('image-accordion');
                    const silhouettesSection = document.getElementById('silhouettes');
                    
                    if (imageAccordion) imageAccordion.style.display = 'flex';
                    if (silhouettesSection) silhouettesSection.style.display = 'block';
                    
                    document.querySelectorAll('.silhouette-container').forEach(s => s.classList.remove('active'));
                    document.getElementById('silhouette-1')?.classList.add('active');
                    
                    document.querySelectorAll('#image-accordion .panel').forEach(p => p.classList.remove('active'));
                    document.querySelector('#image-accordion .panel')?.classList.add('active');
                    
                    imageAccordion?.scrollIntoView({ behavior: 'smooth' });
                } else if (sectionId) {
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
    const imageAccordionPanels = document.querySelectorAll('#image-accordion .panel');
    
    if (imageAccordionPanels.length > 0) {
        const silhouettesSection = document.getElementById('silhouettes');
        if (silhouettesSection && window.location.hash !== '#silhouettes-accordion') {
            silhouettesSection.style.display = 'none';
        }
        
        imageAccordionPanels.forEach((panel, index) => {
            panel.addEventListener('mouseenter', () => {
                imageAccordionPanels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
            });
            
            panel.addEventListener('click', (e) => {
                e.stopPropagation();
                if (silhouettesSection) silhouettesSection.style.display = 'block';
                
                imageAccordionPanels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
                
                document.querySelectorAll('.silhouette-container').forEach(s => s.classList.remove('active'));
                const selectedSilhouette = document.getElementById(`silhouette-${index + 1}`);
                if (selectedSilhouette) {
                    selectedSilhouette.classList.add('active');
                    
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

    // Initialize image maps
    initImageMap();

    // Silhouette animation observer
    const silhouettes = document.querySelectorAll(".silhouette");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    silhouettes.forEach(silhouette => {
        observer.observe(silhouette);
    });
});

// IMAGE MAP FUNCTIONS
function initImageMap() {
    if (typeof $ !== 'undefined' && $.fn.imageMapResize) {
        $('map').imageMapResize();
        
        // Modern event listeners for map areas
        document.querySelectorAll('area[coords]').forEach(area => {
            area.addEventListener('click', (e) => {
                e.preventDefault();
                const frameNum = area.getAttribute('title').match(/\d+/)?.[0];
                if (frameNum) showEnlargedFrame(parseInt(frameNum));
            });
        });
    }
}

// POPUP FUNCTIONS
function showEnlargedFrame(frameNumber) {
    const popup = document.getElementById(`popup-frame${frameNumber}`);
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close when clicking outside popup content
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        e.target.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// UTILITY FUNCTIONS
function openPDF() {
    window.open('../assets/document/CATALOGUE.pdf', '_blank');
}

// Initialize on full load
window.addEventListener('load', () => {
    setTimeout(initImageMap, 300);
    
    // Fallback image handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'fallback-image.png';
        });
    });
});

// Theme handling
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