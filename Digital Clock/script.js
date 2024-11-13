let timeFormat = '24';
let isDdmmVisible = false;

function updateClock() {
    const now = new Date();
    const hours = timeFormat === '24' 
        ? String(now.getHours()).padStart(2, '0') 
        : String(now.getHours() % 12 || 12).padStart(2, '0');

    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const ampm = timeFormat === '12' ? (now.getHours() >= 12 ? ' PM' : ' AM') : '';
    
    const clock = document.getElementById('clock');
    clock.textContent = `${hours}:${minutes}:${seconds}${ampm}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = now.toLocaleDateString(undefined, options);
    const dateElement = document.getElementById('date');
    dateElement.textContent = date;

    const ddmmYY = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;
    
    const dateFormatElement = document.getElementById('date-format');
    dateFormatElement.textContent = ddmmYY;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'd') {
        isDdmmVisible = !isDdmmVisible;
        const dateElement = document.getElementById('date');
        const dateFormatElement = document.getElementById('date-format');

        if (isDdmmVisible) {
            dateElement.style.display = 'none';
            dateFormatElement.style.display = 'block';
        } else {
            dateElement.style.display = 'block';
            dateFormatElement.style.display = 'none';
        }
    }

    if (event.key === 's') {
        const scheduleElement = document.getElementById('schedule');
        scheduleElement.classList.toggle('hidden');

        // SCHEDULE
        if (!scheduleElement.classList.contains('hidden')) {
            scheduleElement.innerHTML = `
                <div>Morning: 6:00</div>
                <div>Coffee: 7:00</div>
                <div>Work: 7:30 - 18:00</div>
                <div>Sleep: 23:00</div>
            `;
        }
    }
});

setInterval(updateClock, 1000);
updateClock();

function toggleSettings() {
    const themeSelector = document.getElementById('theme-selector');
    themeSelector.classList.toggle('hidden');
}

function setTheme(theme) {
    document.body.classList.remove('dgray-theme', 'dark-theme', 'gray-theme', 'lgray-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    document.getElementById('theme-selector').classList.add('hidden');
}

function setTimeFormat(format) {
    timeFormat = format;
    updateClock();
}

// Set default theme (e.g., light, gray)
document.body.classList.add('dgray-theme');

document.addEventListener('click', function(event) {
    const settingsMenu = document.getElementById('theme-selector');
    const cogIcon = document.getElementById('cog');

    if (!settingsMenu.contains(event.target) && !cogIcon.contains(event.target)) {
        settingsMenu.classList.add('hidden');
    }
});

updateClock();