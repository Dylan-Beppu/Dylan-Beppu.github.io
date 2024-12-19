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


// TODO: Add ip sync from personal-->
// https://github.com/Dylan-Beppu-SPU/IpSync
// Add rust thing when that eventually gets done 
// Add senior project when that eventually finishes
// Open source and add major Roblox frameworks for side project, would be nice

function generateSkills(skills) {
  return skills.map(skill => `
    <div class="Rounded-item">${skill}</div>
  `).join('');
}



document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/projects.json')
    .then(response => response.json())
    .then(projects => {
      document.querySelector('#projects-List').innerHTML = generateHTML(projects);
    })
    .catch(error => console.error('Error loading projects:', error));
    
  fetch('assets/skills.csv')
  .then(response => response.text())
  .then(csv => {
    const skills = csv.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    document.querySelector('#skills-List').innerHTML = generateSkills(skills);
  })
  .catch(error => console.error('Error loading skills:', error));
});

window.onload = function() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles.css';
  document.head.appendChild(link);
};