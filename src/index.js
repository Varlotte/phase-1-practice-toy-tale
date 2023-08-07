let addToy = false;
let formClass = document.querySelector(".add-toy-form");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderCard(data) {
  let cardBase = document.createElement("div");
  cardBase.className = "card";
  let toyName = document.createElement("h2");
  toyName.textContent = `${data.name}`;
  let likesPar = document.createElement("p");
  likesPar.textContent = `${data.likes} Likes`;
  let img = document.createElement("img");
  img.setAttribute("src", data.image);
  img.className = "toy-avatar";
  let button = document.createElement("button");
  button.className = "like-btn";
  button.setAttribute("id", data.id);
  button.textContent = "Like ❤️";
  cardBase.append(toyName, likesPar, img, button);
  document.getElementById("toy-collection").append(cardBase);
  button.addEventListener("click", async (e) => {
    //every time it's clicked add another to the text in the server
    //patch request
    e.preventDefault();
    console.log(data.likes);
    const newNumberOfLikes = parseInt(likesPar.textContent) + 1;
    const response = await fetch(`http://localhost:3000/toys/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: newNumberOfLikes,
      }),
    });
    const likeInfo = await response.json();
    likesPar.textContent = `${likeInfo.likes} likes!`;
    //update the DOM
    //update likesPar with `{data.likes} likes!`
  });
}

async function addCards() {
  //fetch request
  const response = await fetch("http://localhost:3000/toys");
  const toyInfo = await response.json();
  console.log(toyInfo);
  //call renderCard forEach object item
  toyInfo.forEach(renderCard);
}
addCards();

formClass.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = {
    name: formClass.name.value,
    image: formClass.image.value,
    likes: 0,
  };
  //console.log(formData);
  const response = await fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });
  const toyJson = await response.json();
  //console.log("json", toyJson);
  renderCard(toyJson);
  //add the card
});

/*renderCard({
  id: 4,
  name: "Slinky Dog",
  image: "https://www.freeiconspng.com/uploads/slinky-png-transparent-1.png",
  likes: 4,
});
*/

//no cards yet, so we want to put cards in div id "toy-collection" (append?)
//put card maker into a render function to do it repeatedly
//fetch request for list of toys

//Access the list of toys from an API (mocked using JSON Server)
//render each of them in a "card" on the page
//Hook up a form that enables users to add new toys.
//Create an event listener so that, when the form is submitted:
//the new toy is persisted to the database and a new card showing the toy is added to the DOM
//Create an event listener that:
// gives users the ability to click a button to "like" a toy.
// When the button is clicked, the number of likes should be updated in the database
//and the updated information should be rendered to the DOM
