function MoviesViewModel() {
    //api URL
    var url = 'http://api.allocine.fr/rest/v3/';
    // Data
    var self = this;
    self.chosenMovie         = ko.observable();
    self.chosenMovieListData = ko.observable();
    self.chosenMovieData     = ko.observable();


    /*
     * Recherche
     */
    self.submitSearchForm = function() {
      var movie = self.chosenMovie();
      self.goToMovieList(movie);
    };




    /*
     * Movie list
     */
    self.goToMovieList = function(movie) {
        self.chosenMovie(movie);
        self.chosenMovieData(null);
        $.getJSON(url+'search', { partner: 'YW5kcm9pZC12M3M', q: movie, format:'json', filter: 'movie' }, function(data) {
          console.log('updating list data');
          self.chosenMovieListData(data.feed);
        });
    };
    // Show inbox by default
    self.goToMovieList('intouchables');




    /*
     * Movie details
     */
    self.goToMovie = function(movie) {
        self.chosenMovieListData(null); // Stop showing a folder
        $.getJSON(url+'movie', { partner: 'YW5kcm9pZC12M3M', code: movie.code, format:'json', filter: 'movie' }, function(data) {
          console.log('updating movie data');
          self.chosenMovieData(data.movie);
        });
    };
};

ko.applyBindings(new MoviesViewModel());