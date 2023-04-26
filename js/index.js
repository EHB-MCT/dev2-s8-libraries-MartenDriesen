"use strict";

const app = {
    toilets: [],
    map: L.map('map').setView([50.846662, 4.352541], 13), // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
    init() {


        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(app.map);

        // initialise de kaart

        // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
        // vergeet openstreetmap attributie niet

        // gebruik de functie "loadMarkers" om de markers toe te voegen
        app.loadMarkers();
    },
    loadMarkers() {


        const result = fetch('https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000')
            .then(function (response) {
                return response.json();
            })
            .then(function (getData) {

                getData.records.forEach(toilet => {
                    app.toilets.push(toilet.geometry.coordinates);
                });

                app.toilets.forEach(cordinate => {

                    console.log(cordinate);
                    app.addMarker(cordinate[1], cordinate[0]);
                });
            });










        // fetch de data van opendata.brussels.be
        // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart


    },
    addMarker(lat, lon) {
        var marker = L.marker([lat, lon]).addTo(app.map);
        marker.bindPopup("lat: " + lat + "<br>lon: " + lon).openPopup();

        // voeg een marker toe op lat, lon


    }
};

app.init();




