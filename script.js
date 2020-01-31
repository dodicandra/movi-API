const sInput = document.querySelector('#search-input');
const search = document.querySelector('#search-button');
const movieList = document.querySelector('#movie-list');
const modal = document.querySelector('.modal-body');
const errors = document.querySelector('#error');

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
  try {
    errors.innerHTML = '';
    const movie = await getMovie(sInput.value);
    updateUI(movie);
  } catch (error) {
    errors.innerHTML = `<div class="alert alert-danger" >
    ${error}
  </div>`;
  }
};

const getMovie = (value) => {
  return fetch(`https://www.omdbapi.com/?apikey=62c57091&s=${value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === 'False') {
        throw new Error(response.Error);
      }
      return response;
    });
};

const updateUI = (movie) => {
  const { Search } = movie;
  console.log(movie);
  let card = '';
  Search.map((m) => (card += cardMovie(m)));
  movieList.innerHTML = card;
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
