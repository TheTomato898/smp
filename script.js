lucide.createIcons();


const copyButton = document.getElementById('copy-button');
const copyIcon = document.getElementById('copy-icon');
const copyText = document.getElementById('copy-text');

copyButton.addEventListener("click", async () => {

  // Text in Zwischenablage kopieren
  await navigator.clipboard.writeText('wrongnoah.de');

  // Text ändern
  copyText.textContent = "IP kopiert";

  // Icon ändern
  copyIcon.innerHTML = '<i data-lucide="check"></i>';

  // Icons neu rendern
  lucide.createIcons();

  // Nach 2 Sekunden zurücksetzen
  setTimeout(() => {
    copyText.textContent = "Copy Server IP";

    copyIcon.innerHTML = '<i data-lucide="copy"></i>'

    lucide.createIcons();
  }, 2000);

});

// Warten bis HTML geladen ist
document.addEventListener('DOMContentLoaded', () => {

  // Alle Elemente auswählen
  const elements = document.querySelectorAll('.fade-in');

  // Observer erstellen
  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      // Wenn sichtbar
      if (entry.isIntersecting) {

        // Klasse hinzufügen
        entry.target.classList.add('visible');

        // Optional:
        // Nur einmal animieren
        observer.unobserve(entry.target);
      }
    });

  }, {
    threshold: 0.1
  });

  // Elemente beobachten
  elements.forEach(el => {
    observer.observe(el);
  });

});