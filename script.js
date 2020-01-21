const sInput = document.querySelector('#search-input');
const search = document.querySelector('#search-button');
const movieList = document.querySelector('#movie-list');
const modal = document.querySelector('.modal-body');

sInput.addEventListener('keyup', function(e) {
  const enter = 13;
  if (e.keyCode === enter) {
    SearchMovie();
    sInput.value = '';
  }
});

search.addEventListener('click', () => {
  SearchMovie();
  sInput.value = '';
});

const SearchMovie = async () => {
  const movie = await getMovie(sInput.value);
  updateUI(movie);
};

const getMovie = (value) => {
  return fetch(`https://www.omdbapi.com/?apikey=62c57091&s=${value}`)
    .then((response) => response.json())
    .then((ress) => ress)
    .catch((err) => console.log(err));
};

const updateUI = (movie) => {
  const { Response, Search, Error } = movie;
  let card = '';
  if (Response === 'True') {
    Search.forEach((m) => (card += cardMovie(m)));
    movieList.innerHTML = card;
  } else {
    const UIerros = `<div class="col">
      <h1 class="text-center">${Error}</h1>
   </div>`;
    movieList.innerHTML = UIerros;
  }
};

document.addEventListener('click', async function(e) {
  if (e.target.classList.contains('card-link')) {
    const imdbID = e.target.dataset.id;
    const movie = await getMovieCard(imdbID);
    updateUIDetail(movie);
  }
});

const getMovieCard = (value) => {
  return fetch(`https://www.omdbapi.com/?apikey=62c57091&i=${value}`)
    .then((res) => res.json())
    .then((ress) => ress);
};

const updateUIDetail = (value) => {
  modal.innerHTML = modalMovie(value);
};
