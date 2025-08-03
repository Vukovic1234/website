function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    // Show selected section
    document.getElementById(sectionId).style.display = 'block';
    // Show back button only if not on main
    document.getElementById('backBtn').style.display = sectionId === 'mainSection' ? 'none' : 'inline-block';
    // Show calendar only on mainSection (or change as needed)
    if (document.getElementById('calendarContainer')) {
        document.getElementById('calendarContainer').style.display = sectionId === 'mainSection' ? 'block' : 'none';
    }
}

// Simple calendar for current month, with some days "taken"
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    if (!calendar) return;
    calendar.innerHTML = '';
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const takenDays = [3, 7, 12, 15, 21, 25]; // Example taken days

    // Header
    const days = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'];
    days.forEach(d => {
        const el = document.createElement('div');
        el.textContent = d;
        el.className = 'calendar-day header';
        calendar.appendChild(el);
    });

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const el = document.createElement('div');
        el.className = 'calendar-day';
        el.style.visibility = 'hidden';
        calendar.appendChild(el);
    }

    // Days
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= lastDay; d++) {
        const el = document.createElement('div');
        el.textContent = d;
        el.className = 'calendar-day' + (takenDays.includes(d) ? ' taken' : '');
        if (!takenDays.includes(d)) {
            el.addEventListener('click', function() {
                el.classList.toggle('taken');
            });
        }
        calendar.appendChild(el);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderCalendar();
    // Hide calendar if not on mainSection
    if (document.getElementById('mainSection') && document.getElementById('calendarContainer')) {
        if (document.getElementById('mainSection').style.display !== 'block') {
            document.getElementById('calendarContainer').style.display = 'none';
        }
    }

    // Lightbox logic
    const gallery = document.querySelector('.gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (gallery && lightbox && lightboxImg && lightboxClose) {
        gallery.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                lightboxImg.src = e.target.src;
                lightbox.style.display = 'flex';
            }
        });
        lightboxClose.addEventListener('click', function() {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        });
        // Optional: close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                lightboxImg.src = '';
            }
        });
        // Optional: close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                lightboxImg.src = '';
            }
        });
    }
});