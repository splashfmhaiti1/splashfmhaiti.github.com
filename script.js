// Audio Player functionality
let isPlaying = false;
let volume = 1;
const audioPlayer = document.getElementById('audio-player');

// Streaming URLs - Multiple options for reliability
const streamUrls = [
    'https://stream.zeno.fm/gy7q6vnw25zuv.m3u8',  // HLS format
    'https://stream.zeno.fm/gy7q6vnw25zuv'        // Direct MP3
];

let currentStreamIndex = 0;

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
        
        // Stop visualizer
        const visualizerBars = document.querySelectorAll('.bar');
        visualizerBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    } else {
        // Start playing
        streamStatus.textContent = '⏳ Chargement du flux audio...';
        streamStatus.style.color = '#0066ff';
        playBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        currentStreamIndex = 0;
        
        playNextStream();
    }
}

function playNextStream() {
    if (currentStreamIndex >= streamUrls.length) {
        const streamStatus = document.getElementById('stream-status');
        streamStatus.textContent = '❌ Impossible de se connecter. Vérifiez votre connexion Internet.';
        streamStatus.style.color = '#ff4444';
        document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
        return;
    }

    const streamUrl = streamUrls[currentStreamIndex];
    console.log('Tentative de connexion à: ' + streamUrl);
    
    audioPlayer.src = streamUrl;
    audioPlayer.crossOrigin = 'anonymous';
    
    const playPromise = audioPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Lecture commencée');
                isPlaying = true;
                const playBtn = document.getElementById('play-btn');
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                
                const streamStatus = document.getElementById('stream-status');
                streamStatus.textContent = '🔴 EN DIRECT - Diffusion en cours';
                streamStatus.style.color = '#ff4444';
                
                // Start visualizer
                const visualizerBars = document.querySelectorAll('.bar');
                visualizerBars.forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });
                
                currentStreamIndex = 0;
            })
            .catch(error => {
                console.error('Erreur avec le flux: ' + error.message);
                currentStreamIndex++;
                setTimeout(playNextStream, 1000);
            });
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
    isPlaying = true;
});

audioPlayer.addEventListener('pause', () => {
    console.log('Audio paused');
});

audioPlayer.addEventListener('error', (e) => {
    console.error('Erreur audio:', e);
    const streamStatus = document.getElementById('stream-status');
    
    currentStreamIndex++;
    if (currentStreamIndex < streamUrls.length) {
        streamStatus.textContent = '⏳ Tentative ' + (currentStreamIndex + 1) + '...';
        streamStatus.style.color = '#0066ff';
        setTimeout(playNextStream, 500);
    } else {
        streamStatus.textContent = '❌ Erreur de connexion au flux audio';
        streamStatus.style.color = '#ff4444';
        document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    }
});

audioPlayer.addEventListener('stalled', () => {
    const streamStatus = document.getElementById('stream-status');
    streamStatus.textContent = '⏳ Chargement du flux...';
    streamStatus.style.color = '#0066ff';
});

audioPlayer.addEventListener('canplay', () => {
    console.log('Flux audio prêt');
    const streamStatus = document.getElementById('stream-status');
    if (isPlaying) {
        streamStatus.textContent = '🔴 EN DIRECT - Diffusion en cours';
        streamStatus.style.color = '#ff4444';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial volume
    audioPlayer.volume = 1;

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
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .fa-spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);