document.addEventListener('DOMContentLoaded', function () {
    const themeToggleCheckbox = document.getElementById('switchTheme');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-bs-theme', currentTheme);
    themeToggleCheckbox.checked = currentTheme === 'dark';

    themeToggleCheckbox.addEventListener('change', function () {
        let theme = themeToggleCheckbox.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    });
});