const navEl = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 56) {
        navEl.classList.add('bg-light');
    } else if (window.scrollY < 56) {
        navEl.classList.remove('bg-light');
    }
})