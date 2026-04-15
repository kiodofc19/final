// Main JavaScript for Agoo, La Union Tourism Website

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize Bootstrap Carousel
  var heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    new bootstrap.Carousel(heroCarousel, {
      interval: 5000,
      wrap: true,
      touch: true
    });
  }
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous error states
      clearErrors();
      
      let isValid = true;
      
      // Validate Name
      const name = document.getElementById('name');
      if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
      } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
      }
      
      // Validate Email
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        showError(email, 'Please enter your email');
        isValid = false;
      } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate Message
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
      } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
      }
      
      if (isValid) {
        // Show success message
        showSuccessMessage();
        contactForm.reset();
      }
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animation on scroll
  const animateElements = document.querySelectorAll('.attraction-card, .business-card, .festival-card, .mission-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add animation class styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  // Counter animation for stats
  const statItems = document.querySelectorAll('.stat-item h3');
  
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'));
        animateCounter(target, 0, countTo, 2000);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  statItems.forEach(item => {
    counterObserver.observe(item);
  });
  
});

// Helper Functions

function showError(input, message) {
  const formGroup = input.closest('.mb-3');
  input.classList.add('is-invalid');
  
  // Remove existing error message
  const existingError = formGroup.querySelector('.invalid-feedback');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'invalid-feedback';
  errorDiv.textContent = message;
  formGroup.appendChild(errorDiv);
}

function clearErrors() {
  document.querySelectorAll('.is-invalid').forEach(input => {
    input.classList.remove('is-invalid');
  });
  document.querySelectorAll('.invalid-feedback').forEach(error => {
    error.remove();
  });
}

function showSuccessMessage() {
  // Remove existing success message
  const existingSuccess = document.querySelector('.alert-success');
  if (existingSuccess) {
    existingSuccess.remove();
  }
  
  // Create success message
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success mt-3';
  successDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i> Thank you for your message! We will get back to you soon.';
  
  const contactForm = document.getElementById('contactForm');
  contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
    element.textContent = Math.floor(easeProgress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Modal content loader for attractions
function loadAttractionModal(attractionId) {
  const attractions = {
    'basilica': {
      title: 'Basilica Minore of Our Lady of Charity',
      image: 'images/basilica.jpg',
      description: 'The Basilica Minore of Our Lady of Charity is one of the most significant religious landmarks in La Union. Built in the 18th century, this beautiful church showcases Spanish colonial architecture and serves as the spiritual center of Agoo. The basilica houses the miraculous image of Our Lady of Charity, which has been venerated by locals and pilgrims for centuries.',
      location: 'Agoo, La Union, Philippines',
      hours: 'Open daily from 6:00 AM to 6:00 PM'
    },
    'beach': {
      title: 'Agoo Beach',
      image: 'images/agoo-beach.jpg',
      description: 'Agoo Beach offers a pristine coastline with golden sands and crystal-clear waters. This tranquil beach is perfect for swimming, sunbathing, and enjoying spectacular sunsets. The beach is less crowded than other tourist spots, making it an ideal destination for those seeking peace and relaxation. Local fishermen can often be seen with their traditional boats, adding to the authentic coastal charm.',
      location: 'Agoo, La Union, Philippines',
      hours: 'Open 24 hours'
    },
    'ecopark': {
      title: 'Agoo Eco Park',
      image: 'images/eco-park.jpg',
      description: 'Agoo Eco Park is a nature sanctuary that showcases the rich biodiversity of the region. The park features hiking trails, picnic areas, and educational exhibits about local flora and fauna. Visitors can enjoy bird watching, nature photography, and guided tours. The park also promotes environmental conservation and sustainable tourism practices.',
      location: 'Agoo, La Union, Philippines',
      hours: 'Open daily from 7:00 AM to 5:00 PM'
    },
    'marcos': {
      title: 'Marcos Bust / Historical Park',
      image: 'images/marcos-bust.jpg',
      description: 'The Marcos Bust Historical Park features a monumental bust of former President Ferdinand Marcos, which stands as a significant historical landmark. The park offers insights into Philippine history and politics, with informational displays and a peaceful garden setting. It serves as both a historical site and a place for reflection on the nation\'s past.',
      location: 'Agoo, La Union, Philippines',
      hours: 'Open daily from 8:00 AM to 5:00 PM'
    },
    'plaza': {
      title: 'Public Plaza of Agoo',
      image: 'images/public-plaza.jpg',
      description: 'The Public Plaza of Agoo is the heart of the town, serving as a gathering place for locals and visitors alike. The beautifully landscaped plaza features a central fountain, benches, and shaded areas perfect for relaxation. It hosts various community events, festivals, and is surrounded by historic buildings and local shops.',
      location: 'Agoo, La Union, Philippines',
      hours: 'Open 24 hours'
    }
  };
  
  const attraction = attractions[attractionId];
  if (attraction) {
    document.getElementById('attractionModalLabel').textContent = attraction.title;
    document.getElementById('modalImage').src = attraction.image;
    document.getElementById('modalImage').alt = attraction.title;
    document.getElementById('modalDescription').textContent = attraction.description;
    document.getElementById('modalLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${attraction.location}`;
    document.getElementById('modalHours').innerHTML = `<i class="fas fa-clock"></i> ${attraction.hours}`;
  }
}
