var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();

    $(function() {
      $(".draggable").draggable();
      $(".droppable").droppable({
          drop: function(event, ui) {
              $(this).addClass("ui-state-highlight");
              var paysName = ui.helper.text();
              if (paysName === "localisation(GPS)") {
                  performGeolocation(paysName);
              } else {
                  performCountryCentering(paysName);
              }
          },
      });
  });
  
  function performGeolocation(locationName) {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              var lat = position.coords.latitude;
              var lon = position.coords.longitude;
  
              map.setView([lat, lon], 13);
  
              console.log("Carte recentrée sur", locationName, "à la position :", lat, lon);
          }, function(error) {
              console.error("Erreur de géolocalisation :", error.message);
          });
      } else {
          console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
      }
  }
  
  function performCountryCentering(countryName) {
      $.ajax({
          url: "https://nominatim.openstreetmap.org/search",
          data: {
              q: countryName,
              format: "json",
              limit: 1,
          },
          success: function(data) {
              if (data.length > 0) {
                  var firstResult = data[0];
                  var lat = parseFloat(firstResult.lat);
                  var lon = parseFloat(firstResult.lon);
  
                  map.setView([lat, lon], 13);
  
                  console.log("Carte recentrée sur", countryName, "à la position :", lat, lon);
              } else {
                  console.log("Aucun résultat trouvé pour", countryName);
              }
          },
          error: function(error) {
              console.error("Erreur lors de la requête Nominatim:", error);
          },
      });
  }
  