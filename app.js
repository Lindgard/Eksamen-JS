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
};

placeDataArray();

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
newUserBtn.addEventListener("click", validateInput);

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

// creation of course-list with checkboxes for registration of chosen courses
// createCourseList = (checboxCourses) => {
//   const courseList = document.createElement("ul");
//   // forEach her eller i checkboxCourses?
//   courses.forEach((course) => {
//     const element = document.createElement("h4");
//     // createElement med kursa
//     element.innerHTML = `${checboxCourses}`;
//     courseList.appendChild(element);
//   });
// };

// createCourseList();

// // checkbox-creation for course-list
// checboxCourses = (courses) => {
//   courses.forEach(() => {
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.id = "course-checkbox";

//     const checkboxLabel = document.createElement("label");
//     checkboxLabel.innerHTML = `${courses.name}`;
//     checkboxLabel.htmlFor = "course-checkbox";
//     // lagre i localStorage kanskje?
//   });
// };

// checboxCourses();

// button for showing list of  courses and additional information from list
// used in printUsersToPage
const expandCoursesBtn = document.createElement("button");
expandCoursesBtn.classList.add("expand-btn");
expandCoursesBtn.innerHTML = "+";
//expandCoursesBtn.addEventListener("click", createCourseList);

// Print-funksjon for å lage liste synlig på siden med 9 brukere
// fra API pluss data fra input-felt med kurs i dropdown via knapp lagd over
printUsersToPage = (listId, apiUsers, inputData) => {
  const mergedArray = [...inputData, ...apiUsers];
  const userList = document.getElementById(listId);
  userList.innerHTML = "";
  const listItem = document.createElement("li");
  for (let i = 0; i < mergedArray.length; i++) {
    const user = mergedArray[i];
    listItem.setAttribute("id", `user-${i}`);
    listItem.classList.add("list-item");
    listItem.innerHTML = `
      ${user.name.first} ${user.name.last}
      ${user.city.city}, ${user.city.country}`;
  }
  userList.appendChild(listItem);
};

printUsersToPage("user-list", apiUsers, inputData);

/* // delete user from list
deleteUser = () => {
  this.remove();
};*/
