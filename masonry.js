document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('#ProjectContainer');
    const items = Array.from(grid.children);

    function resizeGridItem(item) {
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));
        const rowSpan = Math.ceil((item.querySelector('.Project-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = `span ${rowSpan}`;
    }

    function resizeAllGridItems() {
        items.forEach(item => resizeGridItem(item));
    }

    window.addEventListener('resize', resizeAllGridItems);
    resizeAllGridItems();
});