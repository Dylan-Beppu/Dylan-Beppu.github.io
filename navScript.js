document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector("#NewNav ul");
    const indicator = nav.querySelector(".nav-indicator");
    const links = nav.querySelectorAll("a");

    function moveIndicator(el) {
        indicator.style.width = el.offsetWidth + "px";
        indicator.style.left = el.offsetLeft + "px";
    }

    // Set initial position to active
    const activeLink = nav.querySelector("a.active") || links[0];
    moveIndicator(activeLink);

    links.forEach(link => {
        link.addEventListener("mouseenter", () => moveIndicator(link));
        link.addEventListener("mouseleave", () => moveIndicator(activeLink));
        link.addEventListener("click", () => {
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            moveIndicator(link);
        });
    });
});