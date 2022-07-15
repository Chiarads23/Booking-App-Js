// ● Bisognerebbe aggiungere un piccolo form dove poter inserire una nuova prenotazione. I campi di questo form saranno gli stessi che vengono restituiti da ogni singolo oggetto contenuto nell’array restituito dalla chiamata a “todos”

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

const newEl = (el) => document.createElement(el);
const q = (el) => document.querySelector(el);

const pendingBookings = q(".pending-list");
const completedBookings = q(".completed-list");

const btnEl = q(".bookingBtn");
const userIdInputEl = q(".userId");
const idInputEl = q(".id");
const titleInputEl = q(".form-title");

const inputsData = {};
const inputEls = document.querySelectorAll("input");

const createList = (parent, userId, id, title) => {
  const listItemEl = newEl("li");
  const userIdEl = newEl("p");
  const idEl = newEl("p");
  const titleEl = newEl("p");
  // const horLine = newEl("hr");

  listItemEl.className = "listItemEl";

  userIdEl.textContent = userId;
  titleEl.textContent = title;
  idEl.textContent = id;

  listItemEl.append(userIdEl, idEl, titleEl);
  parent.appendChild(listItemEl);
};

fetch(BASE_URL)
  .then((res) => res.json())
  .then((data) => {
    data
      .filter((data) => data.completed === false)
      .reverse()
      .map((data) =>
        createList(pendingBookings, data.userId, data.id, data.title)
      );

    data
      .filter((data) => data.completed === true)
      .map((data) =>
        createList(completedBookings, data.userId, data.id, data.title)
      );
  });

const GET = async (BASE_URL) => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

const POST = async (BASE_URL, body) => {
  return await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

userIdInputEl.addEventListener("input", (e) => {
  inputsData.userId = e.target.value;
});
idInputEl.addEventListener("input", (e) => {
  inputsData.id = e.target.value;
});
titleInputEl.addEventListener("input", (e) => {
  inputsData.title = e.target.value;
});

btnEl.addEventListener("click", (e) => {
  POST(BASE_URL, inputsData)
  e.preventDefault()
  console.log(inputsData)
   .then(() => listItemEl.forEach(data => data.remove())) 
    .then(() =>
      GET(BASE_URL).then(pendingBookings => {
        pendingBookings.reverse().map(({userId, id, title}) =>
            createList(pendingBookings, userId, id, title)
          );
      })  
    );
});

// btnEl.addEventListener('click', (e) =>{
//   e.preventDefault();
//   console.log(inputsData)
//  POST(BASE_URL,inputsData)
//  .then(()=>location.reload());
// })

// btnEl.addEventListener('click', () =>)
// inputEls.forEach(input => input.addEventListener('input',(e)=>{
//   inputsData[input.id] = e.target.value;
// }));
