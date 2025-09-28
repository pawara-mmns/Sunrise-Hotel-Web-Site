// Contact Us Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state functionality
    function setActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current page link
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath && linkPath.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }

    // Set active navigation on page load
    setActiveNavigation();

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Basic form validation
            const requiredFields = ['fullName', 'email', 'subject', 'message'];
            let isValid = true;
            let errors = [];

            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                    errors.push(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`);
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#e9ecef';
                }
            });

            // Email validation
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value && !emailRegex.test(emailInput.value)) {
                isValid = false;
                errors.push('Please enter a valid email address');
                emailInput.style.borderColor = '#e74c3c';
            }

            if (isValid) {
                // Show success message
                showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Log form data (in a real application, this would be sent to a server)
                console.log('Form submitted:', formObject);
                
                // Scroll to top of form
                contactForm.scrollIntoView({ behavior: 'smooth' });
                
            } else {
                // Show error message
                showMessage('Please fix the following errors:\n' + errors.join('\n'), 'error');
            }
        });
    }

    // Message display function
    function showMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    ${type === 'success' 
                        ? '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>'
                        : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
                    }
                </svg>
                <span>${message}</span>
            </div>
        `;

        // Insert message before form
        contactForm.parentNode.insertBefore(messageDiv, contactForm);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Add form message styles dynamically
    const messageStyles = `
        .form-message {
            padding: 15px 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            font-size: 14px;
            line-height: 1.5;
            animation: slideDown 0.3s ease;
        }
        
        .form-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .form-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .message-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = messageStyles;
    document.head.appendChild(styleSheet);

    // Smooth scrolling for form focus
    const formInputs = document.querySelectorAll('.inquiry-form input, .inquiry-form select, .inquiry-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Add focused class for additional styling if needed
            this.parentNode.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            // Remove focused class
            this.parentNode.classList.remove('focused');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.1)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // Add loading animation to submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        contactForm.addEventListener('submit', function() {
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="animation: spin 1s linear infinite;">
                    <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>
                </svg>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;

            // Re-enable button after 2 seconds (simulate API call)
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <span>Send Message</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                `;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Add CSS for loading animation
    const loadingStyles = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .focused {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
        }
    `;

    const loadingStyleSheet = document.createElement('style');
    loadingStyleSheet.textContent = loadingStyles;
    document.head.appendChild(loadingStyleSheet);
});