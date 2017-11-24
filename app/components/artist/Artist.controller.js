var App = angular.module('superhero', ['ngRoute', 'ngCookies']);

App.controller('ArtistCtrl', function($scope, $cookies, $http, ArtistModel){
   
    $scope.init = function(){
        $scope.history = [];
        $cookie = $cookies.get('artists');

        if($cookie){
            $scope.history = JSON.parse($cookie);
        }
    }

    $scope.search = function(){
        input = $scope.searchInput;

        ArtistModel.get(input).then(function(response){
            
            var $artists = [];
            $artists.push(response.data);

            $scope.artists = $artists;
            $cookie = $cookies.get('artists');

            if(response.data.upcoming_event_count > 0){

                ArtistModel.getEvents(input).then(function(response){
                    $scope.artists.events = response.data;
    
                    $artists = $scope.artists;

                    if($cookie){
                        $cookie = JSON.parse($cookies.get('artists'));

                        $duplicated = false;

                        for(var $i = 0; $i < $cookie.length; $i++){
                            if($cookie[$i].id == $scope.artists[0].id){
                                $duplicated = true;
                            } 
                        }
                    
                        if(!$duplicated){
                            $cookie = JSON.parse($cookies.get('artists'));
                            $cookie.push($artists[0]);
                            $cookies.putObject('artists', $cookie);
                        }

                    } else {
                        
                        $cookies.putObject('artists', $artists);
                    }



                    var accordions = $(".accordions");
                    
                    activePanel = $(".accordions div.accordion:first");

                    $(activePanel).addClass('active');
                
                    accordions.delegate('.accordion', 'click', function(e){
                        var $self = $(this);
                    
                        if(!$self.is('.active')){
                            $($self).parent().find('.active').animate({width: "44px"}, 300);
                            $($self).animate({width: "400px"}, 300);
                            $($self).parent().find('.accordion').removeClass('active');
                            $($self).addClass('active');
                            $($self).parent().find('.accordion .actions').hide();
                            
                            window.setTimeout(function(){
                                $($self).find('.actions').show();
                            }, 500);
                        };
                    });

                    
                });

            } else {
                $artists = $scope.artists;
                
                if($cookie){
                    $cookie = JSON.parse($cookies.get('artists'));

                    $duplicated = false;

                    for(var $i = 0; $i < $cookie.length; $i++){
                        if($cookie[$i].id == $scope.artists[0].id){
                            $duplicated = true;
                        } 
                    }
                
                    if(!$duplicated){
                        $cookie = JSON.parse($cookies.get('artists'));
                        $cookie.push($artists[0]);
                        $cookies.putObject('artists', $cookie);
                    }

                } else {
                    
                    $cookies.putObject('artists', $artists);
                }
            }


        }, function(){
            alert('The words you have used dont match nothing!');
        });
    }

    $scope.clear = function(){
        $cookies.remove('artists');
        alert('All history record is empty.');
        window.location.href = window.location.href;
    }

    
});