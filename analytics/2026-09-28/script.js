// ── Country data ─────────────────────────────────────────────────────────────
const countries = [
    ["United States", 180100], ["Netherlands", 70440], ["Congo (Kinshasa)", 69880],
    ["France", 32980], ["India", 31880], ["Canada", 27590], ["Germany", 23990],
    ["Belgium", 23970], ["Hong Kong", 13500], ["Singapore", 8590],
    ["Switzerland", 8290], ["Korea, South", 8090], ["China", 7000],
    ["Taiwan", 6390], ["Mexico", 4000], ["Australia", 3780], ["Japan", 3120],
    ["Italy", 2830], ["Indonesia", 2440], ["Brazil", 2300], ["Poland", 2200],
    ["Nigeria", 2050], ["Russian Federation", 1850], ["United Kingdom", 1720],
    ["Spain", 1650], ["Sweden", 1520], ["Lithuania", 1450], ["Ethiopia", 1210],
    ["Andorra", 1050], ["Thailand", 956], ["Chile", 921], ["South Africa", 776],
    ["Romania", 711], ["Iraq", 559], ["Pakistan", 531], ["Latvia", 515],
    ["Philippines", 467], ["Ghana", 466], ["Bangladesh", 463], ["Iran", 447],
    ["Vietnam", 437], ["Finland", 367], ["Algeria", 318], ["Slovenia", 315],
    ["Turkey", 288], ["Ukraine", 237], ["Azerbaijan", 236], ["Saudi Arabia", 210],
    ["Honduras", 183], ["Norway", 182], ["Luxembourg", 160], ["Benin", 144],
    ["Botswana", 142], ["UAE", 119], ["Ireland", 116], ["Syria", 107],
    ["Myanmar", 84], ["Portugal", 83], ["Morocco", 78], ["Malaysia", 71],
    ["Venezuela", 69], ["Egypt", 69], ["Belarus", 65], ["Cuba", 61],
    ["Greece", 60], ["Argentina", 60], ["Hungary", 55], ["Colombia", 52],
    ["Kosovo", 47], ["Rwanda", 47], ["Bulgaria", 44], ["Tor", 37],
    ["Tanzania", 35], ["Austria", 33], ["Israel", 31], ["New Zealand", 29],
    ["Dominican Republic", 28], ["Uzbekistan", 22], ["Ecuador", 22],
    ["Denmark", 19], ["Uruguay", 19], ["Kazakhstan", 18], ["Kenya", 17],
    ["Jordan", 16], ["Bolivia", 14], ["Peru", 14], ["Moldova", 13],
    ["Bahrain", 12], ["Tunisia", 11], ["Senegal", 11], ["Jamaica", 9],
    ["Czech Republic", 9], ["Panama", 8], ["Costa Rica", 7], ["Namibia", 6],
    ["Puerto Rico", 6], ["Armenia", 6], ["Iceland", 5], ["Sri Lanka", 5],
    ["Congo (Brazzaville)", 5], ["Togo", 5], ["Angola", 4], ["Kuwait", 4],
    ["Libya", 4], ["Paraguay", 4], ["Estonia", 4], ["Zimbabwe", 4],
    ["Serbia", 1], ["Zambia", 1]
];

// ── Render country bars ───────────────────────────────────────────────────────
(function renderCountries() {
    const max = countries[0][1];
    const topEl = document.getElementById('countries-top');
    const restEl = document.getElementById('countries-rest');

    function makeRow(c) {
        const pct = ((c[1] / max) * 100).toFixed(1);
        const display = c[1] >= 1000 ? (c[1] / 1000).toFixed(2) + 'k' : c[1];
        return `<div class="bar-row">
            <span class="bar-country">${c[0]}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
            <span class="bar-count">${display}</span>
        </div>`;
    }

    countries.slice(0, 20).forEach(c => topEl.insertAdjacentHTML('beforeend', makeRow(c)));
    countries.slice(20).forEach(c => restEl.insertAdjacentHTML('beforeend', makeRow(c)));
})();

// ── Toggle "show all countries" ───────────────────────────────────────────────
function toggleCountries() {
    const restEl = document.getElementById('countries-rest');
    const open = restEl.classList.toggle('open');
    document.getElementById('toggle-icon').textContent = open ? 'expand_less' : 'expand_more';
    document.getElementById('toggle-label').textContent = open ? 'Show less' : 'Show all countries';
}
