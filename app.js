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

const nameValid = /^[A-Za-z|æøåÆØÅ ]+$/; //la til at navn skal kunne inneholde norske bokstaver
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
    name: "TypeScript explained",
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
createCourseList = (checboxCourses) => {
  const courseList = document.createElement("ul");
  // forEach her eller i checkboxCourses?
  courses.forEach((course) => {
    course.innerHTML = `<h4>${checboxCourses}</h4>`;
    courseList.appendChild(course);
  });
};

createCourseList(checboxCourses);

// checkbox-creation for course-list
checboxCourses = (courses) => {
  courses.forEach(() => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "course-checkbox";

    const checkboxLabel = document.createElement("label");
    checkboxLabel.innerHTML = `${courses.name}`;
    checkboxLabel.htmlFor = "course-checkbox";
    // lagre i localStorage kanskje?
  });
};

// button for showing list of  courses and additional information from list
// used in printUsersToPage
const expandCoursesBtn = document.createElement("button");
expandCoursesBtn.classList.add("expand-btn");
expandCoursesBtn.innerHTML = "+";
expandCoursesBtn.addEventListener("click", createCourseList);

// Print-funksjon for å lage liste synlig på siden med 9 brukere
// fra API pluss data fra input-felt med kurs i dropdown via knapp lagd over
printUsersToPage = (apiUsers, inputData) => {
  const mergedArray = [...inputData, ...apiUsers];
  const userList = document.getElementById("user-list");
  userList.classList.add("list-div");
  userList.innerHTML = "";
  for (let i = 0; i < mergedArray.length; i++) {
    const listItem = document.createElement("li");
    /* classlist.add for later removal with delete-function */
    listItem.classList.add("list-item");
    listItem.innerHTML = ` 
    <h3>${mergedArray[i].name}</h3>
    <p>Email:${mergedArray[i].email}</p>
    <p>Telephone:${mergedArray[i].phone}</p>
    <p>Courses: </p>
    `;
    listItem.appendChild(expandCoursesBtn);
  }
  userList.appendChild(listItem);
};

printUsersToPage(apiUsers, inputData);

// delete user from list
deleteUser = () => {
  this.remove();
};
