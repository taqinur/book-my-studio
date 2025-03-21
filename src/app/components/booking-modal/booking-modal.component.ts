import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { addBooking, bookings } from '../../state/booking.state';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-modal',
  templateUrl: 'booking-modal.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class BookingModalComponent {
  @Input() studio: any; // Receives studio data from parent component
  @Output() closeModal = new EventEmitter<void>(); // Emits event to close modal

  userName = signal('');
  userEmail = signal('');
  bookingDate = signal('');
  timeSlot = signal('');
  errorMessage = signal('');
  successMessage = signal('');
  today = new Date().toISOString().split('T')[0];
  availableTimeSlots: string[] = [];

  ngOnInit() {
    this.generateTimeSlots();
  }

  generateTimeSlots() {
    const openHour = parseInt(this.studio.Availability.Open.split(':')[0]);
    const closeHour = parseInt(this.studio.Availability.Close.split(':')[0]);
    this.availableTimeSlots = Array.from(
      { length: closeHour - openHour },
      (_, i) => `${openHour + i}:00`
    );
  }

  isTimeSlotAvailable(): boolean {
    return !bookings().some(
      (booking) =>
        booking.studioId === this.studio.Id &&
        booking.date === this.bookingDate() &&
        booking.timeSlot === this.timeSlot()
    );
  }

  bookStudio() {
    if (!this.userName() || !this.userEmail() || !this.bookingDate() || !this.timeSlot()) {
      this.errorMessage.set('Please fill in all fields.');
      return;
    }

    if (!this.isTimeSlotAvailable()) {
      this.errorMessage.set('The selected time slot is not available. Please choose another time.');
      return;
    }

    // Create new booking object
    const newBooking = {
      id: Date.now(),
      studioId: this.studio.Id,
      studioName: this.studio.Name,
      studioType: this.studio.Type,
      userName: this.userName(),
      userEmail: this.userEmail(),
      date: this.bookingDate(),
      timeSlot: this.timeSlot(),
    };

    // Save booking
    addBooking(newBooking);

    // Show success message
    this.successMessage.set(`Booking confirmed for ${this.studio.Name} on ${this.bookingDate()} at ${this.timeSlot()}`);

    // Close modal after 2 seconds
    setTimeout(() => {
      this.closeModal.emit();
    }, 2000);
  }
}
