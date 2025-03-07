function generateHTML(projects) {
    return projects.map(project => `
        <div class="Project">
                <h2>${project.name}</h2>
                <div class="Project-content">
                    <img class="Project-img" src="${project.image}" alt="${project.name} Image" />
                    <div class="Project-overlay">
                        <p>${project.description}</p>
                        <a href="${project.link}" class="btnInline">
                            ${project.sourceType === 'github' ? '<i class="fab fa-brands fa-github"></i>' : '<img class="inlineRblx" src="assets/img/rblxIcon.png"/>'}
                            Find it on ${project.sourceType}
                        </a>
                    </div>
                </div>
            </div>
    `).join('');
}



  
//   <div class="obj-left">
//   <div class="img-box">
//     <img class="left-img" src="${project.image}" alt="..." />
//   </div>
//   <div class="right-txt">
//     <h3>${project.name}</h3>
//     <a href="${project.link}" class="btnInline">
//       ${project.sourceType === 'github' ? '<i class="fab fa-brands fa-github"></i>' : '<img class="inlineRblx" src="assets/img/rblxIcon.png"/>'}
//       Find it on ${project.sourceType}
//     </a>
//     <p>${project.description}</p>
//   </div>
// </div>

document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/projects.json')
      .then(response => response.json())
      .then(projects => {
        document.querySelector('#ProjectContainer').innerHTML = generateHTML(projects);
      })
      .catch(error => console.error('Error loading projects:', error));
});