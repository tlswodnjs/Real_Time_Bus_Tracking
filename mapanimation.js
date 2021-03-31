
  mapboxgl.accessToken = 'pk.eyJ1Ijoic29mdGV4cGVyaW1lbnQiLCJhIjoiY2tjMngyZm9rMDFvajJzczJ3aWo0bnh6aiJ9.Bc_qK9Xf8SFBXkFM_x2gpg';

  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.104081, 42.365554],
      zoom: 12
  });

  var marker = new mapboxgl.Marker()
    .setLngLat([0,0])
    .addTo(map);

  async function run(){
    const locations = await getBusLocation();
    console.log(new Date());
    console.log(locations);
    
    // var busLocations = [];
    // var busMarkers = [];

    // Create an array with bus LngLat
      // for (let i = 0; i < locations.length; i++){
      //   busMarkers.push(locations[i].attributes.label);
      //   busMarkers[i] = new mapboxgl.Marker()
      //     .setLngLat([0,0])
      //     .addTo(map);
        
        // let busLngLat = [];
        // busLngLat.push(locations[i].attributes.longitude);
        // busLngLat.push(locations[i].attributes.latitude);

      // //   let busPosition = {
      // //     id: locations[i].attributes.label,
      // //     lnglat: busLngLat
      // //   };

      // //   busLocations.push(busPosition);      
      // // };

      // // console.log(busLocations);

      // busMaker[i].setLngLat(busLngLat);
      // }

    let busLngLat = [];

    busLngLat.push(locations[0].attributes.longitude);
    busLngLat.push(locations[0].attributes.latitude);

    marker.setLngLat(busLngLat);

    // Timer to pull info every 15 sec
    setTimeout(run, 15000);
  }

  async function getBusLocation(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data;
  }

  run();