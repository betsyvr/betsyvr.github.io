// ============================================
// Project Password Protection
// ============================================

// Simple password storage (consider using a backend for production)
const projectPasswords = {
    'visiondg': 'vision2024',
    'getyourrefund': 'refund2024',
    'amadeus': 'amadeus2024'
};

// Track unlocked projects in session
const unlockedProjects = new Set();

document.addEventListener('DOMContentLoaded', () => {
    // Setup password modal functionality
    const modal = document.getElementById('passwordModal');
    const modalClose = document.querySelector('.modal-close');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const passwordInput = document.getElementById('projectPassword');
    const passwordError = document.getElementById('passwordError');
    let currentProject = null;

    // Unlock buttons
    document.querySelectorAll('.unlock-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentProject = btn.dataset.project;
            
            if (unlockedProjects.has(currentProject)) {
                // Already unlocked, toggle details
                const card = document.querySelector(`[data-project="${currentProject}"]`);
                const details = card.querySelector('.project-details');
                if (details.style.display === 'block') {
                    closeProject(currentProject);
                } else {
                    showFullProject(currentProject);
                }
            } else {
                // Show password modal
                modal.style.display = 'flex';
                passwordInput.value = '';
                passwordError.style.display = 'none';
                passwordInput.focus();
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Submit password
    submitPasswordBtn.addEventListener('click', () => {
        const enteredPassword = passwordInput.value;
        
        if (projectPasswords[currentProject] === enteredPassword) {
            unlockedProjects.add(currentProject);
            passwordError.style.display = 'none';
            modal.style.display = 'none';
            showFullProject(currentProject);
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    // Allow Enter key to submit
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitPasswordBtn.click();
        }
    });
});

function showFullProject(projectId) {
    const card = document.querySelector(`[data-project="${projectId}"]`);
    const teaser = card.querySelector('.project-teaser');
    const details = card.querySelector('.project-details');
    const linkText = card.querySelector('.link-text');
    
    teaser.style.display = 'none';
    details.style.display = 'block';
    linkText.textContent = 'Close Project';
    
    card.classList.add('unlocked');
}

function closeProject(projectId) {
    const card = document.querySelector(`[data-project="${projectId}"]`);
    const teaser = card.querySelector('.project-teaser');
    const details = card.querySelector('.project-details');
    const linkText = card.querySelector('.link-text');
    
    teaser.style.display = 'block';
    details.style.display = 'none';
    linkText.textContent = 'View Full Project';
    
    card.classList.remove('unlocked');
}

// ============================================
// Smooth Navigation Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Form Submission
// ============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // For now, log to console and show confirmation
        console.log({
            name,
            email,
            subject,
            message
        });
        
        // Show success message
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#27ae60';
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
    });
}

// ============================================
// Add active nav link styling
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Lazy Loading for images (optional)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}