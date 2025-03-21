# BookMyStudio

Live Link - https://book-my-studio-iota.vercel.app/

## Description 

A dynamic, user-friendly Studio Booking Application using Angular. The application includes features such as studio search, availability checking and booking functionality. 

### Features
1. Studio List Page:
  a. Create a page that displays a list of studios available for booking.
  b. The list should include essential information for each studio:
    i. Name
    ii. Type (e.g., Recording Studio, Music Studio)
    iii. Location (City, Area, Address)
    iv. Amenities List
    v. Price per hour
    vi. Rating (1-5 stars)
  c. Each studio should have a button to proceed with booking.
2. Search by Place:
  a. Implement a search bar that allows users to filter studios by location (Area).
  b. This search will include an auto-complete feature that shows a reference location list.
  c. The Studi list should dynamically update as the user types in the search bar.
  d. When a user searches for a city or area, only studios in that city/area should be displayed.
3. Search by Radius (10 km):
  a. Implement search by radius that allows users to search for studios by their current location within a given radius. (Example: 10KM, 20KM).
  b. Handle errors gracefully, such as the user denying location access, or when no studios are within the 10 km radius.
4. Studio Availability and Booking:
  a. On clicking booking now button a popup will be open. The form should collect:
    i. Date Picker for selecting a date.
    ii. Time Slot Picker based on the studio’s availability hours.
    iii. User Info (Name, Email).
  b. Availability Check:
    i. When the user selects a time slot, check the availability against the studio's available time slots.
    ii. If the time slot is already booked, display an error message (e.g., "The selected time slot is not available. Please choose another time").
    iii. On successful booking, display a confirmation message with booking details.
    iv. Successfully store booking data in local storage.
5. Booking List Page:
  a. Create a page that displays a list of available bookings.
  b. The list should include essential information for each studio:
    i. User Info Name, Email
    ii. Type (e.g., Recording Studio, Music Studio)
    iii. Location (City/Area)
    iv. Time & Date