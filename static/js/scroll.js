// script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.crops_list');
    const items = document.querySelectorAll('.crops_info');
    let scrolled = false;

    container.addEventListener('scroll', () => {
        const containerHeight = container.offsetHeight;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;

        if (!scrolled && scrollTop > 0) {
            scrolled = true;
            const spacerTop = document.createElement('div');
            spacerTop.style.height = `${containerHeight / 2.7}px`;
            container.prepend(spacerTop);

            const spacerBottom = document.createElement('div');
            spacerBottom.style.height = `${containerHeight / 2}px`;
            container.append(spacerBottom);
        }

        items.forEach(item => {
            const itemTop = item.offsetTop - scrollTop;
            const itemCenter = itemTop + item.offsetHeight / 2;
            const containerCenter = containerHeight / 2;

            const distanceFromCenter = Math.abs(containerCenter - itemCenter);
            const scale = Math.max(0.8, 1 - distanceFromCenter / containerCenter * 0.5);

            if (distanceFromCenter < containerCenter / 2) {
                item.classList.add('grow');
                item.classList.remove('shrink');
            } else {
                item.classList.add('shrink');
                item.classList.remove('grow');
            }

            item.style.transform = `scale(${scale})`;
            item.style.opacity = scale;
        });
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            items.forEach(item => {
                item.classList.remove('grow', 'shrink');
                item.style.transform = 'scale(1)';
                item.style.opacity = 1;
            });
        }, 500);
    });

    let resetTimer;
});