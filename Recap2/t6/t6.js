'use strict';

const numOfMovies = prompt('Syötä elokuvien lukumäärä');

const movies = [];

for (let i = 0; i < numOfMovies; i++) {
  const nimi = prompt('Syötä elokuvan nimi');
  const arvosana = prompt('Syötä elokuvalle arvosana');
  movies.push({
    nimi: nimi,
    arvosana: arvosana,
  });
}

movies.sort(function (a, b) {
  return b.arvosana - a.arvosana;
});

// console.log(movies);

// insertAdjacentHTML on vaihtoehto innerHTML:lle
document
  .querySelector('#suosikki')
  .insertAdjacentHTML('afterbegin', movies[0].nimi);

for (const movie of movies) {
  document.querySelector('#target').innerHTML +=
    `<li>${movie.nimi}, ${movie.arvosana}</li>`;
}
