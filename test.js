//hent brukere-funksjon
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

//print liste av brukere
printBrukerDetaljer = (divId) => {
  const detaljerFinnes = document.getElementById(`${divId}-detaljer`);
  console.log("clicked", detaljerFinnes);
  if (detaljerFinnes === null) {
    const listItem = document.getElementById(divId);
    const detaljer = document.createElement("div");
    detaljer.setAttribute("id", `${divId}-detaljer`);
    detaljer.innerHTML = "du er flink";
    listItem.appendChild(detaljer);
  } else {
    detaljerFinnes.remove();
  }
};

printBrukere = (divId, brukere) => {
  const list = document.getElementById(divId);
  list.innerHTML = "";
  for (let i = 0; i < brukere.length; i++) {
    const bruker = brukere[i];
    const listItem = document.createElement("li");
    console.log(brukere[i].name);
    listItem.setAttribute("id", `bruker-${i}`);
    listItem.innerHTML = bruker.name.first + " " + bruker.name.last;
    listItem.addEventListener("click", () => {
      printBrukerDetaljer(`bruker-${i}`);
    });
    list.appendChild(listItem);
  }
};

start = async () => {
  const brukere = await getUsers(10);
  printBrukere("user-list", brukere);
};

start();
//print bruker detaljer

/*
const createElement = ({ type, id, value}) => {
      const newElement = document.createElement(type);
      newElement.innerHTML = value;
      if (id !== undefined) {
        newElement.setAttribute('id', id);
      }
      return newElement;
    }

    const createInput = ({ type, onClick, value, onChange }) => {
      let updatedValue = value;
      const newInput = document.createElement('input');
      newInput.setAttribute('type', type);
      newInput.addEventListener('click', (e) => {
        if (onClick !== undefined) {
          onClick(e);
      }});
      newInput.setAttribute('value', updatedValue);
      newInput.addEventListener('change', (e) => {
        updatedValue = e.target.value;
      })
      newInput.addEventListener('blur', () => {
        onChange(updatedValue);
      })
      return newInput;
    }
 
    const liElement = document.getElementById('li1');
    liElement.appendChild(createElement({ type: 'p', value: 'Navn'}));
    liElement.appendChild(createElement({ type: 'p', value: 'By'}));
    liElement.appendChild(createElement({ type: 'p', value: 'Epost'}));

    liElement.appendChild(createInput({
      type: 'text',
      onChange: (value) => {
        console.log('value', value);
      },
      value: 'Robin og Batman'
    })); 

    // eksempel 2

    const createElement = ({ type, id, value = ''}) => {
      const newElement = document.createElement(type);
      newElement.innerHTML = value;
      if (id !== undefined) {
        newElement.setAttribute('id', id);
      }
      return newElement;
    }

    for (let i = 0; i < 10; i++) {
      const liElement = createElement({ type: 'li'});
      liElement.appendChild(createElement({ type: 'p', value: brukere[i].navn}));
      liElement.appendChild(createElement({ type: 'p', value: brukere[i].by}));
      liElement.appendChild(createElement({ type: 'p', value: brukere[i].city}));
      document.getElementById('list').appendChild(liElement);
    }
*/
