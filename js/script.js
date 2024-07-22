// Hide Header/Navigation Bar Opacity
const navEl = document.querySelector('.header');
const toggleButton = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 56) {
        navEl.classList.add('bg-light');
        navEl.classList.add('header-box-shadow');
    } else {
        navEl.classList.remove('bg-light');
        navEl.classList.remove('header-box-shadow');
    }
});

toggleButton.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
        navEl.classList.remove('bg-light');
        navEl.classList.remove('header-box-shadow');
    } else {
        navEl.classList.add('bg-light');
        navEl.classList.add('header-box-shadow');
    }
});

navbarCollapse.addEventListener('hidden.bs.collapse', () => {
    if (window.scrollY < 56) {
        navEl.classList.remove('bg-light');
        navEl.classList.remove('header-box-shadow');
    }
});

// Navigation Bar Dropdown
document.addEventListener('DOMContentLoaded', function () {
    var dropdowns = document.querySelectorAll('.navbar-nav .dropdown');

    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('mouseenter', function () {
            var dropdownMenu = this.querySelector('.dropdown-menu');
            dropdownMenu.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', function () {
            var dropdownMenu = this.querySelector('.dropdown-menu');
            dropdownMenu.classList.remove('show');
        });
    });
});
