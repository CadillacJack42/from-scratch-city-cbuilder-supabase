import { checkAuth, logout, getCity, createDefaultCity, updateImage, updateSlogans, updateName } from '../fetch-utils.js';
import { render } from '../render-utils.js';

const waterDropdown = document.getElementById('water-dropdown');
const skylineDropdown = document.getElementById('skyline-dropdown');
const castleDropdown = document.getElementById('castle-dropdown');

const sloganInput = document.getElementById('slogan-input');
const inputBtn = document.getElementById('new-slogan');

const nameInput = document.getElementById('name-input');
const nameBtn = document.getElementById('new-name');

checkAuth();

const logoutButton = document.getElementById('logout');
let city;

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    city = await getCity();
    if (!city) {
        await createDefaultCity();
        city = await getCity();
    }
    render(city);
});

waterDropdown.addEventListener('change', (e) => {
    updateImage('water', e.target.value);
});
skylineDropdown.addEventListener('change', (e) => {
    updateImage('skyline', e.target.value);
});
castleDropdown.addEventListener('change', (e) => {
    updateImage('castle', e.target.value);
});

inputBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const newForm = new FormData(inputBtn);
    const newSlogan = newForm.get('slogan');
    const sloganArr = city.slogans;
    const newArray = [...sloganArr, newSlogan];

    updateSlogans(newArray);
    sloganInput.value = '';
});
nameBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const newForm = new FormData(nameBtn);
    const newName = newForm.get('name');

    updateName(newName);
    nameInput.value = '';
});
