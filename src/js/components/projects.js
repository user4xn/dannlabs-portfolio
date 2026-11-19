import { projects } from '../data/projects.js';
export function renderProjects(root) {
  root.innerHTML = projects.map((p, i) => `<article class="project ${i % 2 ? 'project--reverse' : ''}" data-reveal><div class="project__media"><img src="${p.image}" alt="${p.title} project visual" loading="lazy"></div><div class="project__body"><p class="project__meta">${String(i + 1).padStart(2, '0')} · ${p.year} · ${p.category}</p><h3>${p.title}</h3><p>${p.description}</p><p class="project__stack">${p.stack}</p><p class="project__status">${p.status}</p></div></article>`).join('');
}