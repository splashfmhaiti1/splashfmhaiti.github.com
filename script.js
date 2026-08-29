// Audio Player functionality
let isPlaying = false;
let volume = 1;
const audioPlayer = document.getElementById('audio-player');
const streamUrl = 'https://stream.zeno.fm/gy7q6vnw25zuv';

// Toggle play/pause
function togglePlay() {
    const playBtn = document.getElementById('play-btn');
    const streamStatus = document.getElementById('stream-status');
    
    if (isPlaying) {
        // Stop playing
        audioPlayer.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        streamStatus.textContent = 'Lecture en pause';
        streamStatus.style.color = '#666';
    } else {
        // Start playing
        try {
            // Set the source and play
            audioPlayer.src = streamUrl;
            audioPlayer.play();
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            streamStatus.textContent = '🔴 EN DIRECT - Diffusion en cours';
            streamStatus.style.color = '#ff4444';
            
            // Start visualizer animation
            const visualizerBars = document.querySelectorAll('.bar');
            visualizerBars.forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
        } catch (error) {
            console.error('Erreur lors de la lecture:', error);
            streamStatus.textContent = 'Tentative de connexion...';
            streamStatus.style.color = '#666';
        }
    }
}

// Toggle volume
function toggleVolume() {
    const volumeBtn = document.querySelector('.control-btn:last-child');
    
    if (volume > 0) {
        volume = 0;
        audioPlayer.volume = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        volume = 1;
        audioPlayer.volume = 1;
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

// Audio player event listeners
audioPlayer.addEventListener('play', () => {
    console.log('Audio started playing');
    const visualizerBars = document.querySelectorAll('.bar');
    visualizerBars.forEach(bar => {
        bar.style.animationPlayState = 'running';
    });
});

audioPlayer.addEventListener('pause', () => {
    console.log('Audio paused');
    const visualizerBars = document.querySelectorAll('.bar');
    visualizerBars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });
});

audioPlayer.addEventListener('error', (e) => {
    console.error('Erreur de lecture:', e);
    const streamStatus = document.getElementById('stream-status');
    streamStatus.textContent = 'Erreur de connexion. Vérifiez votre connexion Internet.';
    streamStatus.style.color = '#ff4444';
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
});

audioPlayer.addEventListener('canplay', () => {
    const streamStatus = document.getElementById('stream-status');
    if (isPlaying) {
        streamStatus.textContent = '🔴 EN DIRECT - Diffusion en cours';
        streamStatus.style.color = '#ff4444';
    }
});

audioPlayer.addEventListener('stalled', () => {
    const streamStatus = document.getElementById('stream-status');
    streamStatus.textContent = 'Chargement du flux...';
    streamStatus.style.color = '#0066ff';
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial volume
    audioPlayer.volume = 1;
    audioPlayer.crossOrigin = 'anonymous';

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