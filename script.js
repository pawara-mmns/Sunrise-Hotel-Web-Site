// Simple Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state functionality
    function setActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Map page names to navigation links
        const pageMap = {
            'index.html': 'index.html',
            '': 'index.html', // Root path maps to index
            'rooms&facilities.html': 'rooms&facilities.html',
            'dining&service.html': 'dining&service.html', 
            'testimonials.html': 'testimonials.html',
            'contactUs.html': 'contactUs.html'
        };
        
        // Find and activate the correct navigation link
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const linkPage = linkHref.split('/').pop();
            
            if (pageMap[currentPage] === linkPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPath === '/' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Set active navigation on page load
    setActiveNavigation();
    
    // Add click handlers to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked link
            this.classList.add('active');
        });
    });

    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval = setInterval(nextSlide, 4000);
    
    function showSlide(index) {
      
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

     // Navigation button events
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 4000);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 4000);
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            currentSlide = index;
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, 4000);
        });
    });

    // Simple button hover effects
    const buttons = document.querySelectorAll('.btn, .book-btn, .nav-arrow');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});