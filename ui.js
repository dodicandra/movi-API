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
