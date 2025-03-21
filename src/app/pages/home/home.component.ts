import { Component, signal } from '@angular/core';
import { filteredStudios, filterByLocation, studioList, filterByRadius } from '../../state/studio.state';
import { StudioCardComponent } from "../../components/studio-card/studio-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [StudioCardComponent, CommonModule]
})
export class HomeComponent {
  studios = filteredStudios; // Dynamic list of studios
  searchQuery = signal(''); // Store user input
  locationSuggestions = signal<string[]>([]); // Suggestions list
  errorMessage = signal('');
  selectedRadius = signal('10');

  onSearchChange() {
    filterByLocation(this.searchQuery());

    // Generate location suggestions
    const uniqueLocations = new Set(studioList().map(studio => studio.Location.Area || studio.Location.City));
    this.locationSuggestions.set(
      [...uniqueLocations].filter(location =>
        location.toLowerCase().includes(this.searchQuery().toLowerCase())
      )
    );
  }

  selectLocation(location: string) {
    this.searchQuery.set(location);
    filterByLocation(location);
    this.locationSuggestions.set([]); // Clear suggestions after selection
  }

  onRadiusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedRadius.set(select.value);
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      this.errorMessage.set("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const radius = parseInt(this.selectedRadius());

        // Filter studios within selected radius
        filterByRadius(userLat, userLng, radius);
        this.errorMessage.set('');
      },
      (error) => {
        this.errorMessage.set("Unable to fetch location. Please allow location access.");
      }
    );
  }
}
