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