import { checkAuth, logout, getCity, createDefaultCity } from '../fetch-utils.js';
import { render } from '../render-utils.js';

// const cityNameEls = document.getElementsByClassName('city-name');
// const waterEl = document.getElementById('water');
// const skylineEl = document.getElementById('skyline');
// const castleEl = document.getElementById('castle');
// const slogansEl = document.getElementById('slogans');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    let city = await getCity();
    if (!city) {
        await createDefaultCity();
        city = await getCity();
    }
    console.log(city);

    render(city);
});
