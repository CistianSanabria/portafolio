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

// Cached DOM references — queried once at startup
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDetails = document.getElementById('modalDetails');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Project card interactions
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function () {
    const projectData = projectsData[this.getAttribute('data-project')];
    if (projectData) showProjectModal(projectData);
  });
});

// Project modal
function showProjectModal(data) {
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.meta;
  modalDetails.innerHTML = `
    <div class="modal-details-body">
      <p>${data.details}</p>
      <div class="modal-tags">
        ${data.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
      </div>
    </div>
  `;
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

// Close modal — backdrop click, X button, Escape key
modal.addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

// Mobile menu — toggle .active class (matches CSS rule .nav-menu.active)
hamburger?.addEventListener('click', function () {
  navMenu?.classList.toggle('active');
});

// Close mobile menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function () {
    navMenu?.classList.remove('active');
  });
});

// Navbar scroll state — class toggled here, shadow defined in CSS (.navbar.scrolled)
let isScrolled = false;
window.addEventListener('scroll', function () {
  const shouldBeScrolled = window.scrollY > 10;
  if (shouldBeScrolled === isScrolled) return;
  isScrolled = shouldBeScrolled;
  navbar.classList.toggle('scrolled', isScrolled);
});

// Dynamic copyright year
document.getElementById('copyright-year').textContent = new Date().getFullYear();
