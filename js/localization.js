$(document).ready(function() {
    function setLanguage(language) {
        // Update text based on the selected language
        if (language === 'en') {
            $('#hero h1').text('Alice in Brussels');
            $('#hero h5').text('Exhibition');
            $('#about h2').text('About');
            $('#about p').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque.');
            $('#contact h2').text('Contact Us');

            // Update navigation items
            $('a.nav-link[aria-current="page"]').text('Home');
            $('a.nav-link[href="#about"]').text('About');
            $('a.nav-link[href="#contact"]').text('Contact Us');
            $('a.nav-link[href="./pages/videos.html"]').each(function(index) {
                if (index === 0) $(this).text('Videos');
                else $(this).text('Documents');
            });
            $('a.dropdown-item[href="#credits"]').text('Credits');

            // Update "More" dropdown text
            $('a.nav-link.dropdown-toggle').filter(function() {
                return $(this).text() === 'Altro';
            }).text('More');
        } else if (language === 'it') {
            $('#hero h1').text('Alice a Bruxelles');
            $('#hero h5').text('Mostra');
            $('#about h2').text('Informazioni');
            $('#about p').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque.');
            $('#contact h2').text('Contattaci');

            // Update navigation items
            $('a.nav-link[aria-current="page"]').text('Inizio');
            $('a.nav-link[href="#about"]').text('Informazioni');
            $('a.nav-link[href="#contact"]').text('Contattaci');
            $('a.nav-link[href="./pages/videos.html"]').each(function(index) {
                if (index === 0) $(this).text('Video');
                else $(this).text('Documenti');
            });
            $('a.dropdown-item[href="#credits"]').text('Crediti');

            // Update "More" dropdown text
            $('a.nav-link.dropdown-toggle').filter(function() {
                return $(this).text() === 'More';
            }).text('Altro');
        }

        // Update the dropdown button with the selected language flag only
        const flagPath = `./assets/img/${language}.svg`;
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