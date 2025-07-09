document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const navEl = document.querySelector('.nav');
    const backToTopButton = document.getElementById('back-to-top');
    const toggleButton = document.querySelector('.navbar-toggler');
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const backWallImage = document.getElementById('back-wall-image');

    // Check page scroll for navbar style changes
    const checkScroll = () => {
        if (window.scrollY > 100) {
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

    // Initialize back wall hotspots when image loads
    if (backWallImage) {
        if (backWallImage.complete && backWallImage.naturalWidth > 0) {
            window.requestAnimationFrame(initBackWallHotspotsOnce);
        } else {
            backWallImage.addEventListener('load', () => {
                window.requestAnimationFrame(initBackWallHotspotsOnce);
            });
        }
    }

    backToTopButton.onclick = function () {
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

    // FIXED SLIDER SECTION INTERACTION
const sliderPanels = document.querySelectorAll('#slider-section .panel');

if (sliderPanels.length > 0) {
    // CORRECTED section mapping to match your HTML structure
    const sectionMap = {
        0: 'video',                    // Videos panel
        1: 'silhouettes-accordion',    // La Montesca School
        2: 'image-accordion',          // Photos & Letters (if you have this)
        3: 'back-wall-panels',         // Montessori Materials (ceiling panels)
        4: 'front-wall',               // 1910 Exhibition
        5: 'back-wall',                // Back Wall - THE SECTION WITH HOTSPOTS
        6: 'right-wall'                // Visitors' Guide
    };

    function hideAllSections() {
        resetHotspots(); 
        ['video', 'stand', 'front-wall', 'back-wall', 'back-wall-panels', 'image-accordion', 'silhouettes', 'ceiling', 'right-wall'].forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = 'none';
        });
    }

    hideAllSections();

    sliderPanels.forEach((panel, index) => {
        panel.addEventListener('click', function (e) {
            e.stopPropagation();
            sliderPanels.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            hideAllSections();

            const sectionId = sectionMap[index];
            console.log(`Clicked panel ${index}, showing section: ${sectionId}`);

            if (sectionId === 'silhouettes-accordion') {
                const imageAccordion = document.getElementById('image-accordion');
                const silhouettesSection = document.getElementById('silhouettes');

                if (imageAccordion) imageAccordion.style.display = 'flex';
                if (silhouettesSection) silhouettesSection.style.display = 'block';

                document.querySelectorAll('.silhouette-container').forEach(s => s.classList.remove('active'));
                document.getElementById('silhouette-1')?.classList.add('active');

                document.querySelectorAll('#image-accordion .panel').forEach(p => p.classList.remove('active'));
                document.querySelector('#image-accordion .panel')?.classList.add('active');

                imageAccordion?.scrollIntoView({behavior: 'smooth'});
            } 
            else if (sectionId === 'back-wall') {
                // THIS IS THE CORRECT SECTION - Back Wall with Hotspots
                const backWall = document.getElementById('back-wall');
                
                if (backWall) {
                    backWall.style.display = 'block';
                    console.log('Back wall section made visible, initializing hotspots...');
                    
                    // Initialize hotspots after section is visible
                    setTimeout(() => {
                        initBackWallHotspotsOnce();
                    }, 300); // Increased delay

                    backWall.scrollIntoView({ behavior: 'smooth' });
                }
            }
            else if (sectionId === 'back-wall-panels') {
                // Montessori Materials (ceiling panels)
                const backWallPanels = document.getElementById('back-wall-panels');
                if (backWallPanels) {
                    backWallPanels.style.display = 'block';
                    backWallPanels.scrollIntoView({behavior: 'smooth'});
                }
            }
            else if (sectionId === 'right-wall') {
                const rightWall = document.getElementById('right-wall');
                if (rightWall) {
                    rightWall.style.display = 'block';
                    rightWall.scrollIntoView({behavior: 'smooth'});
                }
            } 
            else if (sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.style.display = 'block';
                    section.scrollIntoView({behavior: 'smooth'});
                }
            }
        });
    });

    window.scrollTo({top: 0, behavior: 'smooth'});

    // CHANGED: Activate "Montessori Materials" by default (index 3) instead of right-wall
    const defaultPanel = sliderPanels[3];
    if (defaultPanel) {
        defaultPanel.click();
    }
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
    }, {threshold: 0.3});

    silhouettes.forEach(silhouette => {
        observer.observe(silhouette);
    });

    /*===========================================
    PANEL LOGIC - Flip in normal mode, Zoom icon
    ===========================================*/
    const ceilingPanels = document.querySelectorAll('.ceiling-panel');

    // Flip in normal mode by clicking panel
    ceilingPanels.forEach((panel) => {
        panel.addEventListener('click', (event) => {
            // If user clicked the zoom icon, do not flip; we'll enlarge instead
            if (event.target.closest('.zoom-icon')) return;
            panel.classList.toggle('flipped');
        });
    });


    // Enlarge logic: open modal only if zoom icon is clicked
    const ceilingModal = document.getElementById('ceiling-modal');
    const ceilingModalClose = document.getElementById('ceiling-modal-close');
    const ceilingModalPrev = document.getElementById('ceiling-modal-prev');
    const ceilingModalNext = document.getElementById('ceiling-modal-next');
    const modalFlipBtn = document.getElementById('ceiling-modal-flip-btn');

    const flipContainer = document.getElementById('modal-flip-container');
    const flipInner = flipContainer.querySelector('.flip-inner');
    const modalImageFront = document.getElementById('ceiling-modal-image-front');
    const modalImageBack = document.getElementById('ceiling-modal-image-back');

    // Desired order: 4 → 1 → 5 → 2 → 6 → 3
    const panelOrder = [4, 1, 5, 2, 6, 3];
    const panelImages = {
        1: {
            front: '../assets/img/ceiling-1f.png',
            back: '../assets/img/ceiling-1r-en.png',
        },
        2: {
            front: '../assets/img/ceiling-2f.png',
            back: '../assets/img/ceiling-2r-en.png',
        },
        3: {
            front: '../assets/img/ceiling-3f.png',
            back: '../assets/img/ceiling-3r-en.png',
        },
        4: {
            front: '../assets/img/ceiling-4f.png',
            back: '../assets/img/ceiling-4r-en.png',
        },
        5: {
            front: '../assets/img/ceiling-5f.png',
            back: '../assets/img/ceiling-5r-en.png',
        },
        6: {
            front: '../assets/img/ceiling-6f.png',
            back: '../assets/img/ceiling-6r-en.png',
        },
    };

    let currentIndex = 0;

    function openCeilingModal(panelNumber) {
    currentIndex = panelOrder.indexOf(panelNumber);
    if (currentIndex < 0) currentIndex = 0;
    flipContainer.classList.remove('flipped');
    updateCeilingModal();
    document.body.classList.add('modal-open');
    ceilingModal.style.display = 'flex';
}

    function updateCeilingModal() {
        const panelNum = panelOrder[currentIndex];
        modalImageFront.src = panelImages[panelNum].front;
        modalImageBack.src = panelImages[panelNum].back;
    }

    function closeModal() {
    ceilingModal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

    function showNext() {
        currentIndex = (currentIndex + 1) % panelOrder.length;
        flipContainer.classList.remove('flipped');
        updateCeilingModal();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + panelOrder.length) % panelOrder.length;
        flipContainer.classList.remove('flipped');
        updateCeilingModal();
    }

    // Enlarge only on zoom icon
    ceilingPanels.forEach((panel) => {
        const zoomIcon = panel.querySelector('.zoom-icon');
        zoomIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // prevent panel flip
            const panelNumber = parseInt(panel.getAttribute('data-panel'), 10);
            openCeilingModal(panelNumber);
        });
    });

    // Close modal if X is clicked
    ceilingModalClose.addEventListener('click', closeModal);
    // Close modal if outside content is clicked
    ceilingModal.addEventListener('click', (event) => {
        if (event.target === ceilingModal) closeModal();
    });

    // Navigation arrows
    ceilingModalNext.addEventListener('click', showNext);
    ceilingModalPrev.addEventListener('click', showPrev);

    // Flip in the enlarged modal only via button
    modalFlipBtn.addEventListener('click', () => {
        flipContainer.classList.toggle('flipped');
    });

    // BACK WALL ZOOM-ONLY PANELS
    document.querySelectorAll('.back-wall-panel .zoom-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation();
            const panel = icon.closest('.back-wall-panel');
            const panelNumber = parseInt(panel.getAttribute('data-panel'), 10);
            showEnlargedFrame(panelNumber);
        });
    });

    // Right Wall Panel Modal functionality with zoom
    const rightWallModal = document.getElementById('right-wall-modal');
    const rightWallModalImage = document.getElementById('right-wall-modal-image');
    const rightWallModalClose = document.querySelector('.right-wall-modal-close');
    const rightWallModalPrev = document.getElementById('right-wall-modal-prev');
    const rightWallModalNext = document.getElementById('right-wall-modal-next');
    const rightWallImageContainer = document.querySelector('.right-wall-modal-image-container');

    const rightWallPanels = document.querySelectorAll('.right-wall-panel');
    const rightWallPanelOrder = [1, 2, 3]; // Panel IDs in display order

    // Panel images mapping
    const rightWallPanelImages = {
        1: '../assets/img/panel-1-en.png',
        2: '../assets/img/panel-2-en.png',
        3: '../assets/img/credits.png'
    };

    let rightWallCurrentIndex = 0;

    // Zoom functionality variables
    let currentZoom = 1;
    let maxZoom = 3;
    let minZoom = 1;
    let dragActive = false;
    let startX, startY, initialX, initialY;
    let translateX = 0;
    let translateY = 0;

    // Update zoom level display
    function updateZoomLevelDisplay() {
        const zoomLevelDisplay = rightWallModal.querySelector('.zoom-level');
        if (zoomLevelDisplay) {
            zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
        }
    }

    // Apply transform to image
    function setImageTransform() {
        rightWallModalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
    }

    // Reset zoom and position
    function resetZoom() {
        currentZoom = 1;
        translateX = 0;
        translateY = 0;
        updateZoomLevelDisplay();
        setImageTransform();
    }

    // Zoom in button click handler
    if (rightWallModal) {
        const zoomInBtn = rightWallModal.querySelector('.zoom-in');
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                if (currentZoom < maxZoom) {
                    currentZoom += 0.25;
                    updateZoomLevelDisplay();
                    setImageTransform();
                }
            });
        }

        // Zoom out button click handler
        const zoomOutBtn = rightWallModal.querySelector('.zoom-out');
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if (currentZoom > minZoom) {
                    currentZoom -= 0.25;
                    updateZoomLevelDisplay();
                    setImageTransform();
                }
            });
        }

        // Reset zoom button click handler
        const resetBtn = rightWallModal.querySelector('.zoom-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetZoom);
        }
    }

    // Mouse wheel zoom
    if (rightWallImageContainer) {
        rightWallImageContainer.addEventListener('wheel', (e) => {
            e.preventDefault();

            // Calculate zoom
            const delta = -Math.sign(e.deltaY) * 0.1;
            const newZoom = Math.min(Math.max(currentZoom + delta, minZoom), maxZoom);

            // Apply zoom if changed
            if (newZoom !== currentZoom) {
                currentZoom = newZoom;
                updateZoomLevelDisplay();
                setImageTransform();
            }
        });

        // Drag to pan functionality - Mousedown on the image container
        rightWallImageContainer.addEventListener('mousedown', (e) => {
            // Only activate drag if zoomed in and it's a left-click
            if (currentZoom > 1 && e.button === 0) {
                dragActive = true;
                startX = e.clientX;
                startY = e.clientY;
                initialX = translateX;
                initialY = translateY;
                rightWallImageContainer.style.cursor = 'grabbing';
                e.preventDefault(); // Prevent default browser drag behavior
            }
        });

        // Mousemove on the image container
        rightWallImageContainer.addEventListener('mousemove', (e) => {
            if (dragActive) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                translateX = initialX + dx;
                translateY = initialY + dy;

                setImageTransform();
            }
        });

        // Mouseleave from the container - if dragging, stop it.
        rightWallImageContainer.addEventListener('mouseleave', () => {
            if (dragActive) {
                dragActive = false;
                rightWallImageContainer.style.cursor = 'grab';
            }
        });

        // Touch events for mobile
        rightWallImageContainer.addEventListener('touchstart', (e) => {
            if (currentZoom > 1 && e.touches.length === 1) {
                dragActive = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                initialX = translateX;
                initialY = translateY;
            }
        });

        rightWallImageContainer.addEventListener('touchmove', (e) => {
            if (dragActive && e.touches.length === 1) {
                const dx = e.touches[0].clientX - startX;
                const dy = e.touches[0].clientY - startY;

                translateX = initialX + dx;
                translateY = initialY + dy;

                setImageTransform();
                e.preventDefault();
            }
        });

        rightWallImageContainer.addEventListener('touchend', () => {
            dragActive = false;
        });

        rightWallImageContainer.addEventListener('touchcancel', () => {
            dragActive = false;
        });
    }

    // GLOBAL Mouseup handler - this is crucial for releasing the drag
    window.addEventListener('mouseup', (e) => {
        if (dragActive && e.button === 0) { // Check if drag was active and it's a left-click release
            dragActive = false;
            if (rightWallImageContainer) {
                rightWallImageContainer.style.cursor = 'grab';
            }
        }
    });

    // Open modal when zoom icon is clicked
    rightWallPanels.forEach(panel => {
        const zoomIcon = panel.querySelector('.zoom-icon');
        if (zoomIcon) {
            zoomIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                const panelNumber = parseInt(panel.getAttribute('data-panel'), 10);
                openRightWallModal(panelNumber);
            });
        }
    });

    function openRightWallModal(panelNumber) {
        rightWallCurrentIndex = rightWallPanelOrder.indexOf(panelNumber);
        if (rightWallCurrentIndex < 0) rightWallCurrentIndex = 0;
        // Reset zoom when opening modal
        resetZoom();
        updateRightWallModal();
        rightWallModal.style.display = 'flex';
    }

    function updateRightWallModal() {
        const panelNum = rightWallPanelOrder[rightWallCurrentIndex];
        rightWallModalImage.src = rightWallPanelImages[panelNum];
        // Reset zoom when changing panels
        resetZoom();
    }

    function closeRightWallModal() {
        rightWallModal.style.display = 'none';
    }

    function showRightWallNext() {
        rightWallCurrentIndex = (rightWallCurrentIndex + 1) % rightWallPanelOrder.length;
        updateRightWallModal();
    }

    function showRightWallPrev() {
        rightWallCurrentIndex = (rightWallCurrentIndex - 1 + rightWallPanelOrder.length) % rightWallPanelOrder.length;
        updateRightWallModal();
    }

    // Event listeners for modal controls
    if (rightWallModalClose) rightWallModalClose.addEventListener('click', closeRightWallModal);
    if (rightWallModal) {
        rightWallModal.addEventListener('click', (event) => {
            if (event.target === rightWallModal) closeRightWallModal();
        });
    }
    if (rightWallModalNext) rightWallModalNext.addEventListener('click', showRightWallNext);
    if (rightWallModalPrev) rightWallModalPrev.addEventListener('click', showRightWallPrev);
});

// IMAGE MAP FUNCTIONS
function initImageMap() {
    if (window.jQuery && $.fn.imageMapResize) {
        $('map').imageMapResize();
        document.querySelectorAll('area[coords]').forEach(area => {
            area.addEventListener('click', e => {
                e.preventDefault();
                const frameNum = area.getAttribute('title').match(/\d+/)?.[0];
                if (frameNum) openFrameModal(parseInt(frameNum) - 1); // Convert to 0-based index
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

//Landing Page Video
function playLandingVideo() {
    const image = document.getElementById("previewImage");
    const video = document.getElementById("landingVideo");
    image.style.display = "none";
    video.style.display = "block";
    video.play();
}

function scrollToVideo() {
    const target = document.getElementById("landing-video-element");
    if (target) {
        target.scrollIntoView({behavior: "smooth"});
    }
}


// section 6 back wall hotspots

// ──────────────────────────────────────────────────────────────────────────────
// FRAME MODAL FUNCTIONS (Back Wall Frames)
// ──────────────────────────────────────────────────────────────────────────────
const frameModal = document.getElementById('frame-modal');
const frameModalClose = document.getElementById('frame-modal-close');
const frameModalPrev = document.getElementById('frame-modal-prev');
const frameModalNext = document.getElementById('frame-modal-next');
const frameModalFlipBtn = document.getElementById('frame-modal-flip-btn');
const frameFlipContainer = document.getElementById('frame-modal-flip-container');
const frameModalImageFront = document.getElementById('frame-modal-image-front');
const frameModalImageBack = document.getElementById('frame-modal-image-back');

const frameData = [
  { front: '../assets/img/enlarged-frame-1.png',  description: 'Description for Frame 1' },
  { front: '../assets/img/enlarged-frame-2.png',  description: 'Description for Frame 2' },
  { front: '../assets/img/enlarged-frame-3.png',  description: 'Description for Frame 3' },
  { front: '../assets/img/enlarged-frame-4.png',  description: 'Description for Frame 4' },
  { front: '../assets/img/enlarged-frame-5.png',  description: 'Description for Frame 5' },
  { front: '../assets/img/enlarged-frame-6.jpeg', description: 'Description for Frame 6' },
  { front: '../assets/img/enlarged-frame-7.jpeg', description: 'Description for Frame 7' },
  { front: '../assets/img/enlarged-frame-8.png',  description: 'Description for Frame 8' },
  { front: '../assets/img/enlarged-frame-9.JPG',  description: 'Description for Frame 9' },
  { front: '../assets/img/enlarged-frame-10.png', description: 'Description for Frame 10' },
  { front: '../assets/img/enlarged-frame-11.png', description: 'Description for Frame 11' },
];
let currentFrameIndex = 0;

function openFrameModal(idx) {
  currentFrameIndex = idx;
  updateFrameModal();
  if (frameModal) {
    document.body.classList.add('modal-open');
    frameModal.style.display = 'flex';
    if (frameFlipContainer) frameFlipContainer.classList.remove('flipped');
  }
}

function closeFrameModal() {
  if (frameModal) frameModal.style.display = 'none';
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
}

function showPrevFrame() {
  currentFrameIndex = (currentFrameIndex - 1 + frameData.length) % frameData.length;
  updateFrameModal();
  if (frameFlipContainer) frameFlipContainer.classList.remove('flipped');
}

function showNextFrame() {
  currentFrameIndex = (currentFrameIndex + 1) % frameData.length;
  updateFrameModal();
  if (frameFlipContainer) frameFlipContainer.classList.remove('flipped');
}

function updateFrameModal() {
  const data = frameData[currentFrameIndex];
  if (frameModalImageFront) frameModalImageFront.src = data.front;
  const description = document.getElementById('frame-modal-description');
  if (description) description.textContent = data.description;
  if (frameModalFlipBtn) frameModalFlipBtn.style.display = 'block';
}

// Add event listeners if elements exist
if (frameModal) {
  if (frameModalClose) frameModalClose.addEventListener('click', closeFrameModal);
  frameModal.addEventListener('click', e => {
    if (e.target === frameModal) closeFrameModal();
  });
  if (frameModalPrev) frameModalPrev.addEventListener('click', showPrevFrame);
  if (frameModalNext) frameModalNext.addEventListener('click', showNextFrame);
  if (frameModalFlipBtn) frameModalFlipBtn.addEventListener('click', () => {
    if (frameFlipContainer) frameFlipContainer.classList.toggle('flipped');
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// BACK WALL HOTSPOTS
// ──────────────────────────────────────────────────────────────────────────────
let hotspotsInitialized = false; // Flag to prevent re-initialization

function initBackWallHotspots() {
  // IMPORTANT: Only initialize if we're in the correct section
  const backWallSection = document.getElementById('back-wall');
  if (!backWallSection || backWallSection.style.display === 'none') {
    console.log('Back wall section not visible, skipping hotspot initialization');
    return;
  }

  // Exit if already initialized
  if (hotspotsInitialized) {
    console.log('Hotspots already initialized, skipping...');
    return;
  }

  const img = document.getElementById('back-wall-image');
  const container = img?.closest('.image-map-container');
  
  if (!container || !img || !img.naturalWidth || !img.naturalHeight) {
    console.log('Back wall hotspots: waiting for image to load...');
    return;
  }

  // Additional check: make sure image has actual displayed dimensions
  if (img.offsetWidth === 0 || img.offsetHeight === 0) {
    console.log('Back wall image not properly displayed, retrying...');
    setTimeout(() => {
      initBackWallHotspots();
    }, 200);
    return;
  }

  // Clear any existing hotspots
  container.querySelectorAll('.frame-hotspot').forEach(h => h.remove());

  const mapName = img.useMap?.slice(1);
  if (!mapName) {
    console.log('Back wall hotspots: no map found');
    return;
  }

  const mapElement = document.querySelector(`map[name="${mapName}"]`);
  if (!mapElement) {
    console.log(`Back wall hotspots: map "${mapName}" not found`);
    return;
  }

  // Get image positioning and scaling info
  const imgRect = img.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  const displayedWidth = img.offsetWidth;
  const displayedHeight = img.offsetHeight;
  
  const scaleX = displayedWidth / img.naturalWidth;
  const scaleY = displayedHeight / img.naturalHeight;
  
  const imgLeft = imgRect.left - containerRect.left;
  const imgTop = imgRect.top - containerRect.top;

  console.log('Initializing hotspots with image info:', {
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    displayedWidth,
    displayedHeight,
    scaleX,
    scaleY,
    imgLeft,
    imgTop,
    sectionVisible: backWallSection.style.display
  });

  // Process each area in the map
  const areas = mapElement.querySelectorAll('area');
  areas.forEach((area, idx) => {
    const coords = area.coords.split(',').map(Number);
    
    if (area.shape === 'poly') {
      const xs = coords.filter((_, i) => i % 2 === 0);
      const ys = coords.filter((_, i) => i % 2 === 1);
      
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);
      
      const sliceW = maxX - minX;
      const sliceH = maxY - minY;

      // Calculate the position relative to the displayed image
      const cssLeft = imgLeft + (minX * scaleX);
      const cssTop = imgTop + (minY * scaleY);
      const cssWidth = sliceW * scaleX;
      const cssHeight = sliceH * scaleY;

      // Create canvas to draw the image slice
      const canvas = document.createElement('canvas');
      canvas.className = 'frame-hotspot';
      canvas.setAttribute('data-frame', idx + 1);
      canvas.width = sliceW;   // Natural pixels for crisp rendering
      canvas.height = sliceH;  // Natural pixels for crisp rendering
      
      // Style the canvas hotspot
      Object.assign(canvas.style, {
        position: 'absolute',
        left: `${cssLeft}px`,
        top: `${cssTop}px`,
        width: `${cssWidth}px`,
        height: `${cssHeight}px`,
        cursor: 'pointer',
        borderRadius: '8px',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        pointerEvents: 'auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        border: '3px solid rgba(255, 255, 255, 0.8)'
      });

      // Draw the actual image slice onto the canvas
      const ctx = canvas.getContext('2d');
      try {
        // Wait for image to be fully loaded before drawing
        if (img.complete) {
          ctx.drawImage(
            img,
            minX, minY, sliceW, sliceH,  // Source rectangle (natural coordinates)
            0, 0, sliceW, sliceH         // Destination rectangle (canvas coordinates)
          );
        } else {
          img.addEventListener('load', () => {
            ctx.drawImage(
              img,
              minX, minY, sliceW, sliceH,
              0, 0, sliceW, sliceH
            );
          });
        }
      } catch (e) {
        console.error('Error drawing image slice:', e);
      }

      // Add hover effects
      canvas.addEventListener('mouseenter', () => {
        canvas.style.transform = 'scale(1.1)';
        canvas.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
        canvas.style.border = '3px solid rgba(32, 201, 151, 0.9)'; // Green border
        canvas.style.zIndex = '1'; // Bring to front
      });
      
      canvas.addEventListener('mouseleave', () => {
        canvas.style.transform = 'scale(1)';
        canvas.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        canvas.style.border = '3px solid rgba(255, 255, 255, 0.8)';
        canvas.style.zIndex = 'auto'; // Reset z-index
      });

      // Add click handler
      canvas.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(`Clicked frame ${idx + 1}`);
        openFrameModal(idx);
      });

      container.appendChild(canvas);
    }
  });

  // Mark as initialized to prevent future recalculations
  hotspotsInitialized = true;
  console.log(`Back wall hotspots: Created ${areas.length} presentable image slice hotspots - LOCKED`);
}

// Updated initialization - only runs once
function initBackWallHotspotsOnce() {
  const img = document.getElementById('back-wall-image');
  const backWallSection = document.getElementById('back-wall');
  
  if (!img || !backWallSection) {
    console.log('Back wall image or section not found');
    return;
  }

  // Check if back wall section is actually visible
  if (backWallSection.style.display === 'none') {
    console.log('Back wall section not visible, not initializing hotspots');
    return;
  }

  if (img.complete && img.naturalWidth > 0) {
    setTimeout(() => {
      initBackWallHotspots();
    }, 200); // Increased delay to ensure layout is settled
  } else {
    img.addEventListener('load', () => {
      setTimeout(() => {
        initBackWallHotspots();
      }, 200);
    });
  }
}

// Reset hotspots when switching sections
function resetHotspots() {
  hotspotsInitialized = false;
  // Clear any existing hotspots from all containers
  document.querySelectorAll('.frame-hotspot').forEach(h => h.remove());
  console.log('Hotspots reset');
}

