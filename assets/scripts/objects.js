"use strict";

// /**BUTTONS */
const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const userInputsEl = document.querySelectorAll("input"); //all user input elements

// /**Logic Variables */

const movies = [];

const renderMovies = (filter = "") => {
  // /**render movie element */
  const movieList = document.getElementById("movie-list");
  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  if (movieList.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";
  console.log("from line 24 " + filteredMovies);
  filteredMovies.forEach((movie) => {
    // /**creates injects movie to dom */
    const movieEl = document.createElement("li");
    let { info, getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie);
    // const { title: movieTitle } = info; // /**to reassign name on extracted properties */
    let text = getFormattedTitle.call(movie) + " - ";

    for (const key in info) {
      if (key !== "title") {
        text = text + `${key}:${info[key]}`;
      }
    }

    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const clearMovieInput = () => {
  // /**clear inputs */
  for (const usrInput of userInputsEl) {
    usrInput.value = "";
  }
};

// /**BUTTON HANDLERS */
handleAddMovie = () => {
  // /**adds movie input values */
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim("") === "" ||
    extraName.trim("") === "" ||
    extraValue.trim("") === ""
  ) {
    alert("Please fill out all inputs on form");
  }

  const newMovie = {
    // /**take user input and passes to global movie object */
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };
  movies.push(newMovie);

  clearMovieInput();
  renderMovies();
};

handleSearchMovie = () => {
  // /**search movie filters input*/
  const searchFilterInput = document.getElementById("filter-title").value;
  renderMovies(searchFilterInput);
  console.log("handle search movie");
};

addMovieBtn.addEventListener("click", handleAddMovie); // /**add movie button */
searchBtn.addEventListener("click", handleSearchMovie); // /**search button */
