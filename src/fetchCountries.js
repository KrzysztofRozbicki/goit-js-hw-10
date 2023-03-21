import Notiflix from 'notiflix';

const API_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages';

export const fetchCountries = name =>
  fetch(API_URL + name + FILTER)
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
