function generateHTML(projects) {
  return projects.map(project => `
    <div class="obj-left">
      <div class="img-box">
        <img class="left-img" src="${project.image}" alt="..." />
      </div>
      <div class="right-txt">
        <h3>${project.name}</h3>
        <a href="${project.link}" class="btnInline">
          ${project.sourceType === 'github' ? '<i class="fab fa-brands fa-github"></i>' : '<img class="inlineRblx" src="assets/img/rblxIcon.png"/>'}
          Find it on ${project.sourceType}
        </a>
        <p>${project.description}</p>
      </div>
    </div>
  `).join('');
}


// TODO: add frc code stuffs, and put a readme on that 
// TODO: Add ip sync from personal-->
// https://github.com/Dylan-Beppu-SPU/IpSync
// Add rust thing when that eventually gets done 
// Add senior project when that eventually finishes
// Open source and add major Roblox frameworks for side project, would be nice

document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/projects.json')
    .then(response => response.json())
    .then(projects => {
      document.querySelector('#projects-List').innerHTML = generateHTML(projects);
    })
    .catch(error => console.error('Error loading projects:', error));
});