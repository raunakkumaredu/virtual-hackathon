// Particle.js Background
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: '#00ffea' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#00ffea', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 4, direction: 'none', random: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    themeBtn.textContent = isLightMode ? 'Dark Mode' : 'Light Mode';
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.getElementById('theme-toggle').textContent = 'Dark Mode';
    }
});

// Countdown Timer
function startCountdown() {
    const countdownDate = new Date('May 1, 2025 00:00:00').getTime();
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const timerElement = document.getElementById('countdown-timer');
        if (timerElement) {
            timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        if (distance < 0) {
            clearInterval(timer);
            if (timerElement) {
                timerElement.textContent = 'Hackathon Started!';
            }
        }
    }, 1000);
}

// Team Formation Modal
function openTeamModal() {
    const modal = document.getElementById('team-modal');
    if (modal) {
        modal.style.display = 'flex';
        animateModal(modal);
    }
}

function closeTeamModal() {
    const modal = document.getElementById('team-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('team-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const teamName = document.getElementById('team-name').value;
    const members = document.getElementById('team-members').value;
    const hackathon = document.getElementById('hackathon-select').value;

    if (teamName && members && hackathon) {
        const teamsList = document.getElementById('teams');
        const li = document.createElement('li');
        li.textContent = `${teamName} - ${hackathon}`;
        teamsList.appendChild(li);
        showNotification(`Team "${teamName}" created for ${hackathon}!`);
        closeTeamModal();
        e.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Hackathon Registration
function registerHackathon(hackathonName) {
    const modal = document.getElementById('hackathon-modal');
    const nameElement = document.getElementById('hackathon-name');
    if (modal && nameElement) {
        nameElement.textContent = `Register for: ${hackathonName}`;
        modal.style.display = 'flex';
        animateModal(modal);
        localStorage.setItem('pendingHackathon', hackathonName);
    }
}

function closeHackathonModal() {
    const modal = document.getElementById('hackathon-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function confirmRegistration() {
    const hackathonName = localStorage.getItem('pendingHackathon');
    if (hackathonName) {
        showNotification(`Registered for ${hackathonName}!`);
        const hackathonsList = document.getElementById('upcoming-hackathons');
        if (hackathonsList) {
            const li = document.createElement('li');
            li.textContent = `${hackathonName} - Registered`;
            hackathonsList.appendChild(li);
        }
        closeHackathonModal();
        localStorage.removeItem('pendingHackathon');
    }
}

// Tournament Registration
function openTournamentModal(tournamentName) {
    const modal = document.getElementById('tournament-modal');
    const nameElement = document.getElementById('tournament-name');
    if (modal && nameElement) {
        nameElement.textContent = `Join: ${tournamentName}`;
        modal.style.display = 'flex';
        animateModal(modal);
        localStorage.setItem('pendingTournament', tournamentName);
    }
}

function closeTournamentModal() {
    const modal = document.getElementById('tournament-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('tournament-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const teamName = document.getElementById('tournament-team').value;
    const tournamentName = localStorage.getItem('pendingTournament');

    if (teamName && tournamentName) {
        showNotification(`Team "${teamName}" joined ${tournamentName}!`);
        const teamsList = document.getElementById('teams');
        if (teamsList) {
            const li = document.createElement('li');
            li.textContent = `${teamName} - ${tournamentName}`;
            teamsList.appendChild(li);
        }
        closeTournamentModal();
        e.target.reset();
        localStorage.removeItem('pendingTournament');
    } else {
        alert('Please fill in all fields.');
    }
});

// Edit Profile Modal
function openEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    if (modal) {
        modal.style.display = 'flex';
        animateModal(modal);
    }
}

function closeEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('edit-profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const skills = document.getElementById('profile-skills').value;

    document.getElementById('profile-name-display').textContent = name;
    document.getElementById('profile-email-display').textContent = email;
    document.getElementById('profile-skills-display').textContent = skills;

    showNotification('Profile updated successfully!');
    closeEditProfileModal();
});

// Login and Signup
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        showNotification('Login successful!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (name && email && password) {
        showNotification('Sign up successful!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Please fill in all fields.');
    }
});

// Contact Form
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (name && email && message) {
        showNotification('Message sent successfully!');
        e.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Hackathon Search and Filter
document.getElementById('search-hackathons')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.hackathon-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
        animateCard(card);
    });
});

document.getElementById('theme-filter')?.addEventListener('change', (e) => {
    const theme = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.hackathon-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = theme === '' || title.includes(theme) ? 'block' : 'none';
        animateCard(card);
    });
});

// Performance Chart
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('performance-chart')?.getContext('2d');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Performance Score',
                    data: [200, 400, 600, 800, 1000],
                    borderColor: '#00ffea',
                    backgroundColor: 'rgba(0, 255, 234, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    }
});

// Leaderboard Animation
function animateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    if (leaderboard) {
        const colleges = [
            { name: 'Tech University', points: 1500 },
            { name: 'Innovation College', points: 1200 },
            { name: 'Code Academy', points: 900 }
        ];
        colleges.forEach((college, index) => {
            setTimeout(() => {
                const li = document.createElement('li');
                li.textContent = `${college.name} - ${college.points} points`;
                leaderboard.appendChild(li);
                li.style.animation = `slideIn 0.5s ease ${index * 0.2}s forwards`;
            }, index * 200);
        });
    }
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

// Modal Animation
function animateModal(modal) {
    const content = modal.querySelector('.modal-content');
    content.style.animation = 'slideIn 0.5s ease';
}

// Card Animation
function animateCard(card) {
    card.style.animation = 'fadeIn 0.5s ease';
}

// Ticker Animation
function updateTicker() {
    const ticker = document.getElementById('hackathon-ticker');
    if (ticker) {
        const messages = [
            'Live: AI Innovation Challenge - 120 participants!',
            'Green Tech Hackathon - Register now!',
            'National Coding League - Join today!'
        ];
        let index = 0;
        setInterval(() => {
            ticker.textContent = messages[index];
            index = (index + 1) % messages.length;
        }, 5000);
    }
}

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .hackathon-card, .tournament-card, .profile-card, .contact-card, .auth-card, .dashboard-card, .trophy-card');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.animation = 'fadeIn 0.5s ease';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    animateLeaderboard();
    updateTicker();
    animateOnScroll();
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.5
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Dynamic Background Animation
function animateBackground() {
    const body = document.body;
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        if (!body.classList.contains('light-mode')) {
            body.style.background = `linear-gradient(135deg, hsl(${hue}, 50%, 10%), hsl(${(hue + 60) % 360}, 50%, 20%))`;
        }
    }, 100);
}

// Hover Effects for Buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
        btn.style.boxShadow = '0 5px 20px rgba(0, 255, 234, 0.6)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = 'none';
    });
});

// Real-Time Notifications
function simulateNotifications() {
    const messages = [
        'New hackathon announced!',
        'Your team submission was approved!',
        'Check out the latest leaderboard!'
    ];
    setInterval(() => {
        const notifications = document.getElementById('notifications');
        if (notifications) {
            const li = document.createElement('li');
            li.textContent = messages[Math.floor(Math.random() * messages.length)];
            notifications.appendChild(li);
            li.style.animation = 'slideIn 0.5s ease';
            setTimeout(() => li.remove(), 5000);
        }
    }, 10000);
}

simulateNotifications();




// Hackathon Registration
function registerHackathon(hackathonName) {
    const modal = document.getElementById('hackathon-modal');
    const nameElement = document.getElementById('hackathon-name');
    if (modal && nameElement) {
        nameElement.textContent = `Register for: ${hackathonName}`;
        modal.style.display = 'flex';
        // Animate modal opening
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.5s ease';
        localStorage.setItem('pendingHackathon', hackathonName);
    } else {
        console.error('Hackathon modal or name element not found');
    }
}

function closeHackathonModal() {
    const modal = document.getElementById('hackathon-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function confirmRegistration() {
    const hackathonName = localStorage.getItem('pendingHackathon');
    if (hackathonName) {
        // Simulate registration
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `Successfully registered for ${hackathonName}!`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);

        // Update dashboard
        const hackathonsList = document.getElementById('upcoming-hackathons');
        if (hackathonsList) {
            const li = document.createElement('li');
            li.textContent = `${hackathonName} - Registered`;
            hackathonsList.appendChild(li);
        }

        closeHackathonModal();
        localStorage.removeItem('pendingHackathon');
    }
}

// Ensure modal close button works
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) modal.style.display = 'none';
    });
});