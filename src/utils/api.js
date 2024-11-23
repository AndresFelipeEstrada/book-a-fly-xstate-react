const API = "https://restcountries.com/v3.1/region/ame";

export const fetchCountries = () =>
  fetch(API).then((response) => response.json());
