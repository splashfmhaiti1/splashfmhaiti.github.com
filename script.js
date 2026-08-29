// Player functionality
let isPlaying = false;
let currentTime = 0;
let duration = 180; // 3 minutes simulation
let volume = 1;

// Sample playlist
const playlist = [
    { song: "Tropical Vibes", artist: "Haitian Beats" },
    { song: "Caribbean Dreams", artist: "Island Groove" },
    { song: "Port-au-Prince Nights", artist: "Urban Sounds" },
    { song: "Rhythms of Haiti", artist: "Local Artists" }
];

let currentTrackIndex = 0;

// Toggle play/pause
function togglePlay() {
    const playBtn = document.getElementById('play-btn');
    const streamStatus = document.getElementById('stream-status');
    
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        streamStatus.textContent = '🔴 EN DIRECT - Diffusion en cours';
        streamStatus.style.color = '#ff4444';
        startPlayback();
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        streamStatus.textContent = 'Lecture en pause';
        streamStatus.style.color = '#666';
        stopPlayback();
    }
}

function startPlayback() {
    const progressBar = document.getElementById('progress');
    const playInterval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(playInterval);
            return;
        }
        
        currentTime += 0.5;
        if (currentTime > duration) {
            currentTime = 0;
            switchTrack();
        }
        
        const percentage = (currentTime / duration) * 100;
        progressBar.style.width = percentage + '%';
    }, 500);
}

function stopPlayback() {
    const progressBar = document.getElementById('progress');
    progressBar.style.width = '0%';
    currentTime = 0;
}

// Switch to next track
function switchTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    updateNowPlaying();
}

// Update now playing display
function updateNowPlaying() {
    const track = playlist[currentTrackIndex];
    document.getElementById('current-song').textContent = track.song;
    document.getElementById('current-artist').textContent = track.artist;
}

// Toggle volume
function toggleVolume() {
    const volumeBtn = document.querySelector('.control-btn:last-child');
    if (volume > 0) {
        volume = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        volume = 1;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

// Update listener count dynamically
function updateListenerCount() {
    const minListeners = 1500;
    const maxListeners = 5000;
    const randomListeners = Math.floor(Math.random() * (maxListeners - minListeners + 1) + minListeners);
    document.getElementById('listener-count').textContent = randomListeners.toLocaleString();
}

// Progress bar click
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            if (isPlaying) {
                const rect = progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                currentTime = percent * duration;
                document.getElementById('progress').style.width = (percent * 100) + '%';
            }
        });
    }

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Update listener count every 5 seconds
    updateListenerCount();
    setInterval(updateListenerCount, 5000);

    // Initialize now playing
    updateNowPlaying();

    // Smooth scroll for mobile
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
});

// Form submission
function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    console.log('Message envoyé:', {
        nom: form.elements[0].value,
        email: form.elements[1].value,
        message: form.elements[2].value
    });
    
    // Show success message
    alert('Merci! Votre message a été envoyé avec succès. Nous vous répondrons bientôt!');
    form.reset();
}

// Add scrolling animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.stat, .schedule-item, .social-btn');
    elements.forEach(el => observer.observe(el));
});

// Add CSS animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);