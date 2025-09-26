// Room and Facilities Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initBookingButtons();
    initGalleryButtons();
    initScrollAnimations();
    initNavbarScrollEffect();
    initImageLoadHandling();
    initFacilityCardEffects();
});

// Handle booking buttons
function initBookingButtons() {
    const bookingButtons = document.querySelectorAll('.btn-primary');
    
    bookingButtons.forEach(button => {
        if (button.textContent.includes('Book')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add loading state
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.opacity = '0.7';
                this.style.cursor = 'not-allowed';
                
                // Simulate booking process (replace with actual booking logic)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                    this.style.cursor = 'pointer';
                    
                    // Redirect to booking page or show booking form
                }, 1000);
            });
        }
    });
}

// Handle gallery buttons
function initGalleryButtons() {
    const galleryButtons = document.querySelectorAll('.btn-secondary');
    
    galleryButtons.forEach(button => {
        if (button.textContent.includes('Gallery')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const roomCard = this.closest('.room-showcase-card');
                const roomTitle = roomCard.querySelector('.room-showcase-title').textContent;
                
                // Show modal or gallery (implement modal logic here)
                console.log(`Opening ${roomTitle} gallery...`);
            });
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.room-showcase-card, .facility-card, .amenity-item'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Handle image loading errors and add fallbacks
function initImageLoadHandling() {
    const facilityImages = document.querySelectorAll('.facility-image img');
    
    facilityImages.forEach(img => {
        img.addEventListener('error', function() {
            // Set a fallback image if the original fails to load
            console.log('Image failed to load:', this.src);
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDgwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2Ij5JbWFnZSBOb3QgQXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K';
            this.alt = 'Image not available';
        });
    });
}

// Enhanced facility card effects
function initFacilityCardEffects() {
    const facilityCards = document.querySelectorAll('.facility-card');
    
    facilityCards.forEach(card => {
        const image = card.querySelector('.facility-image img');
        
        // Add mouseenter effect - only zoom image
        card.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.15)';
            }
        });
        
        // Add mouseleave effect - reset zoom
        card.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
});

// Room card hover effects
function initRoomCardEffects() {
    const roomCards = document.querySelectorAll('.room-showcase-card');
    
    roomCards.forEach(card => {
        const image = card.querySelector('.room-showcase-image img');
        
        card.addEventListener('mouseenter', function() {
            image.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
        });
    });
}

// Initialize card effects
document.addEventListener('DOMContentLoaded', function() {
    initRoomCardEffects();
});