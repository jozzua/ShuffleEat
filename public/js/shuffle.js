      jQuery(window).ready(function(){  
        $(initiate_geolocation);
        $.blockUI({ message: '<img src="busy.gif" /> <h5>Shuffling... </h5><p>(Please ALLOW the location request.)' });
        $("#btnShfl").click(function() {
          location.reload();
        })
      });  


      function initiate_geolocation() {  
        if (navigator.geolocation)  
        {  
          navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);  
        }  
        else  
        {  
          yqlgeo.get('visitor', normalize_yql_response);  
        }  
      }  

      function handle_errors(error)  
      {  
        switch(error.code)  
        {  
          case error.PERMISSION_DENIED: alert("Your browser did not share geolocation data. Please allow this site on your browser settings.");  
          break;  

          case error.POSITION_UNAVAILABLE: alert("Could not detect current position. Check your browser settings. Allow this site to get your location.");  
          break;  

          case error.TIMEOUT: alert("Retrieving position timed out. Try reloading or check your browser settings.");  
          break;  

          default: alert("Oops. Something went wrong. We can't detect your location. ");  
          break;  
        }  
            $.unblockUI();
      }  

      function normalize_yql_response(response)  
      {  
        if (response.error)  
        {  
          var error = { code : 0 };  
          handle_error(error);  
          return;  
        }  

        var position = {  
          coords :  
          {  
            latitude: response.place.centroid.latitude,  
            longitude: response.place.centroid.longitude  
          },  
          address :  
          {  
            city: response.place.locality2.content,  
            region: response.place.admin1.content,  
            country: response.place.country.content  
          }  
        };  

        handle_geolocation_query(position);  
      } 


(function($){
    $.fn.shuffle = function() {
          return this.each(function(){
                  var items = $(this).children();
                        return (items.length)
                    ? $(this).html($.shuffle(items))
                    : this;
              });
            }
     
      $.shuffle = function(arr) {
            for(
                    var j, x, i = arr.length; i;
                          j = parseInt(Math.random() * i),
                                x = arr[--i], arr[i] = arr[j], arr[j] = x
                                    );
                return arr;
                  }
})(jQuery);

           function valueOrDefault(def) {
             var result = ' ';
                  if (def != undefined) {
                    result = def;
                    }
                    else
                    {
                    result = '';
                    }
                    return result;
                 
            };


      function handle_geolocation_query(position){  
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        var rad = Math.floor((Math.random()*500)+100); 

        /* Query foursquare API for venue recommendations near the current location. */
        $.getJSON('https://api.foursquare.com/v2/venues/explore?ll=' +lat +',' +lon +'&client_id=GJALQBJ4F1IQOEFLPHJ5GB1UR4DDZW4JZQEPQCMGZS5DL4LF&client_secret=0UUEFZIPH5LTM5IKLBXRYPKVGUPGZFDTD0HFMU2UOOX4FFVN&v=20120329&section=food', function(data) {
          venues = data['response']['groups'][0]['items'];
          /*  Find nearest venues. */
            $.shuffle(venues);
          for (var i = 0; i < 3; i++) {
            entry = venues[i];
            
            content = 
            '<a href="http://maps.google.com/?q=' + entry['venue']['location']['lat']  +',' + entry['venue']['location']['lng'] + '">'+
              '<h4>' + entry['venue']['name']  + '</h4> ' + '</a>' + 
            '<p>' + valueOrDefault(entry['venue']['location']['address'])  + ' ' 
                  + valueOrDefault(entry['venue']['location']['crossStreet'])  + ' ' 
//                  + entry['venue']['contact']['formattedPhone']  + ' '
                  + '(' + entry['venue']['location']['distance']  + 'm)'+
            '</p><hr/>';

            $(content).appendTo("#names");

            $.unblockUI();
          }

        })
        .error(function() { alert("Hey I could not connect to server. Try reloading."); })
     };  



