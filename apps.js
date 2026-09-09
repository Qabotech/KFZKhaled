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
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '2000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = '24px';
    overlay.style.background = 'rgba(0, 0, 0, 0.76)';

    const modal = document.createElement('div');
    modal.style.position = 'relative';
    modal.style.width = 'min(680px, calc(100vw - 2rem))';
    modal.style.background = '#1a1a1a';
    modal.style.color = '#ffffff';
    modal.style.border = '1px solid #e0b04f';
    modal.style.borderRadius = '16px';
    modal.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.35)';
    modal.style.padding = '24px';
    modal.style.overflow = 'hidden';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Hinweis schließen');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '12px';
    closeButton.style.top = '12px';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.border = '1px solid #e0b04f';
    closeButton.style.background = '#0f0f0f';
    closeButton.style.color = '#e0b04f';
    closeButton.style.fontSize = '28px';
    closeButton.style.lineHeight = '1';
    closeButton.style.cursor = 'pointer';

    const marquee = document.createElement('div');
    marquee.style.overflow = 'hidden';
    marquee.style.background = '#0f0f0f';
    marquee.style.color = '#e0b04f';
    marquee.style.borderRadius = '4px';
    marquee.style.borderLeft = '3px solid #e0b04f';
    marquee.style.margin = '20px 0 16px';
    marquee.style.padding = '8px 0';
    marquee.style.fontSize = '14px';

    const marqueeTrack = document.createElement('div');
    marqueeTrack.style.display = 'inline-block';
    marqueeTrack.style.minWidth = '100%';
    marqueeTrack.style.whiteSpace = 'nowrap';
    marqueeTrack.style.paddingLeft = '100%';
    marqueeTrack.style.animation = 'noticeMove 16s linear infinite';
    marqueeTrack.textContent = '📢 Wir ziehen um! • Ab dem 01. Oktober 2026 finden wir uns in Landstraße 54, 37284 Waldkappel-Bischhausen wieder. • Unser bisheriger Standort in Nordstraße 8 schließt an diesem Tag.';

    const content = document.createElement('div');
    content.style.padding = '8px 16px 8px';

    const title = document.createElement('div');
    title.style.fontSize = '30px';
    title.style.fontWeight = '700';
    title.style.color = '#e0b04f';
    title.style.marginBottom = '12px';
    title.textContent = '📢 Wir ziehen um!';

    const line = document.createElement('p');
    line.style.color = '#d3d3d3';
    line.style.lineHeight = '1.7';
    line.style.fontSize = '16px';
    line.style.margin = '0 0 12px';
    line.innerHTML = 'Ab dem <strong>01. Oktober 2026</strong> finden Sie uns an unserem neuen Standort:';

    const address = document.createElement('div');
    address.style.margin = '12px 0';
    address.style.padding = '12px';
    address.style.background = '#0f0f0f';
    address.style.borderRadius = '8px';
    address.style.border = '1px solid #c09e61';
    address.style.textAlign = 'center';

    const addressLine1 = document.createElement('div');
    addressLine1.style.color = '#e0b04f';
    addressLine1.style.fontSize = '18px';
    addressLine1.style.fontWeight = '700';
    addressLine1.textContent = 'Landstraße 54';

    const addressLine2 = document.createElement('div');
    addressLine2.style.color = '#e0b04f';
    addressLine2.style.fontSize = '18px';
    addressLine2.style.fontWeight = '700';
    addressLine2.textContent = '37284 Waldkappel-Bischhausen';

    const message = document.createElement('p');
    message.style.color = '#d3d3d3';
    message.style.lineHeight = '1.7';
    message.style.fontSize = '16px';
    message.style.margin = '12px 0 0';
    message.textContent = 'Unser bisheriger Firmensitz in der Nordstraße 8, Waldkappel, wird an diesem Tag geschlossen. Wir freuen uns, Sie bald in unseren neuen Räumlichkeiten begrüßen zu dürfen!';

    address.appendChild(addressLine1);
    address.appendChild(addressLine2);

    content.appendChild(title);
    content.appendChild(line);
    content.appendChild(address);
    content.appendChild(message);

    marquee.appendChild(marqueeTrack);
    modal.appendChild(closeButton);
    modal.appendChild(marquee);
    modal.appendChild(content);
    overlay.appendChild(modal);

    const closeNotice = () => {
        sessionStorage.setItem(key, 'true');
        overlay.style.display = 'none';
        overlay.remove();
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