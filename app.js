const apiUsers = [];

getUsers = async (amount) => {
  const response = await fetch(`https://randomuser.me/api/?results=${amount}`);
  const jsonData = await response.json();
  return jsonData.results.map((user) => {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.location,
      dob: user.dob,
      nationality: user.nat,
      image: user.picture,
    };
  });
};

placeDataArray = async (apiUsers) => {
  apiUsers = await getUsers(10);
  console.log(apiUsers);
  printUsersToPage("user-list", apiUsers, inputData);
};

placeDataArray();

// Print-funksjon for å lage liste synlig på siden med 9 brukere
// fra API pluss data fra input-felt med kurs i dropdown via knapp lagd over
expandedUser = (listId, createInput, courses) => {
  const userDetails = document.getElementById(`${listId}-details`);
  console.log("clicked", userDetails);
  if (userDetails === null) {
    const listItem = document.getElementById(listId);
    const details = document.createElement("div");
    details.setAttribute("id", `${listId}-details`);
    details.innerHTML = "testing";
    details.appendChild(
      createInput({
        type: "checkbox",
        id: `checkbox-${listId}`,
      })
    );
    listItem.appendChild(details);
  } else {
    userDetails.remove();
  }
};

printUsersToPage = (listId, apiUsers, inputData) => {
  const mergedArray = [...inputData, ...apiUsers];
  const userList = document.getElementById(listId);
  userList.innerHTML = "";
  for (let i = 0; i < mergedArray.length; i++) {
    const user = mergedArray[i];
    const listItem = document.createElement("li");
    listItem.setAttribute("id", `user-${i}`);
    listItem.setAttribute("class", "list-item");
    listItem.appendChild(
      createElement({
        type: "p",
        value: `${user.name.first} ${user.name.last}`,
      })
    );
    listItem.appendChild(
      createElement({
        type: "p",
        value: `${user.phone}`,
      })
    );
    listItem.appendChild(
      createElement({
        type: "p",
        value: `${user.city.city}, ${user.city.country}`,
      })
    );
    listItem.appendChild(
      createElement({
        type: "img",
        value: `${user.image.thumbnail}`,
      })
    );
    listItem.addEventListener("click", () => {
      expandedUser(`user-${i}`, createInput, courses);
    });
    userList.appendChild(listItem);
  }
};

// creation of inputs and elements for list in DOM
const createInput = ({ type, onClick, value, onChange }) => {
  let updatedValue = value;
  const newInput = document.createElement("input");
  newInput.setAttribute("type", type);
  newInput.addEventListener("click", (e) => {
    if (onClick !== undefined) {
      onClick(e);
    }
  });
  newInput.setAttribute("value", updatedValue);
  newInput.addEventListener("change", (e) => {
    updatedValue = e.target.value;
  });
  newInput.addEventListener("blur", () => {
    onChange(updatedValue);
  });
  return newInput;
};

const createElement = ({ type, id, value }) => {
  const newElement = document.createElement(type);
  newElement.innerHTML = value;
  if (id !== undefined) {
    newElement.setAttribute("id", id);
  }
  return newElement;
};

// Regex for validering av input-data
const nameValid = /^[A-Za-z|æøåÆØÅ ]+$/; //la til at navn skal kunne inneholde norske bokstaver
const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneValid = /^\+(?:[0-9]\x20?){6,14}[0-9]$/;

// Input-felt hentet fra HTML
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

// knapp hentet fra HTML for å kjøre validering
const newUserBtn = document.getElementById("input-btn");
newUserBtn.addEventListener("click", () => {
  validateInput();
});

// array for course-examples
const courses = [
  {
    id: 1,
    name: "HTML and its role in web development",
  },
  {
    id: 2,
    name: "JavaScript for beginners",
  },
  {
    id: 3,
    name: "TypeScript",
  },
  {
    id: 4,
    name: "NodeJS introduction",
  },
  {
    id: 5,
    name: "C# explained",
  },
];

//expandCoursesBtn.addEventListener("click", createCourseList);

/* // delete user from list
deleteUser = () => {
  this.remove();
};*/
