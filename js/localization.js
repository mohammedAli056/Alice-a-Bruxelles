$(document).ready(function() {
    function setLanguage(language) {
        if (language === 'en') {
            $('#hero h1').text('Alice in Brussels');
            $('#hero h5').text('Exhibition');
            $('#about h2').text('About');
            $('#about p').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque.');
            $('#contact h2').text('Contact Us');
            $('#contact p').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque.');
        } else if (language === 'it') {
            $('#hero h1').text('Alice a Bruxelles');
            $('#hero h5').text('Mostra');
            $('#about h2').text('Informazioni');
            $('#about p').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque.');
            $('#contact h2').text('Contattaci');
            $('#contact p').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque.');
        }
    }

    window.setLanguage = setLanguage;
});