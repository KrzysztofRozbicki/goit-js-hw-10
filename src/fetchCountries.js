import Notiflix from 'notiflix';
import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages';

export const fetchCountries = async name => {
  try {
    const response = await axios.get(API_URL + name + FILTER);
    if (response.data.length === 0) throw new Error();
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
};

// fetch(API_URL + name + FILTER)
//   .then(response => {
//     if (!response.ok) throw new Error(response.status);
//     return response.json();
//   })
//   .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
