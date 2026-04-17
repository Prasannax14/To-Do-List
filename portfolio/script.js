// Preloader Logic (Terminal Typing Effect)
const preloader = document.getElementById('intro-preloader');
const typingText = document.getElementById('typing-text');
const mainContent = document.getElementById('main-content');

const nameToType = "prasanna..";
let typeIndex = 0;

function startTyping() {
    if (typeIndex < nameToType.length) {
        typingText.textContent += nameToType.charAt(typeIndex);
        typeIndex++;
        
        // Randomize typing speed slightly for organic feel
        const typingSpeed = Math.random() * 100 + 100; 
        setTimeout(startTyping, typingSpeed);
    } else {
        // Finished typing
        setTimeout(() => {
            preloader.classList.add('loaded');
            window.scrollTo(0, 0); // Force scroll to top exclusively
            document.body.style.overflowY = 'auto';
            setTimeout(() => {
                mainContent.classList.add('visible');
                triggerReveals();
            }, 300); // Trigger reveals after panel is gone
        }, 1000); // Pause briefly on the resolved name before snapping out
    }
}

// Start immediately
startTyping();



// Intersection Observer for Smooth Scrolling Reveals
function triggerReveals() {
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// 3D Hover Distortion Effect (Interactive Neon Hover)
const tiltCards = document.querySelectorAll('.interactive-hover');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none'; // remove transition for smooth tracking
        
        // Dynamic border highlighting corresponding to mouse position without neon glow
        card.style.borderColor = `rgba(255, 255, 255, 0.3)`;
        card.style.boxShadow = `0 ${y / 5}px 30px rgba(0,0,0,0.8)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease';
        card.style.borderColor = `var(--glass-border)`; // Back to default 
        card.style.boxShadow = `0 20px 40px rgba(0,0,0,0.5)`;
    });
});

// ScrollSpy Logic for Navbar Highlighting
const sections = document.querySelectorAll('section');
const navBtns = document.querySelectorAll('.nav-btn');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href') === `#${current}`) {
            btn.classList.add('active');
        }
    });
});
