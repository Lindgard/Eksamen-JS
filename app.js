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
getInput = () => {
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const phoneInput = document.getElementById("phone-input");

  if (
    nameInput.value.match(nameValid) &&
    emailInput.value.match(emailValid) &&
    phoneInput.value.match(phoneValid)
  ) {
    inputData.push({
      Name: nameInput.value,
      Email: emailInput.value,
      Phone: phoneInput.value,
    });
    console.log(inputData);
  } else if (
    nameInput.value.match(nameValid) &&
    emailInput.value.match(emailValid)
  ) {
    alert("Please add a valid phone-number.");
  } else if (
    nameInput.value.match(nameValid) &&
    phoneInput.value.match(phoneValid)
  ) {
    alert("Please add a valid email.");
  } else if (
    emailInput.value.match(emailValid) &&
    phoneInput.value.match(phoneValid)
  ) {
    alert("Name cannot contain numbers or special characters.");
  }
};

const newUserBtn = document.getElementById("input-btn");

newUserBtn.addEventListener("click", getInput);
