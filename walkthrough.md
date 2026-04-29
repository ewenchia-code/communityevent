# Walkthrough - Community Event App

A premium, mobile-first community event application built to solve the "WhatsApp chaos" for youth community gatherings.

## Features Accomplished

### 1. Discover & Join Events
- **Premium UI**: Modern dark theme with glassmorphism and vibrant gradients.
- **Event Listings**: Cards displaying title, date, time, location, and real-time seat availability.
- **Attendee Data Capture**: A sleek modal form captures Name, Email, and Mobile number when a user RSVPs.
- **RSVP Logic**: Fully functional "Join" and "Leave" system that persists in `localStorage`.
- **Capacity Constraints**: Prevents joining if an event is sold out.

### 2. Organizer Dashboard
- **Real-time Stats**: Track total RSVPs and active events.
- **Attendee Management**: Detailed list of registered attendees (Name, Contact Info) for each event.
- **Performance Tracking**: Visual progress bars showing attendee percentage for each event.

### 3. User Experience
- **Responsive Design**: Mobile-first approach with a sleek bottom navigation bar.
- **Animations**: Smooth transitions and hover effects for a premium feel.
- **Toast Notifications**: Instant feedback for user actions.

## Design Details
- **Palette**: Deep Indigo (#6366f1) and Vibrant Purple (#ec4899).
- **Typography**: Outfit (Google Fonts) for a modern look.
- **Interactions**: Glassmorphism cards with subtle hover scaling.

## Verification Results

The app was verified using the browser subagent:
- ✅ 3 events correctly listed.
- ✅ RSVP logic (Join/Leave) works flawlessly.
- ✅ Seat counts update in real-time.
- ✅ "Sold Out" state correctly disables interaction.
- ✅ Dashboard accurately reflects user's RSVP status.
- ✅ Attendee details (Name, Email, Mobile) are captured and displayed in the Dashboard.

![Initial Verification](verify_community_app_1777447310613.webp)

![Attendee Capture Verification](verify_attendee_capture_1777447814899.webp)

## Project Structure
- [index.html](file:///c:/Users/ewenc/OneDrive/Desktop/Vibe%20Coding/community%20event/index.html)
- [css/styles.css](file:///c:/Users/ewenc/OneDrive/Desktop/Vibe%20Coding/community%20event/css/styles.css)
- [js/app.js](file:///c:/Users/ewenc/OneDrive/Desktop/Vibe%20Coding/community%20event/js/app.js)
