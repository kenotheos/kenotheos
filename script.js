function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById('datetime').textContent = formattedDate;
}
function initialize() {
    updateDateTime(); 
    setInterval(updateDateTime, 1000); 
    fetchWeather();
    setRandomBackground(); 
    setRandomIcon(); 
}
window.onload = initialize;
async function fetchWeather() {
    try {
        const locationResponse = await fetch('https://ipapi.co/json/');
        const locationData = await locationResponse.json();
        if (!locationData.city || !locationData.country) {
            throw new Error('Unable to determine location');
        }
        const city = locationData.city;
        const country = locationData.country;
        const weatherResponse = await fetch(`https://wttr.in/${city}?format=%C+%t`, {
            headers: { 'Accept': 'application/json' },
        });
        const weatherText = await weatherResponse.text();
        document.getElementById('weather').textContent = `${city}, ${country} - ${weatherText}`;
    } catch (error) {
        console.error('Weather fetch error:', error);
        document.getElementById('weather').textContent = "Weather info unavailable";
    }
}
function setRandomBackground() {
    const backgrounds = [];
    for (let i = 1; i <= 39; i++) {
        backgrounds.push(`backgrounds/bg${i}.gif`);
    }
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.background = `url('${randomBackground}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
}
const icons = [];
for (let i = 1; i <= 38; i++) {
    icons.push(`icons/icon${i}.gif`);
}
const randomIcon = icons[Math.floor(Math.random() * icons.length)];
const profileIcon = document.getElementById('profile-icon');
if (profileIcon) {
    profileIcon.src = randomIcon;
}
function initialize() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    fetchWeather(); 
    setRandomBackground(); 
    setRandomIcon(); 
    fetchWeather();
    updateDateTime();
    setInterval(updateDateTime, 1000);
}
window.onload = initialize;