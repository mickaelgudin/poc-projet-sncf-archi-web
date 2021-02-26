var selectedGares = [];

function clearMap(){
    for(i in map._layers){        
        if(map._layers[i]._path != undefined)
        {
            try{
                map.removeLayer(map._layers[i]);
            }
            catch(e){
                console.log("problem with " + e + map._layers[i]);
            }
        }
    }
}

function onClickMarqueur(name) {
    
    //gare deja selectionnee
    if(selectedGares.includes(name)) {
        const index = selectedGares.indexOf(name);
        if (index > -1) {
            selectedGares.splice(index, 1);
        }
        clearMap();
    } else {
        if(selectedGares.length == 2) {
            selectedGares.pop();
            clearMap();
        }
        selectedGares.push(name);
    }

    let results = document.querySelector('#results');
    results.innerHTML = selectedGares;
    
    if(selectedGares.includes('paris montparnasse') && selectedGares.includes('bordeaux st jean') ) {
        let latlngs = Array();
        latlngs.push([48.8402, 2.3193]);
        latlngs.push([44.8260022,-0.558805]);
        var line = L.polyline(latlngs, {color: 'red'}).addTo(map);
    }
    if(selectedGares.includes('paris montparnasse') && selectedGares.includes('strasbourg') ) {
        let latlngs = Array();
        latlngs.push([48.8402, 2.3193]);
        latlngs.push([48.5850571,7.7323068]);
        var line = L.polyline(latlngs, {color: 'red'}).addTo(map);
    }

    if(selectedGares.includes('strasbourg') && selectedGares.includes('bordeaux st jean') ) {
        let latlngs = Array();
        latlngs.push([48.5850571,7.7323068]);
        latlngs.push([44.8260022,-0.558805]);
        var line = L.polyline(latlngs, {color: 'red'}).addTo(map);
    }

}

//on centre la carte sur la france
var map = L.map('map').setView([46.1313689,-2.4361319], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//on definit les marqueur clickable(gare de montparnasse et gare de bordeaux st jean)
L.marker([48.8402, 2.3193]).addTo(map).on('click', function(){
    onClickMarqueur('paris montparnasse');
}, false);

L.marker([44.8260022,-0.558805]).addTo(map).on('click', function(){
    onClickMarqueur('bordeaux st jean');
}, false);

L.marker([48.5850571,7.7323068]).addTo(map).on('click', function(){
    onClickMarqueur('strasbourg');
}, false);