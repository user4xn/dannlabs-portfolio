import { renderProjects } from './components/projects.js';
import { initReveal } from './animations/reveal.js';
import { initSwarm } from './animations/swarm.js';

renderProjects(document.querySelector('#projects'));
initReveal();
initSwarm();
document.querySelector('#year').textContent = `© ${new Date().getFullYear()} Wildan Kurnia Candra`;
