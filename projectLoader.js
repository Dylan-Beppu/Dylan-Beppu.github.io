// Old one
// function generateHTML(projects) {
//     return projects.map(project => `
//         <div class="Project">
//                 <h2>${project.name}</h2>
//                 <div class="Project-content">
//                     <img class="Project-img" src="${project.image}" alt="${project.name} Image" />
//                     <div class="Project-overlay">
//                         <p>${project.description}</p>
//                         <a href="${project.link}" class="btnInline">
//                             ${project.sourceType === 'github' ? '<i class="fab fa-brands fa-github"></i>' : '<img class="inlineRblx" src="assets/img/rblxIcon.png"/>'}
//                             Find it on ${project.sourceType}
//                         </a>
//                     </div>
//                 </div>
//             </div>
//     `).join('');
// }



function generateHTML(projects) {
	return projects.map(project => `
		<div class="project" id="${project.name}">
			<img src="${project.image}" alt="${project.name} Project Image" />
			<div class="project-text">
				<div class="upper-project-text">
					<h2>${project.name}</h2>
					<p>${project.description}</p>
				</div>
				<div class="lower-project-text">
					<a class="btn" href="${project.link}" target="_blank">
						View on ${project.sourceType.charAt(0).toUpperCase() + project.sourceType.slice(1)}
					</a>
					<div class="certSkills">
						<ul class="txt-list">
							${project.skills.map(skill => `<li>${skill}</li>`).join('')}
						</ul>
					</div>
				</div>
			</div>
		</div>
	`).join('');
}



document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/projects.json')
      .then(response => response.json())
      .then(projects => {
        document.querySelector('#ProjectContainer').innerHTML = generateHTML(projects);
      })
      .catch(error => console.error('Error loading projects:', error));
});