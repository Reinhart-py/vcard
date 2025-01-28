// Function to animate the counter
function animateCounter(element, target) {
  let current = 0;
  const duration = 1500; // 1.5 seconds
  const step = target / (duration / 10);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
    else {
      element.textContent = Math.round(current) + (element.parentElement.querySelector('.stat-label').textContent === 'Deployment Success Rate' ? '%' : '+');
    }
  }, 10);
}


// Intersection Observer for hero section
const heroObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate counters
      const statValues = document.querySelectorAll('.stat-value');
      statValues.forEach(stat => {
        animateCounter(stat, parseInt(stat.getAttribute('data-count')));
      });
      observer.unobserve(entry.target);
    }
  });
});

// Observe the hero section
const heroSection = document.querySelector('.hero');
heroObserver.observe(heroSection);



// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('show');
});


// Project Tab Functionality
const tabButtons = document.querySelectorAll('.projects-tab-buttons .tab-button');
const projectCards = document.querySelectorAll('.projects-container .project-card');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Deactivate all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    // Activate clicked button
    button.classList.add('active');

    // Filter Projects
    const tab = button.getAttribute('data-tab');
    projectCards.forEach(card => {
      if (tab === 'all' || card.classList.contains(tab)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});



// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);

  fetch('https://formspree.io/f/mgejzazw', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        document.getElementById('formMessage').innerText = 'Message sent successfully!';
        form.reset();
      }
      else {
        document.getElementById('formMessage').innerText = 'Something went wrong';
      }
    })
    .catch(error => {
      document.getElementById('formMessage').innerText = 'Something went wrong';
    });

});



// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});



// Reveal Animation
const revealElements = document.querySelectorAll('.about-me, .services, .skills, .projects, .testimonials, .contact');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 }); // Adjust the threshold for the reveal point

revealElements.forEach(element => {
  revealObserver.observe(element);
});