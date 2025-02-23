document.addEventListener('DOMContentLoaded', () => {
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

    function setLanguage(lang) {
        // Hide all language-specific content
        var elements = document.querySelectorAll('.lang');
        elements.forEach(function(el) {
            el.classList.remove('active');
        });

        // Show the selected language content
        document.getElementById(lang).classList.add('active');
    }

    document.addEventListener('scroll', function() {
        const heroSection = document.querySelector('#hero');
        const scrollPosition = window.scrollY;

        // Adjust background position to create parallax effect
        heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Image Accordion Hover Effect
    const panels = document.querySelectorAll(".accordion .panel");

    panels.forEach(panel => {
        panel.addEventListener("mouseenter", () => {
            panels.forEach(p => p.classList.remove("active"));
            panel.classList.add("active");
        });
    });

    // Silhouette Visibility Control
    const silhouettes = document.querySelectorAll(".silhouette-container");

    // Initially show the first silhouette (or none if preferred)
    silhouettes.forEach(silhouette => silhouette.classList.remove("active"));
    document.getElementById("silhouette-1").classList.add("active");

    panels.forEach((panel, index) => {
        panel.addEventListener("click", () => {
            // Remove active class from all silhouette sections
            silhouettes.forEach(silhouette => silhouette.classList.remove("active"));
    
            // Show only the corresponding silhouette
            const selectedSilhouette = document.getElementById(`silhouette-${index + 1}`);
            if (selectedSilhouette) {
                selectedSilhouette.classList.add("active");
    
                // Scroll smoothly to align the bottom of the silhouettes section with the bottom of the viewport
                const silhouettesSection = document.getElementById("silhouettes");
                const viewportHeight = window.innerHeight;
                const silhouettesBottom = silhouettesSection.getBoundingClientRect().bottom + window.scrollY;
                
                window.scrollTo({
                    top: silhouettesBottom - viewportHeight,
                    behavior: "smooth"
                });
            }
        });
    });    

});

// Open PDF Function
function openPDF() {
    window.open("../assets/document/CATALOGUE.pdf", "_blank");
}