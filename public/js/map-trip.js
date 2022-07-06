let map

function renderMap() {

    getTripsFromDB()

    map = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 12,

        }
    )
}

function getTripsFromDB() {

    const path = window.location.pathname
    axios
        .get(`/api${path}`)
        .then(response => {
            getRouteDetails(response.data)
        })
        .catch(err => console.log(err))
}

function getRouteDetails(info) {

    const directions = new google.maps.DirectionsService()

    const routeDetails = {
        origin: info.origin.address,
        destination: info.destination.address,
        travelMode: 'DRIVING'
    }

    directions.route(
        routeDetails,
        routeResults => {

            renderRoutes(routeResults)
        }
    )
}

function renderRoutes(routeResults) {
    console.log(window.location)
    const renderer = new google.maps.DirectionsRenderer()

    renderer.setDirections(routeResults)
    renderer.setMap(map)
}

/* 

let map

function init() {
    renderMap()
    getTripsFromDB()
    getRouteDetails()


}


function renderMap() {
    map = new google.maps.Map(
        document.querySelector('#myMap'),
        { zoom: 5, center: { lat: 41.3977381, lng: 2.190471916 } }
    )
}


function getTripsFromDB() {

    const path = window.location.pathname
    axios
        .get(`/api${path}`)
        .then(response => {
            console.log(response)
            printMarkers(response.data)
        })
        .catch(err => console.log(err))
}


function printMarkers(trips) {


    let position = { lat: trips.origin.location.coordinates[0], lng: trips.origin.location.coordinates[1] }

    console.log(position, "EEEEEEEE")

    let positionEnd = { latEnd: trips.destination.location.coordinates[0], lngEnd: trips.destination.location.coordinates[1] }

    console.log(positionEnd, "AAAAAAAAAA")

    new google.maps.Marker({ position, map })
    new google.maps.Marker({ positionEnd, map })


    // map.setCenter({ lat: trips[0].location.coordinates[0], lng: trips[0].location.coordinates[1] })
}
*/