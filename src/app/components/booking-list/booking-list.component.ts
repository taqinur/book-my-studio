import { Component } from '@angular/core';
import { bookings } from '../../state/booking.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  templateUrl: 'booking-list.component.html',
  imports: [CommonModule],
})
export class BookingListComponent {
  userBookings = bookings; // Reactive signal from state
}
