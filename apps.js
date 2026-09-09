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

function initSiteNotice() {
    const key = 'kfzAddressMoveNoticeClosed';

    if (sessionStorage.getItem(key) === 'true') {
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'site-notice-overlay';

    const modal = document.createElement('div');
    modal.className = 'site-notice-modal';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'site-notice-close';
    closeButton.setAttribute('aria-label', 'Hinweis schließen');
    closeButton.innerHTML = '&times;';

    const marquee = document.createElement('div');
    marquee.className = 'site-notice-marquee';
    marquee.innerHTML = '<div class="site-notice-marquee-track">📢 Wir ziehen um! &nbsp; • &nbsp; Ab dem 01. Oktober 2026 finden wir uns in Landstraße 54, 37284 Waldkappel-Bischhausen wieder. &nbsp; • &nbsp; Unser bisheriger Standort in Nordstraße 8 schließt an diesem Tag.</div>';

    const content = document.createElement('div');
    content.className = 'site-notice-content';
    content.innerHTML = `
        <div class="site-notice-title">📢 Wir ziehen um!</div>
        <p class="site-notice-line">Ab dem <strong>01. Oktober 2026</strong> finden Sie uns an unserem neuen Standort:</p>
        <div class="site-notice-address">
            <div><strong>Landstraße 54</strong></div>
            <div><strong>37284 Waldkappel-Bischhausen</strong></div>
        </div>
        <p class="site-notice-message">Unser bisheriger Firmensitz in der Nordstraße 8, Waldkappel, wird an diesem Tag geschlossen. Wir freuen uns, Sie bald in unseren neuen Räumlichkeiten begrüßen zu dürfen!</p>
    `;

    modal.appendChild(closeButton);
    modal.appendChild(marquee);
    modal.appendChild(content);
    overlay.appendChild(modal);

    const closeNotice = () => {
        sessionStorage.setItem(key, 'true');
        overlay.classList.add('site-notice-hidden');
        setTimeout(() => overlay.remove(), 250);
    };

    closeButton.addEventListener('click', closeNotice);
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeNotice();
        }
    });

    document.body.appendChild(overlay);
}

loadNavigation();
loadFooter();
loadHead();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteNotice);
} else {
    initSiteNotice();
}