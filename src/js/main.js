import { renderProjects } from './components/projects.js';
import { initSnowy } from './components/snowy.js';
import { initReveal } from './animations/reveal.js';
import { initSwarm } from './animations/swarm.js';
renderProjects(document.querySelector('#projects')); initSnowy(); initReveal(); initSwarm(); document.querySelector('#year').textContent=`© ${new Date().getFullYear()} Wildan Kurnia Candra`;
