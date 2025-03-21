<script>
    let { children, data } = $props();
    let loggedInAs = data.data.loggedInAs;
    let loggedIn = data.data.loggedIn;
    import logo from "$lib/assets/LinkTreeLogo-02.png";
    import "./global.css";
    import Navbar from "../Navbar.svelte";

    import { onMount } from "svelte";
    
    // Background particles
    let particles = [];
    let canvas;
    let ctx;
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 120; // Further reduced radius
    let mouseActive = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let animationFrameId;
    let particleCount = 200;
    
    // Define missing variables
    let isScrolling = false;
    let scrollTimeout;
    let fpsCheckInterval;
    let frameCount = 0;
    let lastFrameTime = 0;
    let lowPerformanceMode = false;

    onMount(() => {
        document.title = "FRTree";
        
        // Initialize background particles if supported
        if (typeof window !== 'undefined') {
            canvas = document.getElementById('background-canvas');
            if (canvas) {
                ctx = canvas.getContext('2d');
                
                initCanvas();
                createParticles();
                
                if (!lowPerformanceMode) {
                    animateParticles();
                } else {
                    // For low performance devices, just draw static particles once
                    drawStaticParticles();
                }
                
                // Passive event listeners improve scroll performance
                window.addEventListener('mousemove', handleMouseMove, { passive: true });
                window.addEventListener('scroll', handleScroll, { passive: true });
                canvas.addEventListener('mouseenter', () => mouseActive = true);
                canvas.addEventListener('mouseleave', () => mouseActive = false);
                
                // Clean up all event listeners and timers on unmount
                return () => {
                    window.removeEventListener('mousemove', handleMouseMove);
                    window.removeEventListener('scroll', handleScroll);
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                    }
                    if (fpsCheckInterval) {
                        clearInterval(fpsCheckInterval);
                    }
                    if (scrollTimeout) {
                        clearTimeout(scrollTimeout);
                    }
                };
            }
        }

        // Search bar enhancement
        const searchInputs = document.querySelectorAll('input[type="search"]');
        searchInputs.forEach(input => {
            if (!input.parentElement.classList.contains('custom-search-container')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'custom-search-container';
                
                const underline = document.createElement('div');
                underline.className = 'search-underline';
                
                input.parentNode.insertBefore(wrapper, input);
                wrapper.appendChild(input);
                wrapper.appendChild(underline);
                
                input.classList.add('custom-search-input');
            }
        });
    });

    // Handle scrolling - pause animations during scroll
    function handleScroll() {
        if (!isScrolling) {
            isScrolling = true;
            
            // If we're already in low performance mode, don't bother with animations
            if (!lowPerformanceMode && animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }
        
        // Clear previous timeout
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        // Reset the scroll state after scrolling stops
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            
            // Resume animation if not in low performance mode
            if (!lowPerformanceMode && !animationFrameId) {
                animateParticles();
            }
        }, 200); // Wait 200ms after scroll ends before resuming
    }

    // Detect performance capability and adjust settings accordingly
    function detectPerformance() {
        // Start with performance monitoring
        fpsCheckInterval = setInterval(() => {
            if (frameCount < 25) { // If fewer than 25fps
                if (!lowPerformanceMode) {
                    lowPerformanceMode = true;
                    console.log('Switching to low performance mode');
                    
                    // Cancel animation loop and just draw static particles
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                    
                    createParticles(); // Recreate particles with reduced count
                    drawStaticParticles(); // Draw static particles once
                }
            }
            frameCount = 0;
        }, 1000);
    }

    function handleMouseMove(e) {
        // Skip mouse move handling during scroll for better performance
        if (isScrolling) return;
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseActive = true;
    }

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Use efficient event listener for resize
        const resizeObserver = new ResizeObserver(entries => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // If in low performance mode, just redraw static particles
            if (lowPerformanceMode) {
                createParticles();
                drawStaticParticles();
            } else {
                createParticles();
            }
        });
        
        resizeObserver.observe(document.body);
    }
    
    function createParticles() {
        particles = [];
        // Even further reduced particle count
        particleCount = lowPerformanceMode ? 
            Math.min(30, Math.floor(window.innerWidth / 150)) : // Very few particles in low performance mode
            Math.min(80, Math.floor(window.innerWidth / 50));   // Limited maximum particles
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.2 + 0.3, // Smaller particles
                color: `rgba(0, 195, 255, ${Math.random() * 0.2 + 0.05})`, // More transparent
                baseSpeedX: Math.random() * 0.15 - 0.075, // Even slower
                baseSpeedY: Math.random() * 0.15 - 0.075,
                speedX: Math.random() * 0.15 - 0.075,
                speedY: Math.random() * 0.15 - 0.075
            });
        }
    }
    
    // Draw static particles for low performance mode
    function drawStaticParticles() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        // Draw a few static connections for visuals
        if (particles.length > 10) {
            for (let i = 0; i < Math.min(15, particles.length); i++) {
                const p1 = particles[i];
                const p2 = particles[(i + 5) % particles.length];
                
                const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 195, 255, ${0.05 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        const now = performance.now();
        frameCount++;
        
        // Skip frame if scrolling
        if (isScrolling) {
            animationFrameId = requestAnimationFrame(animateParticles);
            return;
        }
        
        // Lower frame rate for better performance (aim for 30fps in normal mode)
        if (now - lastFrameTime > 33 || !lowPerformanceMode) {
            lastFrameTime = now;
            
            if (!ctx) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw particles with minimal operations
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                // Extremely simplified motion logic
                if (mouseActive) {
                    const dx = mouseX - particle.x;
                    const dy = mouseY - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouseRadius && distance > 5) {
                        const angle = Math.atan2(dy, dx);
                        const force = (mouseRadius - distance) / mouseRadius * 0.7; // Reduced force
                        
                        // Super simplified orbital motion
                        const perpX = Math.cos(angle + Math.PI/2);
                        const perpY = Math.sin(angle + Math.PI/2);
                        
                        particle.speedX = perpX * force * 0.8 + particle.baseSpeedX * (1 - force);
                        particle.speedY = perpY * force * 0.8 + particle.baseSpeedY * (1 - force);
                    } else {
                        particle.speedX = particle.baseSpeedX;
                        particle.speedY = particle.baseSpeedY;
                    }
                } else {
                    particle.speedX = particle.baseSpeedX;
                    particle.speedY = particle.baseSpeedY;
                }
                
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
            });
            
            // Only draw connections for particles near cursor and only if mouse is active
            if (mouseActive) {
                // Extremely limited connections - only close to cursor
                const nearCursorParticles = particles.filter(p => {
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    return Math.sqrt(dx * dx + dy * dy) < mouseRadius;
                }).slice(0, 10); // Only use at most 10 particles
                
                // Draw minimal connections
                nearCursorParticles.forEach((p1, i) => {
                    for (let j = i + 1; j < Math.min(nearCursorParticles.length, i + 3); j++) { // Max 2 connections per particle
                        const p2 = nearCursorParticles[j];
                        const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                        if (distance < 60) { // Very short connections
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(0, 195, 255, ${0.05 * (1 - distance / 60)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                });
            }
        }
        
        animationFrameId = requestAnimationFrame(animateParticles);
    }

    function search(event) {
        if (event.key === "Enter") {
            window.location.href = `/search/${event.target.value}`;
        }
    }
</script>

<canvas id="background-canvas" class="background-effect"></canvas>

<div class="app-container">
    <Navbar loggedIn={loggedIn} loggedInAs={loggedInAs} />

    <div class="children">
        {@render children()}
    </div>
</div>

<style>
    .app-container {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }

    .background-effect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        will-change: transform;
        transform: translateZ(0); /* Force GPU acceleration */
        backface-visibility: hidden; /* Reduce painting */
    }

    :global(html) {
        background-color: var(--color3);
        scroll-behavior: smooth;
    }

    .children {
        width: 100%;
        min-height: 90vh;
        background-color: transparent;
        position: relative;
        z-index: 2;
        contain: content; /* Improve scroll performance by isolating content */
    }
   
    :global(html),
    :global(body) {
        margin: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;
        overflow-x: hidden;
        overscroll-behavior-y: none; /* Prevent bouncing on some browsers */
        /* Remove gray by forcing a blue gradient background */
        background: linear-gradient(135deg, var(--color3) 0%, var(--color5) 100%) !important;
        background-attachment: fixed !important;
    }

    /* Custom scrollbar */
    :global(::-webkit-scrollbar) {
        width: 8px;
    }

    :global(::-webkit-scrollbar-track) {
        background: var(--color5);
    }

    :global(::-webkit-scrollbar-thumb) {
        background: var(--color1);
        border-radius: 4px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: var(--color1_em);
    }

    /* Apply neon text glow to headers */
    :global(h1) {
        text-shadow: 0 0 4px rgba(0, 195, 255, 0.2), 0 0 8px rgba(0, 195, 255, 0.2); /* Reduced glow intensity */
    }

    /* Add specific styling for the navbar search if needed */
    :global(.navbar .search-container) {
        min-width: 200px;
        max-width: 300px;
    }
    
    :global(.navbar .search-input) {
        background: rgba(10, 17, 40, 0.4) !important;
        transition: all 0.3s ease;
    }
    
    :global(.navbar .search-input:focus) {
        background: rgba(10, 17, 40, 0.7) !important;
    }

    /* Custom search styling with inline gradient underline */
    :global(.custom-search-container) {
        position: relative;
        margin: 0 1rem;
        min-width: 200px;
    }

    :global(.custom-search-input) {
        width: 100%;
        padding: 8px 12px;
        background: rgba(10, 17, 40, 0.5) !important;
        color: white !important;
        border: none !important;
        border-radius: 4px !important;
        outline: none !important;
        font-size: 1em;
    }

    :global(.search-underline) {
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        width: 0;
        background: linear-gradient(to right, transparent, var(--color1), transparent);
        border-radius: 3px;
        transition: all 0.3s ease;
        z-index: 2;
    }

    :global(.custom-search-input:focus + .search-underline) {
        width: 100%;
        height: 3px;
        box-shadow: 0 0 10px rgba(0, 195, 255, 0.5);
        animation: pulsateSearch 2s infinite alternate;
    }

    :global(.custom-search-container:hover .search-underline) {
        width: 80%;
    }

    :global(.custom-search-input::placeholder) {
        color: rgba(255, 255, 255, 0.5);
    }

    :global(.custom-search-input:focus::placeholder) {
        color: rgba(0, 195, 255, 0.7);
    }

    /* CSS optimizations for better performance */
    :global(.search-underline),
    :global(.custom-search-input),
    :global(.btn),
    :global(h1),
    :global(h2),
    :global(.feature-item) {
        will-change: transform, opacity;
        transform: translateZ(0);
        backface-visibility: hidden;
    }
    
    /* Optimize animations to use GPU-accelerated properties */
    :global(.feature-item:hover),
    :global(.btn:hover) {
        will-change: transform, box-shadow;
    }

    @keyframes pulsateSearch {
        0% { opacity: 0.7; box-shadow: 0 0 5px rgba(0, 195, 255, 0.3); }
        100% { opacity: 1; box-shadow: 0 0 15px rgba(0, 195, 255, 0.5); }
    }

    /* Additional performance optimization */
    @media (max-width: 768px) {
        /* Simplify animations on mobile */
        @keyframes pulsateSearch {
            0% { opacity: 0.7; }
            100% { opacity: 1; }
        }
    }

    /* Apply consistent styling to all routes */
    :global(.route-content) {
        background: transparent !important;
        position: relative;
        z-index: 2;
    }
    
    /* Add galaxy-like shimmer to all pages */
    :global(.route-content::before) {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(0, 195, 255, 0.05) 40%, rgba(0, 195, 255, 0.05) 60%, transparent 70%);
        background-size: 200% 200%;
        animation: shimmer 10s infinite linear;
        pointer-events: none;
        z-index: -1;
    }
    
    @keyframes shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
    }
    
    /* Ensure section styling is consistent across all pages */
    :global(.section) {
        width: 100%;
        padding: 4rem 0;
        display: flex;
        justify-content: center;
        position: relative;
        overflow: hidden;
        background: transparent !important;
    }

    /* Ensure all route content has consistent styling */
    :global(.route-content),
    :global(main),
    :global(.container),
    :global(.page-container) {
        background: transparent !important;
        position: relative;
        z-index: 2;
        min-height: 80vh;
    }
    
    /* Add shimmer effect to all pages consistently */
    :global(.route-content::before),
    :global(main::before),
    :global(.container::before),
    :global(.page-container::before) {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(0, 195, 255, 0.05) 40%, rgba(0, 195, 255, 0.05) 60%, transparent 70%);
        background-size: 200% 200%;
        animation: shimmer 10s infinite linear;
        pointer-events: none;
        z-index: -1;
    }
    
    /* Ensure text colors are consistent */
    :global(body), :global(p), :global(div), :global(span) {
        color: #e6f1ff;
    }
    
    /* Make sure all sections use consistent styling */
    :global(.section),
    :global(section) {
        background: transparent !important;
        position: relative;
        z-index: 2;
        padding: 2rem 0;
    }
    
    /* Add background to cards/content blocks consistently */
    :global(.card),
    :global(.content-block),
    :global(.team-card) {
        background: rgba(22, 33, 62, 0.5) !important;
        border-radius: 8px;
        border: 1px solid rgba(0, 195, 255, 0.1);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5px);
    }
    
    /* Consistent header styling */
    :global(h1), :global(h2), :global(h3) {
        color: white;
        text-shadow: 0 0 4px rgba(0, 195, 255, 0.2), 0 0 8px rgba(0, 195, 255, 0.2);
    }
    
    /* Consistent styling for all dividers */
    :global(.divider),
    :global(hr) {
        border: none;
        height: 2px;
        background: linear-gradient(to right, transparent, var(--color1), transparent);
        margin: 1.5rem 0;
        opacity: 0.7;
    }

    /* Additional selectors to ensure consistent styling for all routes */
    :global(.main), 
    :global(main),
    :global(.page),
    :global(.gallery-page),
    :global(.profile-page),
    :global(.team-page),
    :global(.editor-page),
    :global(.signin-page),
    :global(.signup-page) {
        background: transparent !important;
        color: #e6f1ff;
        min-height: 70vh;
        position: relative;
        z-index: 2;
        padding-top: 1rem;
    }
    
    /* Further ensure all route types have consistent coloring */
    :global(.sub-page) {
        background: transparent !important;
        min-height: 70vh;
        position: relative;
        z-index: 2;
    }
</style>
