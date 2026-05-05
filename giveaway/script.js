/**
 * SoftBridge Labs - Giveaway Page Logic
 * Handles countdown timer with precision flip animations
 */
document.addEventListener('DOMContentLoaded', () => {
    // Target Date: May 30, 2026
    const targetDate = new Date('May 30, 2026 23:59:59').getTime();

    // UI Elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');
    const msEl = document.getElementById('ms');

    const animateFlip = (element, newValue) => {
        if (!element || element.innerText === newValue) return;

        const parent = element.parentElement;
        if (!parent.classList.contains('flip-card')) {
            element.innerText = newValue;
            return;
        }

        const newSpan = document.createElement('span');
        newSpan.className = 'countdown-value';
        newSpan.id = element.id;
        newSpan.innerText = newValue;

        parent.innerHTML = '';
        parent.appendChild(newSpan);
    };

    const updateCounter = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            [daysEl, hoursEl, minsEl, secsEl].forEach(el => { if (el) el.innerText = '00'; });
            if (msEl) msEl.innerText = '000';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((distance % 1000));

        // Update top row
        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minsEl) minsEl.innerText = minutes.toString().padStart(2, '0');

        // Update precision row with flip for seconds
        if (secsEl) animateFlip(secsEl, seconds.toString().padStart(2, '0'));
        if (msEl) msEl.innerText = milliseconds.toString().padStart(3, '0');

        requestAnimationFrame(updateCounter);
    };

    // Start precision tracking
    requestAnimationFrame(updateCounter);

    // Breadcrumb integration
    if (window.SBL && window.SBL.breadcrumb) {
        window.SBL.breadcrumb([
            { name: 'Home', url: '/' },
            { name: 'Giveaway', url: '/giveaway/' }
        ]);
    }
});
