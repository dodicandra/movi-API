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
  console.log(movie);
  updateUI(movie);
};

function getMovie(value) {
  return fetch(`https://www.omdbapi.com/?apikey=62c57091&s=${value}`)
    .then((response) => response.json())
    .then((ress) => ress.Search);
}

function updateUI(movie) {
  let card = '';
  movie.forEach((m) => (card += cardMovie(m)));
  movieList.innerHTML = card;
}

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

const modalMovie = (data) => {
  return `<div class="container-fluid">
  <div class="row">
     <div class="col-md-3">
         <img src="${data.Poster}" class="img-fluid">
     </div>
     <div class="col-md-8">
       <ul class="list-group">
         <li class="list-group-item"><h3>${data.Title}</h3></li>
         <li class="list-group-item">Genre : ${data.Genre}</li>
         <li class="list-group-item">Released : ${data.Released}</li>
         <li class="list-group-item">Director : ${data.Director}</li>
         <li class="list-group-item">Actor : ${data.Actors}</li>
         <li class="list-group-item">Plot : ${data.Plot}</li>
       </ul>
   </div>
  </div>
</div>`;
};

const cardMovie = (data) => {
  return `<div class="col-md-4">
  <div class="card mb-3">
     <img src="${data.Poster}" class="card-img-top" alt="..">
     <div class="card-body">
        <h5 class="card-title">${data.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
        <a href="" key="${data.imdbID}" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See detail</a>
     </div>
  </div>
</div>`;
};
