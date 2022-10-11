// SE README FOR NOTATER OM HVA SOM TRENGS

const apiUsers = [];

getUsers = async () => {
  const response = await fetch("https://randomuser.me/api/?results=50");
  const jsonData = await response.json();
  return jsonData.results;
};

// async funksjon for å legge informasjon fra fetch inn i array
placeDataArray = async (apiUsers) => {
  apiUsers = await getUsers();
  console.log(apiUsers);
};

placeDataArray();

// Regex for validation of input
const nameValid = /^[A-Za-z ]+$/;
const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneValid = /^\+(?:[0-9]\x20?){6,14}[0-9]$/;

const inputData = [];
getInput = (inputData) => {
  const nameInput = document.getElementById("user-input");
  const emailInput = document.getElementById("email-input");
  const phoneInput = document.getElementById("phone-input");
};
