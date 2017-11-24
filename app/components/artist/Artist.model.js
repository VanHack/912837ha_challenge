var $endpoint = 'https://rest.bandsintown.com/';
var $apiKey = '4fb845c67d91bcb3178498fc6fe1fedc-14fb845cf067d91badcb3178qwe498fsc6fe1fedc';


App.factory('ArtistModel', function($q, $http){
    return {
        get: function ($name) {
          var artists = [];
          var defer = $q.defer();
            
          $http
          .get($endpoint + 'artists/' + $name +'?app_id=' + $apiKey)
          .then(function(response) {
            defer.resolve(response);
          }, function(){
            defer.reject('Oops... something went wrong');
          });

          return defer.promise;
        },

        getEvents: function($name){
            var artists = [];
            var defer = $q.defer();
              
            $http
            .get($endpoint + 'artists/' + $name +'/events?app_id=' + $apiKey)
            .then(function(response) {
              defer.resolve(response);
            }, function(){
              defer.reject('Oops... something went wrong');
            });
  
            return defer.promise;
        } 
    }
});