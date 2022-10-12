// SE README FOR NOTATER OM HVA SOM TRENGS

const apiUsers = [];

getUsers = async () => {
  const response = await fetch("https://randomuser.me/api/?results=50");
  const jsonData = await response.json();
  return jsonData.results.map((user) => {
    return {
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      City: user.location,
      Gender: user.gender,
      Dob: user.dob,
      Nationality: user.nat,
      Image: user.picture,
    };
  });
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

// Input-fields from HTML
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");

const inputData = [];

// validation-test
validateInput = () => {
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

// Button from HTML for validating and printing to list

const newUserBtn = document.getElementById("input-btn");
newUserBtn.addEventListener("click", validateInput);

// Print-funksjon for å lage liste synlig på siden med 9 brukere
// fra API pluss data fra input-felt med påmeldings-dropdown
const userList = document.getElementById("user-list");

printUsersToPage = (apiUsers, inputData) => {
  // const mergedArray = [...apiUsers, ...inputData];
  // console.log(mergedArray);

  for (let i = 0; i < mergedArray.length; i++) {
    // print i loop for hver index til index 9 pluss
    // siste index i mergedArray for input data
    // som list item i userList hentet fra HTML
  }
};
