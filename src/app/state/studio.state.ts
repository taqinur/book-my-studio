import { signal } from '@angular/core';
import studiosData from '../../assets/studios.json';

export const studioList = signal(studiosData.Studios);
export const filteredStudios = signal(studiosData.Studios);

export function filterByLocation(location: string) {
  filteredStudios.set(
    studioList().filter(studio =>
      studio.Location.Area.toLowerCase().includes(location.toLowerCase())
    )
  );
}

export function filterByRadius(userLat: number, userLng: number, radiusKm: number) {
  const earthRadius = 6371; // Radius of the Earth in km

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  }

  filteredStudios.set(
    studioList().filter(studio => {
      const distance = getDistance(
        userLat, userLng,
        studio.Location.Coordinates.Latitude, studio.Location.Coordinates.Longitude
      );
      return distance <= radiusKm;
    })
  );
}

console.log("Angular Studio Booking App Initialized with Signals!");
