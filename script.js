// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');
const logo = document.getElementById('logo');
const logoLight = './img/candid-logo-b.PNG';
const logoDark = './img/candid-logo-w.PNG';

// Check for saved theme preference or respect OS preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    htmlElement.classList.remove('light-mode');
    htmlElement.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    logo.src = logoDark; // Set logo to white version
    initParticles('#4f8eff'); // Init with dark mode color
} else {
    logo.src = logoLight; // Set logo to black version
    initParticles('#007bff'); // Init with light mode color
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');
    
    // Update icon and logo
    if (htmlElement.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        logo.src = logoDark; // Switch to white logo
        localStorage.setItem('theme', 'dark');
        updateParticlesColor('#4f8eff'); // Update to dark mode color
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        logo.src = logoLight; // Switch to black logo
        localStorage.setItem('theme', 'light');
        updateParticlesColor('#007bff'); // Update to light mode color
    }
});

// Function to initialize particles
function initParticles(color) {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": color
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": color,
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// Function to update particles color when theme changes
function updateParticlesColor(color) {
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        // Update particle color
        window.pJSDom[0].pJS.particles.array.forEach(p => {
            p.color.value = color;
            p.color.rgb = hexToRgb(color);
        });
        
        // Update line color
        window.pJSDom[0].pJS.particles.line_linked.color = color;
        window.pJSDom[0].pJS.particles.line_linked.color_rgb_line = hexToRgb(color);
    }
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });
    
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Custom cursor
let cursor = document.querySelector('.cursor');
let cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', (e) => {
    cursor.style.cssText = cursor2.style.cssText = 'left:' + e.clientX
    + 'px; top:' + e.clientY + 'px;';
});

// Add staggered animation delay to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.setProperty('--index', index + 1);
    });

    // Fix typewriter animation on small screens
    const handleResize = () => {
        const typewriter = document.querySelector('.typewriter');
        if (window.innerWidth <= 768) {
            typewriter.style.animation = 'fadeIn 1s ease forwards';
            typewriter.style.borderRight = 'none';
            typewriter.style.whiteSpace = 'normal';
        } else {
            typewriter.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
            typewriter.style.borderRight = '3px solid var(--text-color)';
            typewriter.style.whiteSpace = 'nowrap';
        }
    };

    // Run on load and on resize
    handleResize();
    window.addEventListener('resize', handleResize);
});