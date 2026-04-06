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

    // Observe both #Projects and #ProjectContainer for robust nav highlighting
    const sectionIds = ["home", "experience", "Projects", "ProjectContainer"];
    function getSectionElements() {
        return sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    }
    let sectionElements = getSectionElements();
    const navLinks = Array.from(links);

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // 20% of section visible
    };

    let currentActiveSection = null;
    let sectionObserver = null;

    function observeSections() {
        // Disconnect previous observer if exists
        if (sectionObserver) sectionObserver.disconnect();
        sectionElements = getSectionElements();
        sectionObserver = new IntersectionObserver(onSectionIntersect, observerOptions);
        sectionElements.forEach(section => {
            if (section) sectionObserver.observe(section);
        });
    }

    function onSectionIntersect(entries) {
        // Find all visible sections
        let visibleSections = entries.filter(entry => entry.isIntersecting);
        if (visibleSections.length > 0) {
            // Sort by boundingClientRect.top
            visibleSections.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            let topSection = visibleSections[0].target;

            // Special handling: if either #Projects or #ProjectContainer is visible, highlight the Projects nav link
            const projectsVisible = visibleSections.find(e => e.target.id === "Projects" || e.target.id === "ProjectContainer");
            if (projectsVisible) {
                navLinks.forEach(link => link.classList.remove("active"));
                // Find the nav link for Projects (href="#ProjectContainer")
                const projectsLink = navLinks.find(link => link.getAttribute("href") === "#ProjectContainer");
                if (projectsLink) {
                    projectsLink.classList.add("active");
                    activeLink = projectsLink;
                    moveIndicator(projectsLink);
                    currentActiveSection = projectsVisible.target.id;
                    return;
                }
            }

            // Otherwise, highlight the top visible section as usual
            navLinks.forEach(link => link.classList.remove("active"));
            const foundActiveLink = navLinks.find(link => link.getAttribute("href") === `#${topSection.id}`);
            if (foundActiveLink) {
                foundActiveLink.classList.add("active");
                activeLink = foundActiveLink;
                moveIndicator(foundActiveLink);
                currentActiveSection = topSection.id;
            }
        }
    }

    observeSections();

    // MutationObserver to handle dynamically added sections
    const mutationObserver = new MutationObserver(() => {
        observeSections();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    // Also observe for attribute changes (e.g., style/size changes)
    mutationObserver.observe(document.body, { attributes: true, subtree: true });

    // ResizeObserver to handle nav link size changes
    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
            if (activeLink) moveIndicator(activeLink);
        });
        links.forEach(link => resizeObserver.observe(link));
    }

    // Fallback: on scroll, check if at top or bottom and update nav
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        if (scrollPosition === 0) {
            // At the very top
            navLinks.forEach(link => link.classList.remove("active"));
            const homeLink = navLinks.find(link => link.getAttribute("href") === "#home");
            if (homeLink) {
                homeLink.classList.add("active");
                activeLink = homeLink;
                moveIndicator(homeLink);
            }
        } else if ((window.innerHeight + scrollPosition) >= document.body.offsetHeight - 2) {
            // At the very bottom
            navLinks.forEach(link => link.classList.remove("active"));
            const lastSection = sectionElements[sectionElements.length - 1];
            const lastLink = navLinks.find(link => link.getAttribute("href") === `#${lastSection.id}`);
            if (lastLink) {
                lastLink.classList.add("active");
                activeLink = lastLink;
                moveIndicator(lastLink);
            }
        }
    });
});