// Simple Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval = setInterval(nextSlide, 4000);
    
  
});