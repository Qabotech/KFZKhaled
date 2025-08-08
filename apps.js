function loadNavigation() {
    fetch('nav.html') // Pfad zur nav.html
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-container').innerHTML = data;
        })
        .catch(error => console.error('Fehler beim Laden der Navigation:', error));
}

// Funktion zum dynamischen Laden des Footers
function loadFooter() {
    fetch('footer.html') // Pfad zur footer.html
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Fehler beim Laden des Footers:', error));
}

function loadHead() {
    fetch('head.html') // Path to the head.html file
        .then(response => response.text())
        .then(data => {
            document.getElementById('head-container').innerHTML = data;
        })
        .catch(error => console.error('Fehler beim Laden des <head> Inhalts:', error));
}
loadNavigation();
loadFooter();
loadHead();