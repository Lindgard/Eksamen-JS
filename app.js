// SE README FOR NOTATER OM HVA SOM TRENGS

const apiUsers = [];

getUsers = async (amount) => {
  const response = await fetch(`https://randomuser.me/api/?results=${amount}`);
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

placeDataArray = async (apiUsers) => {
  apiUsers = await getUsers(10);
  console.log(apiUsers);
};

placeDataArray();

const nameValid = /^[A-Za-z ]+$/;
const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneValid = /^\+(?:[0-9]\x20?){6,14}[0-9]$/;

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");

const inputData = [];

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
    //localStorage.setItem(nameInput, emailInput, phoneInput);
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
newUserBtn.addEventListener("click", validateInput);

// Print-funksjon for å lage liste synlig på siden med 9 brukere
// fra API pluss data fra input-felt med påmeldings-dropdown
const userList = document.getElementById("user-list");

printUsersToPage = (apiUsers, inputData) => {
  /*setTimeout til 0,1 sekund etter load av side */
  const mergedArray = [...inputData, ...apiUsers];
  userList.innerHTML = "";
  for (let i = 0; i < mergedArray.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = ` 
      <h3>${mergedArray[i].name}</h3>
      <p>Email:${mergedArray[i].email}</p>
      <p>Telephone:${mergedArray[i].phone}</p>
      <p>Courses: </p>
      `;
    /*add courseList for use in courses-tab in list */
    userList.appendChild(listItem);
  }
};

printUsersToPage(apiUsers, inputData);

//const courseList =
