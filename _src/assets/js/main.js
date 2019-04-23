"use strict";

const buttonEl = document.querySelector(".search-btn");
const listEl = document.querySelector(".show-list");
const favouriteListEl = document.querySelector(".favourite-list");
let myFavouriteShows = [];

function getShow() {
  listEl.innerHTML = "";
  let inputEl = document.querySelector(".search-input");
  fetch(`http://api.tvmaze.com/search/shows?q=${inputEl.value}`)
    .then(showResponse => showResponse.json())
    .then(showData => {
      for (const item of showData) {
        const showTitle = item.show.name;
        if (item.show.image) {
          const showPhoto = item.show.image.medium;
          listEl.innerHTML += `<li class='element'><h2 class="titleName">${showTitle}</h2><img src="${showPhoto}"/></li>`;
        } else {
          listEl.innerHTML += `<li class='element'><h2 class="titleName">${showTitle}</h2><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/></li>`;
        }
        const elementEl = document.querySelectorAll(".element");
        for (let j = 0; j < elementEl.length; j++) {
          elementEl[j].addEventListener("click", addToMyFavourites);
        }
      }
    });
}

buttonEl.addEventListener("click", getShow);

function addToMyFavourites(event) {
  event.currentTarget.classList.add("favouriteShows");
  // recoger los valores de title e image para guardarlos en el objeto
  const title = event.currentTarget.children[0].innerHTML;
  const preview = event.currentTarget.children[1].currentSrc;
  // guardar esos valores en el objeto
  const myShows = { name: title, photo: preview };
  // guardar los objetos en el array
  let allMyFavouriteShows = myFavouriteShows.push(myShows);
  console.log(myShows);
  printFavourites();
}

function printFavourites() {
  favouriteListEl.innerHTML='';
  for (const show of myFavouriteShows) {
    favouriteListEl.innerHTML += `<li class='favouriteElement'><h2 class="favouriteTitleName">${show.name}</h2><img src="${show.photo}"/></li>`;
  }
}
