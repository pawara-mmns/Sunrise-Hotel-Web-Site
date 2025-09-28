// Dining & Service Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Menu Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    function showMenuContent(targetTab) {
        // Hide all menu contents
        menuContents.forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Show target content and activate button
        const targetContent = document.getElementById(targetTab);
        const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
        
        if (targetContent && targetButton) {
            targetContent.classList.add('active');
            targetButton.classList.add('active');
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            showMenuContent(targetTab);
        });
    });

    // Smooth scrolling for navigation links
    function smoothScroll(target, duration = 800) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Enhanced Button Interactions
    const diningButtons = document.querySelectorAll('.dining-btn');
    const serviceButtons = document.querySelectorAll('.service-btn');

    // Dining buttons functionality
    diningButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.dining-card');
            const title = card.querySelector('.dining-title').textContent;
            
            // Create a simple modal effect (you can enhance this)
            alert(`Opening menu for ${title}...`);
            
            // You could implement a proper modal here
            // showMenuModal(title);
        });
    });

    // Service buttons functionality
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.service-card');
            const title = card.querySelector('.service-title').textContent;
            
            // Create a simple booking confirmation (you can enhance this)
            alert(`Booking ${title}... Please contact our concierge for assistance.`);
            
            // You could implement a proper booking form here
            // showBookingModal(title);
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.dining-card, .menu-item, .service-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });

    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Enhanced hover effects
    const cards = document.querySelectorAll('.dining-card, .menu-item, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading animation for images
    const images = document.querySelectorAll('.dining-image img, .menu-image img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'blur(0)';
        });
        
        // Add loading effect
        img.style.opacity = '0';
        img.style.filter = 'blur(5px)';
        img.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
    });

    console.log('Dining & Service page loaded successfully!');
});

// Additional utility functions
function showMenuModal(restaurantName) {
    // This could be enhanced to show a proper modal with menu details
    console.log(`Showing menu for ${restaurantName}`);
    
    // Example modal structure:
    /*
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${restaurantName} Menu</h2>
            <div class="menu-details">
                <!-- Menu content here -->
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    */
}

function showBookingModal(serviceName) {
    // This could be enhanced to show a proper booking form
    console.log(`Booking ${serviceName}`);
    
    // Example booking form structure:
    /*
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Book ${serviceName}</h2>
            <form class="booking-form">
                <input type="date" placeholder="Date" required>
                <input type="time" placeholder="Time" required>
                <input type="number" placeholder="Number of guests" required>
                <textarea placeholder="Special requests"></textarea>
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    */
}