// Hide Header/Navigation Bar Opacity
const navEl = document.querySelector('.nav');
const toggleButton = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 56) {
        navEl.classList.add('nav-scrolled');
    } else {
        navEl.classList.remove('nav-scrolled');
    }
});

toggleButton.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
        navEl.classList.remove('nav-scrolled');
    } else {
        navEl.classList.add('nav-scrolled');
    }
});

navbarCollapse.addEventListener('hidden.bs.collapse', () => {
    if (window.scrollY < 56) {
        navEl.classList.remove('nav-scrolled');
    }
});

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

$(document).ready(function() {
    $('.navbar-nav .nav-link, .navbar-brand').on('click', function() {
        if (!$(this).hasClass('dropdown-toggle') && $('.navbar-toggler').is(':visible')) {
            $('.navbar-collapse').collapse('hide');
        }
    });
});