"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Ameli",
      "Lion King",
      "La-la-land",
      "Terminator",
      "The best story you will hear",
    ],
  };

  const adv = document.querySelectorAll(".promo__adv img"),
    poster = document.querySelector(".promo__bg"),
    genre = poster.querySelector(".promo__genre"),
    movieList = document.querySelector(".promo__interactive-list"),
    addForm = document.querySelector("form.add"),
    checkbox = addForm.querySelector('[type="checkbox"]'),
    addInput = addForm.querySelector(".adding__input");

  const deleteAdv = (arr) => {
    arr.forEach((el) => el.remove());
  };

  const makeChanges = () => {
    genre.textContent = "DRAMA";
    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };

  const sortArr = (arr) => arr.sort();

  const lowerCaseFirstLetter = (str) => {
    return str[0].toLocaleLowerCase() + str.slice(1);
  };

  const renderMovieDB = (films, parent) => {
    let lowerCaseMoviesArr = films.map((movie) =>
      movie.length < 21
        ? lowerCaseFirstLetter(movie)
        : `${lowerCaseFirstLetter(movie).slice(0, 20)}...`
    );

    sortArr(lowerCaseMoviesArr);

    parent.innerHTML = "";
    sortArr(films);

    lowerCaseMoviesArr.forEach((el, i) => {
      parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${el}
            <div class="delete"></div>
            </li>`;
    });

    document.querySelectorAll(".delete").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        movieDB.movies.splice(i, 1);
        renderMovieDB(movieDB.movies, movieList);
      });
    });
  };

  const confirmButtonHandler = (e) => {
    e.preventDefault();
    if (!addInput.value.trim()) return;

    if (checkbox.checked) {
      console.log("Adding favourite movie");
    }
    movieDB.movies.push(lowerCaseFirstLetter(addInput.value));
    movieDB.movies.sort();
    renderMovieDB(movieDB.movies, movieList);
    e.target.reset();
    console.log(movieDB.movies);
  };

  deleteAdv(adv);
  makeChanges();
  movieDB.movies = movieDB.movies.map((movie) => lowerCaseFirstLetter(movie));
  renderMovieDB(movieDB.movies, movieList);

  addForm.addEventListener("submit", confirmButtonHandler);
});
