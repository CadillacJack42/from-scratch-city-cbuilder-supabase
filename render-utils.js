const cityNameEls = document.getElementsByClassName('city-name');
const waterEl = document.getElementById('water');
const skylineEl = document.getElementById('skyline');
const castleEl = document.getElementById('castle');
const slogansEl = document.getElementById('slogans');

export const render = (city) => {
    for (const town of cityNameEls) {
        town.textContent = city.name;
    }

    waterEl.style.backgroundImage = `url('../assets/water-${city.water}.jpeg')`;
    skylineEl.style.backgroundImage = `url('../assets/skyline-${city.skyline}.jpeg')`;
    castleEl.style.backgroundImage = `url('../assets/castle-${city.castle}.jpeg')`;

    slogansEl.textContent = '';
    for (const slogan of city.slogans) {
        const sloganP = document.createElement('h3');
        sloganP.textContent = slogan;
        slogansEl.append(sloganP);
    }
};