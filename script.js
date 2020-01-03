function searchMovie() {
	$('#movie-list').html('');

	$.ajax({
		url: 'https://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			apikey: '62c57091',
			s: $('#search-input').val(),
		},
		success: function(result) {
			if (result.Response == 'True') {
				let movies = result.Search;

				$.each(movies, (i, data) => {
					$('#movie-list').append(`
								
                  <div class="col-md-4">
                     <div class="card mb-3">
                        <img src="${data.Poster}" class="card-img-top" alt="..">
                        <div class="card-body">
                           <h5 class="card-title">${data.Title}</h5>
                           <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                           <a href="" key="${data.imdbID}" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See detail</a>
                        </div>
                     </div>
                  </div>
                  
               `);
				});

				$('#search-input').val('');
			} else {
				$('#movie-list').html(`
            <div class="col">
               <h1 class="text-center">${result.Error}</h1>
            </div>
               
         `);
			}
		},
	});
}

$('#search-button').on('click', function() {
	searchMovie();
});

$('#search-input').on('keyup', function(e) {
	const enter = 13;
	if (e.which === enter) {
		if ($(this).val() === '') {
			$('.form-control').prop('placeholder', 'Type a movie name');
			$('#input-group').append(`
				<div class="alert alert-danger" role="alert">
				Type a movie title
				`);
			setTimeout(() => {
				$('.alert').remove();
			}, 2000);
		} else {
			$('.alert-danger').remove();
			searchMovie();
		}
	}
});

$('#search-input').keyup(function() {
	if ($(this).val() == '') {
		$('#search-button').prop('disabled', true);
	} else {
		$('#search-button').prop('disabled', false);
	}
});

$('#movie-list').on('click', '.see-detail', function() {
	$.ajax({
		url: 'https://omdbapi.com',
		dataType: 'json',
		type: 'get',
		data: {
			apikey: '62c57091',
			i: $(this).data('id'),
		},
		success: (movie) => {
			if (movie.Response === 'True') {
				$('.modal-body').html(`
	          <div class="container-fluid">
	             <div class="row">
	                <div class="col-md-4">
	                    <img src="${movie.Poster}" class="img-fluid">
	                </div>
	                <div class="col-md-8">
	                  <ul class="list-group">
	                    <li class="list-group-item"><h3>${movie.Title}</h3></li>
	                    <li class="list-group-item">Genre : ${movie.Genre}</li>
	                    <li class="list-group-item">Released : ${movie.Released}</li>
	                    <li class="list-group-item">Director : ${movie.Director}</li>
	                    <li class="list-group-item">Actor : ${movie.Actors}</li>
	                    <li class="list-group-item">Plot : ${movie.Plot}</li>
	                  </ul>
	              </div>
	             </div>
	          </div>
	          `);
			}
		},
	});
});
