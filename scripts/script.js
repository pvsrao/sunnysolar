/* ============================================================
   SUNNY SOLAR — MERGED SCRIPT.JS
   Preserves all existing JS + integrates new lead page features
   ============================================================ */

// ====== SMOOTH SCROLL ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar') || document.querySelector('nav');
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ====== SPLITTING.JS — must run BEFORE GSAP char animations ======
if (typeof Splitting !== 'undefined') Splitting();

// ====== PARTICLES.JS (EXISTING) ======
if (document.getElementById('particles')) {
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
}

// ====== GSAP ANIMATIONS (EXISTING) ======
gsap.registerPlugin(ScrollTrigger);

// Paragraph animations
gsap.utils.toArray(".animated-paragraph").forEach((para, i) => {
    gsap.from(para, {
        scrollTrigger: { trigger: para, start: "top 80%" },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: i * 0.3,
        ease: "back.out(1.7)"
    });
});

// Background animation
gsap.to(".animated-background", {
    scrollTrigger: { trigger: ".about", scrub: true },
    x: "random(-100,100)",
    y: "random(-50,50)",
    duration: 10,
    repeat: -1
});

// Show navigation
gsap.to(".navbar", { duration: 1, top: 0, ease: "power4.out" });

// Stat number counter animation
gsap.utils.toArray('.stat-number').forEach(number => {
    gsap.to(number, {
        scrollTrigger: { trigger: number, start: 'top 80%' },
        innerText: number.getAttribute('data-value'),
        duration: 2,
        snap: { innerText: 1 },
        modifiers: { innerText: value => Math.floor(value) }
    });
});

// About section epic animation
gsap.timeline({
    scrollTrigger: {
        trigger: ".about",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
})
.from(".energy-beam", { width: "0%", duration: 2 })
.to(".energy-beam", { width: "70%", duration: 2 }, "-=2")
.from(".sun-pulse", { scale: 0, duration: 1 }, "-=1.5");

// Floating symbols animation
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

// Char animations — only run if Splitting() produced .char elements
if (document.querySelectorAll('.char').length > 0) {
    gsap.utils.toArray(".char").forEach((char, i) => {
        gsap.from(char, {
            scrollTrigger: { trigger: ".about", start: "top 80%" },
            duration: 0.8,
            delay: i * 0.05,
            rotationX: -90,
            opacity: 0,
            transformOrigin: "bottom",
            ease: "back.out(1.7)"
        });
    });

    gsap.to(".char", {
        y: () => gsap.utils.random(-5, 5),
        rotation: () => gsap.utils.random(-2, 2),
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Word rotator
gsap.utils.toArray('.word-rotator').forEach(rotator => {
    const words = rotator.querySelectorAll('.rotating-word');
    words.forEach((word, index) => {
        gsap.fromTo(word,
            { opacity: 0, y: -20, rotationX: 90 },
            {
                opacity: 1, y: 0, rotationX: 0, duration: 0.8,
                scrollTrigger: { trigger: rotator, start: 'top 80%', once: true },
                delay: index * 0.2
            }
        );
    });
});

// Service card animations — using GSAP directly (not .reveal class)
gsap.utils.toArray('.services-grid .service-card').forEach((card, i) => {
    gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
            opacity: 1, y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// ====== CUSTOM CURSOR (EXISTING — Hero only) ======
const heroSection = document.querySelector('.hero');
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const follower = document.createElement('div');
follower.className = 'cursor-follower';
document.body.appendChild(follower);

cursor.style.display = 'none';
follower.style.display = 'none';

function updateCursor(e) {
    cursor.style.left = `${e.clientX - 10}px`;
    cursor.style.top = `${e.clientY - 10}px`;
    gsap.to(follower, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.3 });
}

document.addEventListener('scroll', () => {
    if (!heroSection) return;
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

// ====== MOBILE MENU TOGGLE (EXISTING) ======
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
        hamburger.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });
    hamburger.classList.add('hamburger--collapse');
}

// Close menu when nav link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('open', 'toggle');
        document.body.style.overflow = 'auto';
    });
});

// ====== SCROLL BACKGROUND (EXISTING) ======
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / document.body.scrollHeight;
    document.body.style.background = `linear-gradient(
      ${45 + scrollPercent * 360}deg,
      hsl(${scrollPercent * 360}, 70%, 8%),
      hsl(${scrollPercent * 360 + 60}, 60%, 10%),
      hsl(${scrollPercent * 360 + 120}, 50%, 12%)
    )`;
});

// ====== NAV ACTIVE LINKS (EXISTING) ======
window.addEventListener('load', () => {
    if (navLinks) navLinks.classList.add('loaded');
});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar') || document.querySelector('nav');
    const navLinkEls = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    if (!navbar) return;
    let navbarHeight = navbar.offsetHeight;

    function activateLink() {
        const scrollPosition = window.scrollY + navbarHeight + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.id;
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navLinkEls.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        gsap.to(link.parentElement, { duration: 0.6, y: -5, ease: "elastic.out(1, 0.5)" });
                    }
                });
            }
        });
        if (window.scrollY < 100) {
            navLinkEls.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-links a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    activateLink();
    window.addEventListener('scroll', () => requestAnimationFrame(activateLink));
    window.addEventListener('resize', () => {
        navbarHeight = navbar.offsetHeight;
        requestAnimationFrame(activateLink);
    });
});

// ====== SCRAMBLE TEXT (EXISTING) ======
document.querySelectorAll('.scramble-text').forEach(el => {
    const originalText = el.textContent;
    const variants = el.dataset.scramble ? el.dataset.scramble.split('|') : [originalText];
    el.addEventListener('mouseenter', () => {
        let counter = 0;
        el.scrambleInterval = setInterval(() => {
            el.textContent = variants[counter % variants.length]
                .split('').sort(() => Math.random() - 0.5).join('');
            counter++;
        }, 100);
    });
    el.addEventListener('mouseleave', () => {
        clearInterval(el.scrambleInterval);
        el.textContent = originalText;
    });
});

// ====== INTERACTIVE GLOW EFFECT ON PARAGRAPHS (EXISTING) ======
document.querySelectorAll('.animated-paragraph').forEach(para => {
    para.addEventListener('mousemove', (e) => {
        const rect = para.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(para, { '--gradient-pos': `${x}px ${y}px`, duration: 0.3 });
    });
});

// ====== BANNER TOUCH EVENTS (EXISTING) ======
const banner = document.querySelector('.scrolling-content') || document.querySelector('.marquee-track');
if (banner) {
    banner.addEventListener('touchstart', () => { banner.style.animationPlayState = 'paused'; });
    banner.addEventListener('touchend', () => { banner.style.animationPlayState = 'running'; });
}

// ====== EMAILJS CONTACT FORM (EXISTING) ======
if (typeof emailjs !== 'undefined') {
    emailjs.init('eN6OEpADI-Fq3j5qA');
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = {
            from_name: document.getElementById('from_name') ? document.getElementById('from_name').value : '',
            from_email: document.getElementById('from_email') ? document.getElementById('from_email').value : '',
            message: document.getElementById('message') ? document.getElementById('message').value : ''
        };
        if (!formData.from_name || !formData.from_email || !formData.message) {
            alert('Please fill out all fields.');
            return;
        }
        if (typeof emailjs !== 'undefined') {
            emailjs.sendForm('service_kthocw9', 'template_jr9b7bc', this)
                .then(() => {
                    alert('Thank you for contacting us! We will get back to you soon.');
                    this.reset();
                })
                .catch((error) => {
                    console.error('Failed:', error);
                    alert('Failed to send message. Please try again.');
                });
        }
    });
}

// ====== YOUTUBE PLAYER (EXISTING) ======
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
if (firstScriptTag) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    if (!document.getElementById('company-video')) return;
    player = new YT.Player('company-video', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    const playPause = document.querySelector('.play-pause');
    if (playPause) {
        playPause.addEventListener('click', () => {
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        });
    }
}

function onPlayerStateChange(event) {
    const playPauseBtn = document.querySelector('.play-pause');
    if (!playPauseBtn) return;
    if (event.data === YT.PlayerState.PLAYING) {
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'inline';
    } else {
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        if (playIcon) playIcon.style.display = 'inline';
        if (pauseIcon) pauseIcon.style.display = 'none';
    }
}

const fullscreenBtn = document.querySelector('.fullscreen');
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
        const iframe = document.querySelector('.company-video');
        if (!document.fullscreenElement) {
            iframe.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
}

const playButton = document.querySelector('.play-button');
if (playButton) {
    const video = document.querySelector('.company-video');
    if (video) {
        playButton.addEventListener('click', () => {
            video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        });
    }
}

// ====== SAVINGS CALCULATOR — India 2025/26 Market Rates ======

function formatINR(n) {
    if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
    if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
    if (n >= 1000)     return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + Math.round(n).toLocaleString('en-IN');
}

/*
  MARKET BENCHMARKS (India 2025-26):
  ─────────────────────────────────────────────────────────────────
  Residential on-grid:  ₹55,000–70,000/kW before subsidy
    → using ₹62,000/kW as midpoint
  Commercial:           ₹45,000–58,000/kW (no subsidy)
    → using ₹52,000/kW
  Industrial/Farm:      ₹35,000–45,000/kW (ground mount, large scale)
    → using ₹40,000/kW

  PM Surya Ghar subsidy (residential only, on-grid):
    ≤2 kW  → ₹30,000/kW  (up to ₹60,000)
    2–3 kW → ₹18,000/kW on the slab above 2 kW  (max additional ₹18,000)
    >3 kW  → no further central subsidy (capped at ₹78,000 total)
    i.e. max central subsidy = ₹78,000

  Generation: India avg 4 peak sun hours/day
    1 kW system → ~4 kWh/day → ~120 units/month
  Space: ~100 sq.ft per kW (rooftop)
  System sizing: derive from BOTH bill-based demand AND roof area,
    then take the lower of the two (practical constraint).

  Payback: typically 4–7 years (residential), 3–5 years (commercial/industrial)
  ─────────────────────────────────────────────────────────────────
*/

function calcSubsidyResidential(kw) {
    // Central subsidy under PM Surya Ghar (MNRE 2024 revised)
    if (kw <= 2) return kw * 30000;
    if (kw <= 3) return (2 * 30000) + ((kw - 2) * 18000);
    return 78000; // capped at ₹78,000
}

function updateCalc() {
    const billSlider  = document.getElementById('bill-slider');
    const areaSlider  = document.getElementById('area-slider');
    const rateSlider  = document.getElementById('rate-slider');
    const stypeSlider = document.getElementById('stype-slider');
    if (!billSlider) return;

    const bill  = parseInt(billSlider.value);
    const area  = parseInt(areaSlider.value);
    const rate  = parseFloat(rateSlider.value);
    const stype = parseInt(stypeSlider.value);
    const types = ['Residential', 'Commercial', 'Industrial'];

    // ── Update slider labels ──────────────────────────────────────
    document.getElementById('bill-val').textContent  = '₹' + bill.toLocaleString('en-IN');
    document.getElementById('area-val').textContent  = area.toLocaleString('en-IN') + ' sq.ft';
    document.getElementById('rate-val').textContent  = '₹' + rate + ' /unit';
    document.getElementById('stype-val').textContent = types[stype - 1];

    // ── Step 1: How many units does the user consume monthly? ─────
    const monthlyUnits = bill / rate;  // e.g. ₹5000 / ₹8 = 625 units

    // ── Step 2: How many kW fit on the roof? ─────────────────────
    // ~100 sq.ft per kW (industry standard, rooftop)
    const maxKwByRoof = area / 100;

    // ── Step 3: How many kW needed to offset the bill? ────────────
    // 1 kW generates ~120 units/month (4 peak sun hrs × 30 days)
    const unitsPerKw     = 4 * 30;   // 120 units / kW / month
    const kwNeededByBill = monthlyUnits / unitsPerKw;

    // ── Step 4: Recommended system = min of demand vs roof, rounded nicely ──
    let systemKw = Math.min(kwNeededByBill, maxKwByRoof);
    systemKw = Math.max(1, systemKw);          // floor at 1 kW

    // Round to nearest 0.5 kW for commercial and realistic sizing
    systemKw = Math.round(systemKw * 2) / 2;

    // Practical cap: residential usually ≤25 kW, commercial ≤1000 kW
    if (stype === 1) systemKw = Math.min(systemKw, 25);
    if (stype === 2) systemKw = Math.min(systemKw, 500);

    // ── Step 5: Cost ──────────────────────────────────────────────
    const costPerKw = stype === 1 ? 62000 : stype === 2 ? 52000 : 40000;
    const grossCost = systemKw * costPerKw;

    const subsidy   = stype === 1 ? calcSubsidyResidential(systemKw) : 0;
    const netCost   = Math.max(grossCost - subsidy, 0);

    // ── Step 6: Monthly generation & savings ─────────────────────
    const monthlyGeneration = systemKw * unitsPerKw;           // units/month
    // Can only offset what is consumed (can't exceed bill)
    const unitsOffset       = Math.min(monthlyGeneration, monthlyUnits);
    const monthlySavings    = Math.round(unitsOffset * rate);

    // ── Step 7: Payback ───────────────────────────────────────────
    const annualSavings = monthlySavings * 12;
    const paybackYears  = annualSavings > 0
        ? (netCost / annualSavings).toFixed(1)
        : '—';

    // ── Step 8: Extra info line ───────────────────────────────────
    let subsNote = '';
    if (stype === 1 && subsidy > 0) {
        subsNote = `After ₹${(subsidy/1000).toFixed(0)}K PM Surya Ghar subsidy`;
    } else if (stype === 2) {
        subsNote = 'Accelerated depreciation (40%) tax benefit applicable';
    } else {
        subsNote = 'Open Access & net metering benefits applicable';
    }

    // ── Render ────────────────────────────────────────────────────
    document.getElementById('res-size').textContent    = systemKw + ' kW';
    document.getElementById('res-cost').textContent    = formatINR(Math.round(netCost));
    document.getElementById('res-savings').textContent = formatINR(monthlySavings) + '/mo';
    document.getElementById('res-payback').textContent = paybackYears + (paybackYears !== '—' ? ' Yrs' : '');

    // Update sub-text notes dynamically if elements exist
    const costSub = document.querySelector('#res-cost')?.closest('.result-card')?.querySelector('.result-sub');
    if (costSub) costSub.textContent = subsNote;

    const sizeSub = document.querySelector('#res-size')?.closest('.result-card')?.querySelector('.result-sub');
    if (sizeSub) {
        const sqft = Math.round(systemKw * 100);
        sizeSub.textContent = `Needs ~${sqft.toLocaleString('en-IN')} sq.ft · ${Math.round(monthlyGeneration).toLocaleString('en-IN')} units/month`;
    }

    const savingsSub = document.querySelector('#res-savings')?.closest('.result-card')?.querySelector('.result-sub');
    if (savingsSub) {
        const pct = monthlyUnits > 0 ? Math.min(100, Math.round((unitsOffset / monthlyUnits) * 100)) : 0;
        savingsSub.textContent = `Offsets ~${pct}% of your electricity bill`;
    }

    const paybackSub = document.querySelector('#res-payback')?.closest('.result-card')?.querySelector('.result-sub');
    if (paybackSub) {
        const freeYears = Math.max(0, 25 - parseFloat(paybackYears || 25)).toFixed(0);
        paybackSub.textContent = `~${freeYears} years of virtually free electricity after ROI`;
    }
}

// Initialize calculator on load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('bill-slider')) updateCalc();
});

// ====== LEAD FORM SUBMISSION (NEW) ======
function submitLead() {
    const name = document.getElementById('fname') ? document.getElementById('fname').value.trim() : '';
    const phone = document.getElementById('fphone') ? document.getElementById('fphone').value.trim() : '';
    const city = document.getElementById('fcity') ? document.getElementById('fcity').value.trim() : '';
    const type = document.getElementById('ftype') ? document.getElementById('ftype').value : '';
    const bill = document.getElementById('fbill') ? document.getElementById('fbill').value : '';

    if (!name || !phone) {
        alert('Please enter your name and mobile number to get a quote.');
        return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }

    const msg = encodeURIComponent(
        `🌞 NEW LEAD - SunnySolar.in\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 City: ${city}\n🏗 Type: ${type}\n💡 Bill: ₹${bill || 'N/A'}\n\nPlease contact ASAP!`
    );
    window.open(`https://wa.me/918500291502?text=${msg}`, '_blank');

    const leadFormEl = document.getElementById('lead-form');
    const successMsgEl = document.getElementById('success-msg');
    if (leadFormEl) leadFormEl.style.display = 'none';
    if (successMsgEl) successMsgEl.style.display = 'block';
}

// ====== SCROLL REVEAL (NEW) ======
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // stop watching once visible
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
    // If already in viewport on load, show immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
    } else {
        revealObserver.observe(el);
    }
});

// ====== VIDEO FALLBACK (EXISTING) ======
setTimeout(() => {
    const fallback = document.getElementById('video-fallback');
    if (fallback && (!window.YT || !window.YT.Player)) {
        fallback.style.display = 'block';
    }
}, 5000);