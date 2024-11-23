const API = "https://restcountries.com/v3.1/region/ame";

export const fetchCountries = async () =>
  await fetch(API).then((response) => response.json());
