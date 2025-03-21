import { Component, signal } from '@angular/core';
import { bookings, loadBookings } from '../../state/booking.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  templateUrl: 'bookings.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class BookingsComponent {
  bookingsList = bookings;

  ngOnInit() {
    loadBookings();
  }
}
