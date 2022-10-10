const apiUsers = [];

async function getUsers() {
  const response = await fetch("https://randomuser.me/api/?results=50");
  const jsonData = await response.json();
  return jsonData.results;
}

// async funksjon for å legge informasjon fra fetch inn i array
placeDataArray = async (apiUsers) => {
  apiUsers = await getUsers();
  console.log(apiUsers);
};

placeDataArray();

// funksjon for å printe til DOM/browser med callback til en print-funksjon
// som henter informasjon fra enten input eller API, så parametere til dette

// CRUD!!!!!!!!!!!!!!!!
// array-methods, math.random(), addEventListener +/ Onclick, prompt + alert, loop
// createElement, classList.add og remove, søkefunksjonalitet, filtrering, kart for
// lokasjon fra array-data basert på coordinater i objektets informasjon
