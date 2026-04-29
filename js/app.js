// State Management
let events = JSON.parse(localStorage.getItem('community_events')) || [
    {
        id: 1,
        title: "Youth Tech Summit 2026",
        date: "May 15, 2026",
        time: "10:00 AM",
        location: "Community Hub A",
        capacity: 50,
        joined: 42,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
        isRSVP: false,
        attendees: []
    },
    {
        id: 2,
        title: "Urban Gardening Workshop",
        date: "May 18, 2026",
        time: "2:00 PM",
        location: "Green Roof Garden",
        capacity: 15,
        joined: 12,
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop",
        isRSVP: false,
        attendees: []
    },
    {
        id: 3,
        title: "Coding for Creatives",
        date: "May 20, 2026",
        time: "6:30 PM",
        location: "Innovation Lab",
        capacity: 30,
        joined: 30,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
        isRSVP: false,
        attendees: []
    }
];

// Ensure attendees array exists for legacy data
events.forEach(e => {
    if (!e.attendees) e.attendees = [];
});

let activeEventId = null;
let isOrganizerLoggedIn = false;

// Initialize State
function saveState() {
    localStorage.setItem('community_events', JSON.stringify(events));
}

// UI Elements
const eventGrid = document.getElementById('event-grid');
const discoverView = document.getElementById('discover-view');
const dashboardView = document.getElementById('dashboard-view');
const loginView = document.getElementById('login-view');
const navItems = document.querySelectorAll('.nav-item');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const registrationModal = document.getElementById('registration-modal');
const rsvpForm = document.getElementById('rsvp-form');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Navigation
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        
        if (view === 'dashboard' && !isOrganizerLoggedIn) {
            switchView('login');
        } else {
            switchView(view);
        }

        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

function switchView(view) {
    discoverView.classList.remove('active');
    dashboardView.classList.remove('active');
    loginView.classList.remove('active');

    if (view === 'discover') {
        discoverView.classList.add('active');
        renderEvents();
    } else if (view === 'dashboard') {
        dashboardView.classList.add('active');
        renderDashboard();
    } else if (view === 'login') {
        loginView.classList.add('active');
    }
}

// Login Logic
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('organizer-pass').value;

    if (password === '123') {
        isOrganizerLoggedIn = true;
        loginError.style.display = 'none';
        switchView('dashboard');
        showToast("Access Granted. Welcome back!");
    } else {
        loginError.style.display = 'block';
    }
});

// Modal Logic
function openModal(id) {
    activeEventId = id;
    registrationModal.classList.add('active');
}

function closeModal() {
    registrationModal.classList.remove('active');
    rsvpForm.reset();
    activeEventId = null;
}

// RSVP Form Submission
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const mobile = document.getElementById('user-mobile').value;
    
    const event = events.find(ev => ev.id === activeEventId);
    if (event) {
        event.joined++;
        event.isRSVP = true;
        event.attendees.push({ name, email, mobile });
        
        showToast(`Success! You're going to ${event.title}`);
        saveState();
        renderEvents();
        closeModal();
    }
});

// Render Events
function renderEvents() {
    eventGrid.innerHTML = '';
    events.forEach(event => {
        const isFull = event.joined >= event.capacity;
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <div class="event-date">${event.date} • ${event.time}</div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-info">
                    <div class="event-info-item">📍 ${event.location}</div>
                </div>
                <div class="event-footer">
                    <div class="seat-counter">
                        <span class="seat-count ${isFull ? 'full' : ''}">${event.capacity - event.joined}</span> seats left
                    </div>
                    <button class="btn ${event.isRSVP ? 'btn-joined' : (isFull ? 'btn-full' : 'btn-primary')}" 
                            onclick="handleRSVP(${event.id})" 
                            ${isFull && !event.isRSVP ? 'disabled' : ''}>
                        ${event.isRSVP ? '✓ Joined' : (isFull ? 'Sold Out' : 'Join Event')}
                    </button>
                </div>
            </div>
        `;
        eventGrid.appendChild(card);
    });
}

// RSVP Logic
function handleRSVP(id) {
    const event = events.find(e => e.id === id);
    if (!event) return;

    if (event.isRSVP) {
        event.joined--;
        event.isRSVP = false;
        showToast("You've left the event.");
        saveState();
        renderEvents();
    } else {
        if (event.joined < event.capacity) {
            openModal(id);
        } else {
            showToast("Sorry, this event is full!", true);
        }
    }
}

// Dashboard Logic
function renderDashboard() {
    const totalRSVPs = events.filter(e => e.isRSVP).length;
    const totalEvents = events.length;

    document.getElementById('stat-total-rsvps').textContent = totalRSVPs;
    document.getElementById('stat-active-events').textContent = totalEvents;
    
    const attendeeSummary = document.getElementById('attendee-summary');
    attendeeSummary.innerHTML = '';
    
    events.forEach(event => {
        const item = document.createElement('div');
        item.className = 'stat-card';
        item.style.marginBottom = '20px';
        
        let attendeesHTML = '';
        if (event.attendees && event.attendees.length > 0) {
            attendeesHTML = `
                <div class="attendee-list">
                    <p style="font-weight: 600; color: var(--primary); margin-top: 10px;">Registered Attendees:</p>
                    ${event.attendees.map(a => `
                        <div class="attendee-item">
                            <div class="attendee-name">${a.name}</div>
                            <div class="attendee-meta">📧 ${a.email} | 📱 ${a.mobile}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            attendeesHTML = `<p style="margin-top: 10px; font-size: 0.8rem; color: var(--text-muted);">No attendees captured yet.</p>`;
        }

        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center">
                <div>
                    <h3 style="margin-bottom:5px">${event.title}</h3>
                    <p style="font-size:0.8rem">${event.joined} / ${event.capacity} Attendees</p>
                </div>
                <div class="seat-count ${event.joined >= event.capacity ? 'full' : ''}" style="font-size:1.5rem">
                    ${Math.round((event.joined / event.capacity) * 100)}%
                </div>
            </div>
            <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:10px; margin-top:10px; overflow:hidden">
                <div style="width:${(event.joined / event.capacity) * 100}%; height:100%; background:var(--primary); transition:width 0.5s ease"></div>
            </div>
            ${attendeesHTML}
        `;
        attendeeSummary.appendChild(item);
    });
}

// Toast System
function showToast(message, isError = false) {
    toastMessage.textContent = message;
    toast.style.borderLeftColor = isError ? 'var(--danger)' : 'var(--primary)';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
});
