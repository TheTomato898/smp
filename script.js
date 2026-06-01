// Lucide Icons rendern

lucide.createIcons();


// Copy Button

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

//Fade-in Effect

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

// Server Status

/*
const serverIP = 'wrongnoah.de'; 

async function checkServerStatus() {
  try {
    // kostenlose API von mcstatus.io
    const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverIP}`);
    const data = await response.json();

    const statusElement = document.getElementById('server-status');
    const playersElement = document.getElementById('player-count');
    
    if (data.online) {
      statusElement.textContent = "Online";
      statusElement.className = "online";
      // Zeigt "aktuelle Spieler / maximale Spieler" an
      playersElement.textContent = `${data.players.online} / ${data.players.max}`;
    } else {
      statusElement.textContent = "Offline";
      statusElement.className = "offline";
      playersElement.textContent = "0 / 0";
    }
  } 
  catch (error) {
    console.error("Fehler beim Abrufen des Server-Status:", error);
    document.getElementById('server-status').textContent = "Fehler";
  }
}

// Status beim Laden der Seite abrufen
checkServerStatus();
        
// Status alle 60 Sekunden automatisch aktualisieren
setInterval(checkServerStatus, 60000);
*/