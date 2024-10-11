document.addEventListener('DOMContentLoaded', () => {
    const navEl = document.querySelector('.nav');
    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const dropdowns = document.querySelectorAll('.navbar-nav .dropdown');
    const backToTopButton = document.getElementById('back-to-top');

    const checkScroll = () => {
        if (window.scrollY >= 56 || toggleButton.getAttribute('aria-expanded') === 'true') {
            navEl.classList.add('nav-scrolled');
        } else {
            navEl.classList.remove('nav-scrolled');
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
});