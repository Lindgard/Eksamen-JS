let usersArray = [];

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

placeDataArray = async () => {
  const newUsers = await getUsers(10);
  usersArray = [...newUsers, ...usersArray];
  console.log(usersArray);
  printUsersToPage("user-list", usersArray);
};

placeDataArray();

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

// Print-funksjon for å lage liste synlig på siden med 9 brukere
// fra API pluss data fra input-felt med kurs i dropdown via knapp lagd over
showCourses = (listId, createInput, courses) => {
  const userDetails = document.getElementById(`${listId}-details`);
  console.log("clicked", userDetails);
  if (userDetails === null) {
    const listItem = document.getElementById(listId);
    const details = document.createElement("div");
    details.setAttribute("id", `${listId}-details`);
    details.setAttribute("class", "course-div");
    for (let i = 0; i < courses.length; i++) {
      details.appendChild(
        createInput({
          type: "checkbox",
          id: `checkbox-${listId}`,
        })
      );
      details.appendChild(
        createElement({
          type: "label",
          id: `label-${listId}`,
          value: `${courses[i].name}`,
        })
      );
      listItem.appendChild(details);
    }
  } else {
    userDetails.remove();
  }
};

printUsersToPage = (listId, usersArray) => {
  const userList = document.getElementById(listId);
  userList.innerHTML = "";
  for (let i = 0; i < usersArray.length; i++) {
    const user = usersArray[i];
    const listItem = document.createElement("li");
    listItem.setAttribute("id", `user-${i}`);
    listItem.setAttribute("class", "list-item");
    listItem.appendChild(
      createElement({
        type: "p",
        value: `Name: ${user.name.first} ${user.name.last}`,
      })
    );
    if (user.dob !== undefined) {
      listItem.appendChild(
        createElement({ type: "p", value: `Age: ${user.dob.age}` })
      );
    }
    if (user.email !== undefined) {
      listItem.appendChild(
        createElement({
          type: "p",
          value: `Phone: ${user.phone} Email: ${user.email}`,
        })
      );
    }
    if (user.city !== undefined) {
      listItem.appendChild(
        createElement({
          type: "p",
          value: `City: ${user.city.city}, ${user.city.country}`,
        })
      );
    }
    if (user.image !== undefined) {
      listItem.appendChild(
        createElement({
          type: "img",
          value: `${user.image.thumbnail}`,
        })
      );
    }
    listItem.appendChild(
      createInput({
        type: "button",
        value: "Edit",
        onClick: () => {
          updateUser(users[i]);
        },
      })
    );
    listItem.appendChild(
      createInput({
        type: "button",
        value: "Courses",
        onClick: () => {
          showCourses(`user-${i}`, createInput, courses);
        },
      })
    );
    // listItem.appendChild(
    //   createInput({
    //     type: "button",
    //     id: "delete-btn",
    //     value: "Delete User",
    //     onClick: () => {
    //       deleteUser(`user-${i}`);
    //     },
    //   })
    // );
    userList.appendChild(listItem);
  }
};

//button for expanding list
const moreUsers = document.createElement("button");
moreUsers.innerHTML = "Expand List";
moreUsers.addEventListener("click", printUsersToPage("user-list", usersArray));

//update-function
setUser = (user) => {
  console.log("klikket på bruker", user);
  user = nameInput.value;
  // kode som setter navnet på bruker som verdi på nameInput
  // kode som lar oss oppdatere verdien av nameInput
};

updateUser = () => {
  // kode som henter verdi fra input
  // kode som finner riktig bruker i listen
  // kode som oppdaterer riktig bruker med verdi fra input
  // kode som printer liste på nytt
  // kode som nuller ut inputfelt
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
nameInput.setAttribute("value", "");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");

validateInput = () => {
  if (
    nameInput.value.match(nameValid) &&
    emailInput.value.match(emailValid) &&
    phoneInput.value.match(phoneValid)
  ) {
    usersArray.push({
      name: {
        first: nameInput.value.split(" ")[0],
        last: nameInput.value.split(" ")[1],
      },
      email: emailInput.value,
      phone: phoneInput.value,
    });
    printUsersToPage("user-list", usersArray);
    console.log(usersArray);
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

// knapp hentet fra HTML for å kjøre validering og legge ny bruker til liste
const newUserBtn = document.getElementById("input-btn");
newUserBtn.addEventListener("click", validateInput);

// delete user from list
// deleteUser = (user) => {
//   item.remove();
//   user.splice(i, 1);
// };
