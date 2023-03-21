import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const clearCountries = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

const addSpaces = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const showListOfCountries = data => {
  clearCountries();
  data.forEach(country => {
    const countryEl = document.createElement('li');
    countryEl.classList.add('country-item');
    countryEl.innerHTML = `<img class="flag-list" src="${country.flags.svg}"/> 
    <p class="name-list">${country.name.official}</p>`;
    countryListEl.appendChild(countryEl);
  });
};

const showSingleCountry = data => {
  clearCountries();
  const languages = Object.values(data.languages).join(', ');

  countryInfoEl.innerHTML = `<img class="flag-single" src="${data.flags.svg}"/> 
  <p class="country-single">${data.name.official}</p> 
  <p><span class="bold"> Capital: </span> ${data.capital[0]}</p> 
  <p><span class="bold"> Population: </span> ${addSpaces(data.population)}</p> 
  <p><span class="bold"> Languages: </span> ${languages}</p>`;
  console.log(data);
};

const showCountries = data => {
  if (data.length > 10)
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  if (data.length <= 10 && data.length > 1) showListOfCountries(data);
  if (data.length === 1) showSingleCountry(...data);
};

const readData = debounce(event => {
  event.target.value.trim() !== ''
    ? fetchCountries(event.target.value.trim()).then(showCountries)
    : clearCountries();
}, DEBOUNCE_DELAY);

inputEl.addEventListener('input', readData);
