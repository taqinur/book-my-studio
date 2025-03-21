import { Component, Input, signal } from '@angular/core';
import { BookingModalComponent } from "../booking-modal/booking-modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studio-card',
  templateUrl: 'studio-card.component.html',
  imports: [BookingModalComponent, CommonModule],
})
export class StudioCardComponent {
  @Input() studio: any; // Receives studio data
  showModal = signal(false); // Controls modal visibility

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
