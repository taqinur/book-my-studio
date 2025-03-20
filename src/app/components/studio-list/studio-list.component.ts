import { Component, inject } from '@angular/core';
import { filteredStudios, filterByLocation, filterByRadius } from '../../state/studio.state';
import { StudioCardComponent } from "../studio-card/studio-card.component";

@Component({
  selector: 'app-studio-list',
  templateUrl: 'studio-list.component.html',
  imports: [StudioCardComponent],
})

export class StudioListComponent {
  studios = filteredStudios;

  onSearchLocation(event: Event) {
    const location = (event.target as HTMLInputElement).value;
    filterByLocation(location);
  }

  onSearchRadius() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          filterByRadius(lat, lng, 10);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
