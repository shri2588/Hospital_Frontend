import { React, useEffect, useState } from "react";
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import haversine from 'haversine-distance'

function MapWork() {

  const [stateHospital, setHospitals] = useState([])
  const [UserLocation, setLocation] = useState({
    loaded: false,
    coordinates: {lat: "",lng: ""}
  })

  const onSuccess = (Ulocation) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: Ulocation.coords.latitude,
        lng: Ulocation.coords.longitude
      }
    })
  }

  const onError = error => {
    setLocation({
      loaded: true,
      error
    })
  }

  useEffect(() => {
    if(!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported"
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
    console.log("UserLocation",UserLocation)
    console.log("Single",UserLocation.coordinates.lat)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])
  
  function fetchData() {
    const requestBody = {
      query: `
        query 
        {
            getHospital
            {
                _id
                hospitalName
                hospitalRegistrationNo
                hospitalType
                government
                address
                state
                district
                pincode
                website
                lognitude
                latitude
                ownerName
                ownerContactNo
                ownerEmail
                password
                status
            }
          }
        `
    };



    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        //console.log(resData);
        const fetchHospitals = resData.data.getHospital;
        setHospitals(fetchHospitals);
        //console.log(fetchHospitals)
      })
      .catch(err => {
        console.log(err);
      });
  }

  const location = []
  
  const user = [UserLocation.coordinates.lng, UserLocation.coordinates.lat]
  
  let test = stateHospital.map(hos => 
      location.push({
        hospitalName: hos.hospitalName,
        distance:(haversine(user, [hos.lognitude,hos.latitude ])/1000).toFixed(2),
      }) 
  )
  location.sort(function(a,b){
    return a.distance - b.distance ;
  })
  console.log("Locations",location)






  return (
    <div>
      <MapContainer center={[23.838804, 78.737808]} zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '600px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

      

        {
          stateHospital.map(hos => (
            <Marker position={[
              hos.lognitude,
              hos.latitude
            ]}>
              <Popup>
              <h5>{hos.hospitalName}</h5>
              <p>{hos.hospitalType}</p>
              </Popup>
            </Marker>
          ))

        }

      </MapContainer>
    </div>

  )
}


export default MapWork;