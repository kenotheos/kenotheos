const lastFm = { user: "kenotheos", apiKey: "0fa063a32298f57a60a847f559041efc" };
window.onload = function() {
    initializePage();
};
function initializePage() {
    updateDateTime();
    fetchLastFmStats();
    startWorldCounters();
    if (document.querySelector('.copy-button')) {
        initializeCopyButtons();
    }
    setInterval(updateDateTime, 1000);
}
function startWorldCounters() {
    const birthCounterEl = document.getElementById('birth-counter');
    const deathCounterEl = document.getElementById('death-counter');
    if (!birthCounterEl || !deathCounterEl) return;

    const BIRTHS_PER_SECOND = 4.3;
    const DEATHS_PER_SECOND = 2.0;

    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);
    const startTimestamp = startOfToday.getTime();

    function updateCounters() {
        const now = new Date().getTime();
        const secondsElapsed = (now - startTimestamp) / 1000;
        const liveBirths = Math.floor(secondsElapsed * BIRTHS_PER_SECOND);
        const liveDeaths = Math.floor(secondsElapsed * DEATHS_PER_SECOND);
        birthCounterEl.innerHTML = `world births today: <span class="stat-value">${liveBirths.toLocaleString()}</span>`;
        deathCounterEl.innerHTML = `world deaths today: <span class="stat-value">${liveDeaths.toLocaleString()}</span>`;
    }
    updateCounters();
    setInterval(updateCounters, 1000);
}
async function fetchLastFmStats() {
    const scrobblesEl = document.getElementById('total-scrobbles');
    const artistsEl = document.getElementById('total-artists');
    if (!scrobblesEl || !artistsEl) return;
    
    try {
        const infoUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${lastFm.user}&api_key=${lastFm.apiKey}&format=json`;
        const infoData = await (await fetch(infoUrl)).json();
        const totalScrobbles = parseInt(infoData.user.playcount).toLocaleString();
        scrobblesEl.innerHTML = `<span class="stat-value">${totalScrobbles}</span> tracks`;

        const artistsUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${lastFm.user}&api_key=${lastFm.apiKey}&format=json&limit=1`;
        const artistsData = await (await fetch(artistsUrl)).json();
        const totalArtists = parseInt(artistsData.topartists['@attr'].total).toLocaleString();
        artistsEl.innerHTML = `<span class="stat-value">${totalArtists}</span> artists`;
    } catch (e) {
        if(scrobblesEl) scrobblesEl.textContent = "stats n/a";
        if(artistsEl) artistsEl.innerHTML = "";
    }
}
function copyToClipboard(elementId, buttonElement) {
    if (buttonElement.classList.contains('copied')) return;
    const textToCopy = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'copied!';
        buttonElement.classList.add('copied');
        setTimeout(() => {
            buttonElement.textContent = originalText;
            buttonElement.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('failed to copy text:', err);
    });
}
function updateDateTime() { 
    const el = document.getElementById('datetime'); 
    if(el) {
        const dateString = new Date().toLocaleString('en-us', { timeZone: 'africa/tunis' });
        el.textContent = dateString.toLowerCase();
    }
}