import { signal } from '@angular/core';

interface Booking {
  id: number;
  studioId: number;
  studioName: string;
  studioType: string;
  userName: string;
  userEmail: string;
  date: string;
  timeSlot: string;
}

export const bookings = signal<Booking[]>([]);

export function loadBookings() {
  const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.set(storedBookings);
}

export function addBooking(newBooking: Booking) {
  const updatedBookings = [...bookings(), newBooking];
  bookings.set(updatedBookings);
  localStorage.setItem('bookings', JSON.stringify(updatedBookings));
}

loadBookings();
