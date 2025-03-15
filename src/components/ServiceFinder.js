import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import './ServiceFinder.css';
import { recyclingLocations } from '../data/recyclingLocations';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '8px'
};

const center = {
  lat: 40.7128, // New York City coordinates as default
  lng: -74.0060
};

const ServiceFinder = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const filteredLocations = filterType === 'all' 
    ? recyclingLocations 
    : recyclingLocations.filter(location => location.types.includes(filterType));

  return (
    <div className="service-finder">
      <h1 className="section-title">Find Recycling Services Near You</h1>
      
      <div className="filter-controls">
        <label htmlFor="filter">Filter by type: </label>
        <select 
          id="filter" 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Services</option>
          <option value="recycling">Recycling Centers</option>
          <option value="composting">Composting Services</option>
          <option value="dropoff">Drop-off Locations</option>
          <option value="pickup">Pickup Services</option>
        </select>
      </div>
      
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
        >
          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              onClick={() => setSelectedLocation(location)}
              icon={{
                url: `/icons/${location.types[0]}.svg`,
                scaledSize: { width: 30, height: 30 }
              }}
            />
          ))}
          
          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="info-window">
                <h3>{selectedLocation.name}</h3>
                <p>{selectedLocation.address}</p>
                <p><strong>Services:</strong> {selectedLocation.types.join(', ')}</p>
                <p>{selectedLocation.hours}</p>
                <p><strong>Contact:</strong> {selectedLocation.phone}</p>
                <a href={`https://maps.google.com/?q=${selectedLocation.address}`} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      
      <div className="location-list">
        <h2>Nearby Locations</h2>
        {filteredLocations.map((location) => (
          <div 
            key={location.id} 
            className="location-card"
            onClick={() => setSelectedLocation(location)}
          >
            <div className="location-icon">
              <img src={`/icons/${location.types[0]}.svg`} alt={location.types[0]} />
            </div>
            <div className="location-info">
              <h3>{location.name}</h3>
              <p>{location.address}</p>
              <p className="location-services">
                {location.types.map(type => (
                  <span key={type} className="service-tag">{type}</span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFinder;
