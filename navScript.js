document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector("#NewNav ul");
    const indicator = nav.querySelector(".nav-indicator");
    const links = nav.querySelectorAll("a");

    function moveIndicator(el) {
        indicator.style.width = el.offsetWidth + "px";
        indicator.style.left = el.offsetLeft + "px";
    }

    // Set initial position to active
    let activeLink = nav.querySelector("a.active") || links[0];
    moveIndicator(activeLink);

    links.forEach(link => {
        link.addEventListener("mouseenter", () => moveIndicator(link));
        link.addEventListener("mouseleave", () => moveIndicator(activeLink));
        link.addEventListener("click", function(e) {
			e.preventDefault();
			const href = link.getAttribute("href");
			const target = document.querySelector(href);
			if (target) {
				let em = parseFloat(getComputedStyle(target).fontSize);
                const yOffset = em * -5; // 2rem offset (assuming 1rem = 16px)
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
            
			
			links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            activeLink = link; // Update activeLink when clicked
            moveIndicator(link);
        });
    });

    // Auto-highlight nav link based on scroll position
    const sectionIds = ["home", "experence", "ProjectContainer"];
    const sectionElements = sectionIds.map(id => document.getElementById(id));
    const navLinks = Array.from(links);

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // 50% of section visible
    };

    function onSectionIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                const foundActiveLink = navLinks.find(link => link.getAttribute("href") === `#${entry.target.id}`);
                if (foundActiveLink) {
                    foundActiveLink.classList.add("active");
                    activeLink = foundActiveLink; // Update activeLink on scroll
                    moveIndicator(foundActiveLink);
                }
            }
        });
    }

    const observer = new IntersectionObserver(onSectionIntersect, observerOptions);
    sectionElements.forEach(section => {
        if (section) observer.observe(section);
    });
});