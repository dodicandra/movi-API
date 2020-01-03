const search = document.querySelector('#search-button');
const sInput = document.querySelector('#search-input');
search.addEventListener('click', function(e) {
  SearchMovie();
});

sInput.addEventListener('keyup', function(e) {
  const enter = 13;
  if (e.keyCode === enter) {
    SearchMovie();
  }
});

function SearchMovie() {
  fetch(
    `http://www.omdbapi.com/?apikey=62c57091&s=${
      document.querySelector('#search-input').value
    }`
  )
    .then((response) => {
      return response.json();
    })
    .then((ress) => {
      document.querySelector('#movie-list').innerHTML = '';
      if (ress.Response == 'True') {
        const movie = ress.Search;
        movie.map((data) => {
          document.querySelector(
            '#movie-list'
          ).innerHTML += `<div class="col-md-4">
            <div class="card mb-3">
               <img src="${data.Poster}" class="card-img-top" alt="..">
               <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                  <a href="" key="${data.imdbID}" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See detail</a>
               </div>
            </div>
         </div>`;
        });
      } else {
        const erros = `<div class="col">
      <h1 class="text-center">${ress.Error}</h1>
   </div>`;
        document.querySelector('#movie-list').innerHTML = erros;
      }
    })
    .catch((err) => console.log(err));
}

const movie = document.querySelector('#movie-list');
movie.addEventListener('click', function(e) {
  fetch(`http://www.omdbapi.com/?apikey=62c57091&i=${e.target.dataset.id}`)
    .then((res) => res.json())
    .then((ress) => {
      const modal = document.querySelector('.modal-body');
      const card = `<div class="container-fluid">
    <div class="row">
       <div class="col-md-4">
           <img src="${ress.Poster}" class="img-fluid">
       </div>
       <div class="col-md-8">
         <ul class="list-group">
           <li class="list-group-item"><h3>${ress.Title}</h3></li>
           <li class="list-group-item">Genre : ${ress.Genre}</li>
           <li class="list-group-item">Released : ${ress.Released}</li>
           <li class="list-group-item">Director : ${ress.Director}</li>
           <li class="list-group-item">Actor : ${ress.Actors}</li>
           <li class="list-group-item">Plot : ${ress.Plot}</li>
         </ul>
     </div>
    </div>
 </div>`;
      modal.innerHTML = card;
    });
});
