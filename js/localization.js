$(document).ready(function() {
    function setLanguage(language) {
        // Determine the base path for assets
        const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
        const basePath = isIndexPage ? './' : '../';

        // Update text based on the selected language
        if (language === 'en') {
            $('#hero h1').text('Alice in Brussels');
            $('#hero h5').text('Exhibition');
            $('#about h2').text('About');
            $('#contact h2').text('Contact Us');

            // Update navigation items
            $('#navhome').text('Home');
            $('#navabout').text('About');
            $('#navcontact').text('Contact Us');
            $('a.dropdown-item[href="' + basePath + 'pages/videos.html"]').text('Videos');
            $('a.dropdown-item[href="' + basePath + 'pages/documents.html"]').text('Documents');
            $('a.dropdown-item[href="' + basePath + 'pages/credits.html"]').text('Credits');
            $('#more').text('More');
            $('#darkmode span').text('Theme');
        } else if (language === 'it') {
            $('#hero h1').text('Alice a Bruxelles');
            $('#hero h5').text('Mostra');
            $('#about h2').text('Informazioni');
            $('#contact h2').text('Contattaci');

            // Update navigation items
            $('#navhome').text('Inizio');
            $('#navabout').text('Informazioni');
            $('#navcontact').text('Contattaci');
            $('a.dropdown-item[href="' + basePath + 'pages/videos.html"]').text('Video');
            $('a.dropdown-item[href="' + basePath + 'pages/documents.html"]').text('Documenti');
            $('a.dropdown-item[href="' + basePath + 'pages/credits.html"]').text('Crediti');
            $('#more').text('Altro');
            $('#darkmode span').text('Tema');
        }

        // Update the dropdown button with the selected language flag only
        const flagPath = basePath + `assets/img/${language}.svg`;
        $('#languageDropdown').html(`<img src="${flagPath}" alt="${language}" width="20"> <span class="visually-hidden">${language}</span>`);

        // Store the selected language in localStorage
        localStorage.setItem('language', language);
    }

    // Initialize the language dropdown with the current language
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    // Attach the setLanguage function to the global window object
    window.setLanguage = setLanguage;
});