let service_info_compareIndex = 0;
let service_info_compare = Array.from(document.querySelectorAll('.service_info_compare_cate'));

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.service_info_compare_list');
    let items = Array.from(document.querySelectorAll('.service_info_compare_cate'));
    
    let resetTimer;

    const adjustItems = () => {
        const containerHeight = container.offsetHeight;
        const scrollTop = container.scrollTop;

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
    };

    const appendNewItem = () => {
        const newItem = items[service_info_compareIndex % items.length].cloneNode(true);
        container.appendChild(newItem);
        items = Array.from(document.querySelectorAll('.service_info_compare_cate'));
        service_info_compareIndex++;
        adjustItems();
    };

    const prependNewItem = () => {
        const newItem = items[items.length - 1 - (service_info_compareIndex % items.length)].cloneNode(true);
        container.insertBefore(newItem, items[0]);
        const initialScrollTop = container.scrollTop;
        items = Array.from(document.querySelectorAll('.service_info_compare_cate'));
        container.scrollTop = initialScrollTop + newItem.offsetHeight;
        service_info_compareIndex++;
        adjustItems();
    };

    const observer = new MutationObserver(() => {
        adjustItems();
    });

    observer.observe(container, { childList: true });

    container.addEventListener('scroll', () => {
        const containerHeight = container.offsetHeight;
        const scrollTop = container.scrollTop;

        // Add new item if scrolled near bottom
        if (scrollTop + containerHeight >= container.scrollHeight - 50) {
            appendNewItem();
        }

        // Add new item if scrolled near top
        if (scrollTop <= 50) {
            prependNewItem();
        }

        adjustItems();
    });

    // Initial adjustment
    adjustItems();
});
