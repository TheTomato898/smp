// ==========================================
// VANILLA JS 3D CAROUSEL (Unendlicher Loop & Optimierter Schwung)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.querySelector('.carousel');
  if (!carouselContainer) return;

  const items = Array.from(carouselContainer.querySelectorAll('.carousel-item'));
  const totalItems = items.length;

  // NUTZER-EINSTELLUNGEN (Deine Original-Werte)
  const padding = 40;
  const shift = 20;
  const dist = -80;

  // Mathematischer Index für flüssige Übergänge
  let targetIndex = 0;
  let currentIndex = 0;

  // Variablen für die Schwung-Berechnung
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let startTime = 0;
  let velocity = 0;

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  // Die Render-Funktion läuft permanent über requestAnimationFrame
  function updateCarousel() {
    // Sanfte Annäherung an das Ziel (Interpolation / Lerp)
    currentIndex += (targetIndex - currentIndex) * 0.12;

    // KORREKTUR FÜR UNENDLICHEN LOOP:
    // Sobald wir eine volle Runde gedreht haben, setzen wir targetIndex und currentIndex
    // unbemerkt zurück, damit die Zahlen nicht ins Unendliche steigen.
    if (!isDragging && Math.abs(targetIndex - currentIndex) < 0.001) {
      currentIndex = mod(currentIndex, totalItems);
      targetIndex = currentIndex;
    }

    items.forEach((item, index) => {
      // Abstand basierend auf dem flüssigen, normalisierten currentIndex berechnen
      let offset = index - mod(currentIndex, totalItems);

      // Perfekte Loop-Berechnung innerhalb der Array-Größe
      if (offset > totalItems / 2) offset -= totalItems;
      if (offset < -totalItems / 2) offset += totalItems;

      const absOffset = Math.abs(offset);

      let translateX = 0;
      let scale = 1;
      let translateZ = 0;
      let opacity = 1;

      if (offset !== 0) {
        scale = Math.pow(0.85, absOffset);
        // Wert auf 220 gelassen für deine perfekte Auffächerung
        translateX = offset * 220 + Math.sign(offset) * padding;
        translateZ = dist * absOffset;
        opacity = Math.pow(0.6, absOffset);
      }

      const zIndex = Math.round(100 - absOffset);

      // Sichtbarkeit regeln: Genau 2 links und 2 rechts erlauben
      const visibility = absOffset > 2.2 ? 'hidden' : 'visible';
      if (absOffset > 2.2) opacity = 0;

      // Zuweisung der Styles im 3D-Raum
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`;
      item.style.zIndex = zIndex;
      item.style.opacity = opacity;
      item.style.visibility = visibility;

      // Klick auf eine seitliche Karte bringt sie in den Fokus
      item.onclick = (e) => {
        if (isDragging) return;
        // Errechnet den kürzesten Weg im Kreis zum angeklickten Element
        let diff = index - mod(targetIndex, totalItems);
        if (diff > totalItems / 2) diff -= totalItems;
        if (diff < -totalItems / 2) diff += totalItems;

        targetIndex += diff;
      };
    });

    // Loop aktiv halten
    requestAnimationFrame(updateCarousel);
  }

  // --- DIE INTERAKTIVE SCHWUNG-STEUERUNG ---

  function handleStart(e) {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentX = startX;
    startTime = performance.now();
    velocity = 0;
  }

  function handleMove(e) {
    if (!isDragging) return;
    if (e.type.includes('touch')) e.preventDefault();

    const nowX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const nowTime = performance.now();

    const deltaX = nowX - currentX;
    const deltaTime = nowTime - startTime;

    if (deltaTime > 0) {
      velocity = deltaX / deltaTime;
    }

    // FEINGEFÜHL: Erhöht auf 400. Je höher dieser Wert, desto mehr Widerstand
    // spürt man beim Ziehen (die Karten rutschen nicht mehr so hektisch weg).
    targetIndex -= deltaX / 400;

    currentX = nowX;
    startTime = nowTime;
  }

  function handleEnd() {
    if (!isDragging) return;
    isDragging = false;

    // WENIGER SCHNELL / KONTROLLIERTER SCHWUNG:
    // Der Multiplikator wurde von 2.5 auf 1.2 gesenkt.
    // Jetzt rollt das Karussell bei schnellem Wischen maximal 1-2 Karten weiter, statt durchzudrehen.
    let inertia = 0;
    if (Math.abs(velocity) > 0.2) {
      inertia = velocity * 1.2;
    }

    // Ziel exakt einrasten lassen
    targetIndex = Math.round(targetIndex - inertia);
  }

  // Event-Listener an das Fenster und den Container binden
  carouselContainer.addEventListener('mousedown', handleStart);
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleEnd);

  carouselContainer.addEventListener('touchstart', handleStart, { passive: true });
  carouselContainer.addEventListener('touchmove', handleMove, { passive: false });
  carouselContainer.addEventListener('touchend', handleEnd);

  // Der Animations-Loop startet
  requestAnimationFrame(updateCarousel);
});
