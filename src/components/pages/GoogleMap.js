import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '800px',
  height: '600px'
};


const defaultCenter = {
  lat: -34.397,
  lng: 150.644
};

const defaultZoom = 8;

const MapComponent = ({ job, onJobComplete }) => {
    const pickupPosition = {
      lat: job.pickupLatitude || defaultCenter.lat,
      lng: job.pickupLongitude || defaultCenter.lng
    };

    const dropoffPosition = {
      lat: job.dropOffLatitude || defaultCenter.lat,
      lng: job.dropOffLongitude || defaultCenter.lng,
    };
  
  
  const handleCompleteJob = () => {
    
    axios.put(`http://localhost:8080/jobs/${job.id}/complete`)
      .then(response => {
      
        if (onJobComplete) {
          onJobComplete(response.data);
        }
      })
      .catch(error => {
        console.error('Error completing the job:', error);
      });
  };

  return (
    <>
    <LoadScript googleMapsApiKey="AIzaSyBRGe1cHq28Y6Vyr6yk0Ker28DmlCWCh20">
    <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={defaultZoom}
      >
 
        <Marker position={pickupPosition} label="Pickup" />

        <Marker position={dropoffPosition} label="Dropoff" />
      </GoogleMap>
    </LoadScript>
    <button >Mark as Completed</button>
    </>
  );
};

export default MapComponent;
