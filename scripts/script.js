// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Form submission handling
//   const form = document.querySelector('form');
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert('Thank you for contacting us! We will get back to you soon.');
//     form.reset();
//   });

  // Initialize Particles.js

particlesJS('particles', {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ["#FFD700", "#FFA500", "#FF8C00", "#FF4500"] },
        shape: {
            type: ["circle", "triangle"],
            polygon: { nb_sides: 5 },
            image: { src: "", width: 100, height: 100 }
        },
        opacity: { value: 0.7, random: true },
        size: { value: 3, random: true, anim: { enable: true, speed: 4, size_min: 1 } },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#FFA500",
            opacity: 0.4,
            width: 2
        },
        move: {
            enable: true,
            speed: 4,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "repulse" },
            resize: true
        },
        modes: {
            grab: { distance: 200, line_linked: { opacity: 1 } },
            repulse: { distance: 200, duration: 0.4 }
        }
    },
    retina_detect: true
});


// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate on Scroll
// gsap.utils.toArray('.service-card').forEach((card, i) => {
//     gsap.from(card, {
//         scrollTrigger: {
//             trigger: card,
//             start: 'top 80%'
//         },
//         opacity: 0,
//         y: 100,
//         duration: 1,
//         delay: i * 0.2,
//         ease: 'power4.out'
//     });
// });

// Custom Cursor Logic
// const cursor = document.querySelector('.cursor');
// const follower = document.querySelector('.cursor-follower');

// document.addEventListener('mousemove', (e) => {
//     gsap.to(cursor, {
//         x: e.clientX - 10,
//         y: e.clientY - 10,
//         duration: 0.5
//     });
    
//     gsap.to(follower, {
//         x: e.clientX - 4,
//         y: e.clientY - 4,
//         duration: 0.2
//     });
// });
// Custom Cursor Logic (Hero Only) - REPLACE OLD CODE WITH THIS
const heroSection = document.querySelector('.hero');
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const follower = document.createElement('div');
follower.className = 'cursor-follower';
document.body.appendChild(follower);

// Initial hide
cursor.style.display = 'none';
follower.style.display = 'none';

function updateCursor(e) {
    cursor.style.left = `${e.clientX - 10}px`;
    cursor.style.top = `${e.clientY - 10}px`;
    gsap.to(follower, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.3
    });
}

// Enable cursor only in hero section
document.addEventListener('scroll', () => {
    const heroRect = heroSection.getBoundingClientRect();
    const isInHero = heroRect.top <= 0 && heroRect.bottom >= window.innerHeight;
    
    cursor.style.display = isInHero ? 'block' : 'none';
    follower.style.display = isInHero ? 'block' : 'none';
    
    if (isInHero) {
        document.addEventListener('mousemove', updateCursor);
    } else {
        document.removeEventListener('mousemove', updateCursor);
    }
});

// Keep hover effects but add hero section check
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor.style.display === 'block') {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(2)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursor.style.display === 'block') {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
    hamburger.classList.toggle('open'); // Add this class for animation

      // Add body overflow toggle
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});
hamburger.classList.add('hamburger--collapse');

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic
});
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / document.body.scrollHeight;
    document.body.style.background = `linear-gradient(
      ${45 + scrollPercent * 360}deg,
      hsl(${scrollPercent * 360}, 70%, 50%),
      hsl(${scrollPercent * 360 + 120}, 70%, 50%),
      hsl(${scrollPercent * 360 + 240}, 70%, 50%)
    )`;
  });

  gsap.utils.toArray('.stat-number').forEach(number => {
    gsap.to(number, {
      scrollTrigger: {
        trigger: number,
        start: 'top 80%'
      },
      innerText: number.getAttribute('data-value'),
      duration: 2,
      snap: { innerText: 1 },
      modifiers: {
        innerText: value => Math.floor(value)
      }
    });
  });

// Animation Code
gsap.registerPlugin(ScrollTrigger);

// Text Reveal Animation
// gsap.to(".reveal-text", {
//     scrollTrigger: {
//       trigger: ".about",
//       start: "top 80%",
//       end: "bottom 20%",
//       toggleActions: "play none none none", // Only play once
//       markers: false // Set to true for debugging
//     },
//     opacity: 1,
//     y: 0,
//     duration: 1.5,
//     ease: "power4.out"
//   });

// Paragraph Animations
gsap.utils.toArray(".animated-paragraph").forEach((para, i) => {
  gsap.from(para, {
    scrollTrigger: {
      trigger: para,
      start: "top 80%"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    delay: i * 0.3,
    ease: "back.out(1.7)"
  });
});

// Background Animation
gsap.to(".animated-background", {
  scrollTrigger: {
    trigger: ".about",
    scrub: true
  },
  x: "random(-100,100)",
  y: "random(-50,50)",
  duration: 10,
  repeat: -1
});
// Show navigation
gsap.to(".navbar", {
    duration: 1,
    top: 0,
    ease: "power4.out"
});
window.addEventListener('load', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.add('loaded');
  });
  
  // Active link animation on scroll
  document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    if (!navbar) {
        console.error('Navbar element not found!');
        return;
    }
  
    let navbarHeight = navbar.offsetHeight;
  
    function activateLink() {
        const scrollPosition = window.scrollY + navbarHeight + 100;
  
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.id;
  
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        gsap.to(link.parentElement, {
                            duration: 0.6,
                            y: -5,
                            ease: "elastic.out(1, 0.5)"
                        });
                    }
                });
            }
        });
  
        // Handle home section
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.nav-links a[href="#home"]').classList.add('active');
        }
    }
  
    // Initialize
    activateLink();
  
    // Event listeners
    window.addEventListener('scroll', () => requestAnimationFrame(activateLink));
    window.addEventListener('resize', () => {
        navbarHeight = navbar.offsetHeight;
        requestAnimationFrame(activateLink);
    });
  
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
  });

// Epic About Section Animations
gsap.timeline({
    scrollTrigger: {
        trigger: ".about",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
})
.from(".energy-beam", {
    width: "0%",
    width: "70%",
    duration: 2
})
.from(".sun-pulse", {
    scale: 0,
    duration: 1
}, "-=1.5")
// .to(".reveal-text", {
//     opacity: 1,
//     y: 0,
//     duration: 1.5,
//     ease: "power4.out"
// }, "-=1")

// Floating Symbols Animation
gsap.utils.toArray(".floating-symbols span").forEach((symbol, i) => {
    gsap.set(symbol, {
        x: gsap.utils.random(-200, 200),
        y: gsap.utils.random(-100, 100)
    });
    
    gsap.to(symbol, {
        duration: gsap.utils.random(3, 6),
        x: "+=random(-50,50)",
        y: "+=random(-30,30)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        opacity: gsap.utils.random(0.6, 1)
    });
});

// Text Gradient Flow
// gsap.to(".reveal-text", {
//     backgroundPosition: "200% 50%",
//     duration: 8,
//     repeat: -1,
//     ease: "linear"
// });

// Interactive Glow Effect
document.querySelectorAll('.animated-paragraph').forEach(para => {
    para.addEventListener('mousemove', (e) => {
        const rect = para.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(para, {
            '--gradient-pos': `${x}px ${y}px`,
            duration: 0.3
        });
    });
});
// Initialize Splitting.js
Splitting();

// Scramble Text Animation
document.querySelectorAll('.scramble-text').forEach(el => {
    const originalText = el.textContent;
    const variants = el.dataset.scramble.split('|');
    
    el.addEventListener('mouseenter', () => {
        let counter = 0;
        el.scrambleInterval = setInterval(() => {
            el.textContent = variants[counter % variants.length]
                .split('')
                .sort(() => Math.random() - 0.5)
                .join('');
            counter++;
        }, 100);
    });

    el.addEventListener('mouseleave', () => {
        clearInterval(el.scrambleInterval);
        el.textContent = originalText;
    });
});

// GSAP Text Rotation Effects
gsap.utils.toArray(".char").forEach((char, i) => {
    gsap.from(char, {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%"
        },
        duration: 0.8,
        delay: i * 0.05,
        rotationX: -90,
        opacity: 0,
        transformOrigin: "bottom",
        ease: "back.out(1.7)"
    });
});

// Random Rotation Animation
gsap.to(".char", {
    y: () => gsap.utils.random(-5, 5),
    rotation: () => gsap.utils.random(-2, 2),
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});


gsap.utils.toArray('.word-rotator').forEach(rotator => {
    const words = rotator.querySelectorAll('.rotating-word');
    
    words.forEach((word, index) => {
        gsap.fromTo(word,
            { opacity: 0, y: -20, rotationX: 90 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: rotator,
                    start: 'top 80%',
                    once: true
                },
                delay: index * 0.2
            }
        );
    });
});
const video = document.querySelector('.company-video');
const playButton = document.querySelector('.play-button');

// Play/Pause functionality
playButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
    } else {
        video.pause();
        playButton.style.display = 'block';
    }
});

video.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
    } else {
        video.pause();
        playButton.style.display = 'block';
    }
});

// Show play button when video ends
video.addEventListener('ended', () => {
    playButton.style.display = 'block';
});

// Keyboard accessibility
video.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        if (video.paused) {
            video.play();
            playButton.style.display = 'none';
        } else {
            video.pause();
            playButton.style.display = 'block';
        }
    }
});
video.addEventListener('waiting', () => {
    video.parentElement.classList.add('loading');
});

video.addEventListener('canplay', () => {
    video.parentElement.classList.remove('loading');
});

const playPauseBtn = document.querySelector('.play-pause');
const timeline = document.querySelector('.timeline');
const progressBar = document.querySelector('.progress-bar');
const volumeControl = document.querySelector('.volume-control');
const volumeSlider = document.querySelector('.volume-slider');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.querySelector('.play-icon').style.display = 'none';
        playPauseBtn.querySelector('.pause-icon').style.display = 'inline';
    } else {
        video.pause();
        playPauseBtn.querySelector('.play-icon').style.display = 'inline';
        playPauseBtn.querySelector('.pause-icon').style.display = 'none';
    }
});

// Timeline
video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    timeline.value = percent;
    progressBar.style.width = `${percent}%`;
});

timeline.addEventListener('input', () => {
    const time = (timeline.value / 100) * video.duration;
    video.currentTime = time;
});

// Volume
volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
    if (video.volume > 0) {
        volumeControl.querySelector('.volume-icon').style.display = 'inline';
        volumeControl.querySelector('.mute-icon').style.display = 'none';
    }
});

volumeControl.addEventListener('click', () => {
    if (video.volume > 0) {
        video.volume = 0;
        volumeSlider.value = 0;
        volumeControl.querySelector('.volume-icon').style.display = 'none';
        volumeControl.querySelector('.mute-icon').style.display = 'inline';
    } else {
        video.volume = 1;
        volumeSlider.value = 1;
        volumeControl.querySelector('.volume-icon').style.display = 'inline';
        volumeControl.querySelector('.mute-icon').style.display = 'none';
    }
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.parentElement.requestFullscreen();
        fullscreenBtn.querySelector('.expand-icon').style.display = 'none';
        fullscreenBtn.querySelector('.compress-icon').style.display = 'inline';
    } else {
        document.exitFullscreen();
        fullscreenBtn.querySelector('.expand-icon').style.display = 'inline';
        fullscreenBtn.querySelector('.compress-icon').style.display = 'none';
    }
});

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Space':
            if (video.paused) video.play();
            else video.pause();
            break;
        case 'ArrowRight':
            video.currentTime += 5;
            break;
        case 'ArrowLeft':
            video.currentTime -= 5;
            break;
        case 'ArrowUp':
            video.volume = Math.min(video.volume + 0.1, 1);
            volumeSlider.value = video.volume;
            break;
        case 'ArrowDown':
            video.volume = Math.max(video.volume - 0.1, 0);
            volumeSlider.value = video.volume;
            break;
        case 'KeyF':
            if (!document.fullscreenElement) {
                video.parentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
            break;
    }
});
let isPaused = false;
const banner = document.querySelector('.scrolling-content');

// Pause on tap
banner.addEventListener('touchstart', () => {
    isPaused = true;
    banner.style.animationPlayState = 'paused';
});

// Resume on release
banner.addEventListener('touchend', () => {
    isPaused = false;
    banner.style.animationPlayState = 'running';
});
function validateForm(formData) {
    if (!formData.from_name || !formData.from_email || !formData.message) {
        alert('Please fill out all fields.');
        return false;
    }
    return true;
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        from_name: document.getElementById('from_name').value,
        from_email: document.getElementById('from_email').value,
        message: document.getElementById('message').value
    };

    if (!validateForm(formData)) return;

    // Proceed with EmailJS
});
// emailjs.init('KxzYjEVsNW-zl3mGm'); // Replace with your EmailJS user ID

//     document.getElementById('contactForm').addEventListener('submit', function(e) {
//       e.preventDefault();
      
//       emailjs.sendForm('service_7qdq20w', 'template_6oqyih9', this)
//         .then(() => {
//           document.getElementById('message').innerHTML = 'Message sent successfully!';
//           document.getElementById('contactForm').reset();
//         })
//         .catch(() => {
//           document.getElementById('message').innerHTML = 'Failed to send message. Please try again.';
//         });
//     });

    emailjs.init('eN6OEpADI-Fq3j5qA');
    
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
    //   const formData = {
    //                  from_name: document.getElementById('from_name').value,
    //                  from_email: document.getElementById('from_email').value,
    //                  message: document.getElementById('message').value
    //             };
      emailjs.sendForm('service_kthocw9', 'template_jr9b7bc', this)
        .then(() => {
          alert('Thank you for contacting us! We will get back to you soon.');
          this.reset();
        })
        .catch((error) => {
            console.error('Failed:', error);
            alert('Failed to send message. Please try again.');
          });
    });
    
        //const form = document.getElementById('contact-form');
    
        // if (form) {
        //     form.addEventListener('submit', function (e) {
        //         e.preventDefault();
    
        //         const formData = {
        //             from_name: document.getElementById('from_name').value,
        //             from_email: document.getElementById('from_email').value,
        //             message: document.getElementById('message').value
        //         };
    
        //         emailjs.send('service_kthocw9', 'template_jr9b7bc', formData)
        //             .then(() => alert('Message sent successfully!'))
        //             .catch(() => alert('Failed to send message. Please try again.'));
        //     });
        // } else {
        //     console.error('Contact form not found!');
        // }
    
