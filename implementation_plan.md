# Implementation Plan - Community Event App

Build a premium, mobile-first community event application inspired by Eventbrite, based on the Case Study 1 requirements.

## User Review Required

> [!IMPORTANT]
> The app will use `localStorage` for data persistence since no backend is provided. This means data is local to the browser.
> 
> The "Real-time seat counter" will be simulated within the browser session.

## Proposed Changes

### Core Application

#### [NEW] [index.html](file:///c:/Users/ewenc/OneDrive/Desktop/Vibe%20Coding/community%20event/index.html)
- Main entry point.
- Modern, semantic HTML5 structure.
- Navigation for "Discover" (Event Listings) and "Organizer" (Dashboard).
- Mobile-first layout with a bottom navigation bar or clean header.

#### [NEW] [css/styles.css](file:///c:/Users/ewenc/OneDrive/Desktop/Vibe%20Coding/community%20event/css/styles.css)
- Premium Design System:
  - Typography: Inter or Outfit from Google Fonts.
  - Colors: Sleek dark mode or vibrant light mode (using HSL).
  - Components: Glassmorphism for cards, smooth transitions, and micro-animations.
  - Responsive layout (Mobile-first).

#### [MODIFY] [js/app.js](file:///c:/Users/ewenc/OneDrive/Desktop/Vibe%20Coding/community%20event/js/app.js)
- Update `handleRSVP` to trigger a registration modal.
- Add `submitRSVP` function to save attendee data (Name, Email, Mobile).
- Update `renderDashboard` to show the list of captured attendee details.

#### [MODIFY] [index.html](file:///c:/Users/ewenc/OneDrive/Desktop/Vibe%20Coding/community%20event/index.html)
- Add a modal overlay for collecting attendee information.
- Update dashboard layout to accommodate attendee lists.

#### [MODIFY] [css/styles.css](file:///c:/Users/ewenc/OneDrive/Desktop/Vibe%20Coding/community%20event/css/styles.css)
- Add styles for the registration modal and form inputs.
- Add styles for the attendee list items in the dashboard.

## Features to Implement
1. **Attendee Data Collection**: A sleek modal form to capture Name, Email, and Mobile when joining.
2. **Dashboard Attendee List**: A detailed view for organizers to see who signed up for each event.
3. **RSVP System Enhancement**: Check for existing RSVP and allow "leaving" without re-entering data.


## Verification Plan

### Automated Tests
- I will use the browser subagent to verify the "Join Event" flow and capacity constraints.

### Manual Verification
- Check responsiveness on different viewport sizes.
- Verify persistence by refreshing the page after RSVPing.
