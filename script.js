// Project Data
const projectsData = {
  'commizzion-account': {
    title: 'Commizzion Account Platform',
    meta: 'Design Lead | iGaming Platform | 2024-2025',
    description: 'User-facing platform redesign for 500+ affiliates. Improved workflows and UX through research-driven approach.',
    details: 'At Inlaze, I led the design of the Commizzion Account platform, a critical interface for 500+ affiliate partners. Through extensive user research and usability testing, I identified key pain points and redesigned the workflows to improve navigation, reduce support tickets, and increase user satisfaction.',
    tags: ['Design Lead', 'User Research', 'iGaming', 'Figma', 'Usability Testing']
  },
  'commizzion-backoffice': {
    title: 'Commizzion Backoffice',
    meta: 'Design Lead | Admin Platform | 2024-2025',
    description: 'Administrative system handling complex workflows, data visualization, and platform control.',
    details: 'The Commizzion Backoffice is a comprehensive administrative platform designed to manage complex iGaming operations. I led the design of data visualization dashboards, administrative workflows, and maintained a scalable design system across all components.',
    tags: ['Backoffice', 'Data Visualization', 'Design System', 'Admin UX', 'Figma']
  },
  'gannar': {
    title: 'Gannar Casino MVP',
    meta: 'Product Designer | AI-First Workflow | 2024-2025',
    description: 'Casino platform MVP delivered to production. Implemented AI-augmented design workflow using Claude + Figma automation.',
    details: 'Gannar is a complete casino platform that demonstrates the power of AI-augmented design workflows. I used Claude for rapid ideation, Figma automation for component generation, and MCP integration for seamless handoff to development. The MVP was delivered to production on schedule with zero technical debt.',
    tags: ['AI Workflow', 'MVP', 'Production', 'Claude', 'Figma Make', 'Innovation']
  },
  'rodriguez': {
    title: 'The Rodriguez Project',
    meta: 'Freelance Designer | E-Commerce | 2024',
    description: 'Web redesign for clothing brand. Optimized conversion flow and mobile experience with measurable results.',
    details: 'Comprehensive redesign of an e-commerce website for a clothing brand. Through user testing and conversion rate optimization, I improved the product pages, checkout flow, and mobile experience, resulting in a 35% increase in conversion rate and improved user engagement.',
    tags: ['E-Commerce', 'Metrics', 'Conversion', 'User Testing', 'Mobile Design']
  },
  'art-studio': {
    title: 'Art Studio App',
    meta: 'Product Design | Interaction Design | 2024',
    description: 'Exploration of interaction patterns and product design principles. Full UI/UX from concept to implementation.',
    details: 'A personal exploration into modern interaction design and product design principles. This project showcases the complete design journey from concept through final implementation, with emphasis on smooth transitions, intuitive interactions, and visual coherence.',
    tags: ['Interaction Design', 'Product Design', 'UI/UX', 'Animation', 'Exploration']
  }
};

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Project card interactions
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function () {
    const projectId = this.getAttribute('data-project');
    const projectData = projectsData[projectId];
    
    if (projectData) {
      showProjectModal(projectData);
    }
  });
});

// Project modal functionality
function showProjectModal(data) {
  const modal = document.getElementById('projectModal');
  const title = document.getElementById('modalTitle');
  const description = document.getElementById('modalDescription');
  const details = document.getElementById('modalDetails');
  
  title.textContent = data.title;
  description.textContent = data.meta;
  
  let tagsHtml = '<div style="margin-top: 1.5rem;"><div style="margin-bottom: 1rem;">' + data.details + '</div>';
  tagsHtml += '<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">';
  
  data.tags.forEach(tag => {
    tagsHtml += `<span style="background: #f5f5f5; color: #666; padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">${tag}</span>`;
  });
  
  tagsHtml += '</div></div>';
  
  details.innerHTML = tagsHtml;
  modal.classList.add('active');
}

// Close modal
document.getElementById('projectModal').addEventListener('click', function (e) {
  if (e.target === this) {
    this.classList.remove('active');
  }
});

document.querySelector('.modal-close').addEventListener('click', function () {
  document.getElementById('projectModal').classList.remove('active');
});

// Keyboard close modal
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.getElementById('projectModal').classList.remove('active');
  }
});

// Mobile menu (hamburger toggle)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', function () {
  navMenu?.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function () {
    navMenu?.classList.remove('active');
  });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Lazy load images (if added later)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
