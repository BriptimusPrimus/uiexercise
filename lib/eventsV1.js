import { resolvePage } from '../lib/helpers.js';

const shouldFadeIn = function shouldFadeIn(elem) {
    if (!elem || !elem.getBoundingClientRect) {
        return;
    }
    return elem.getBoundingClientRect().bottom <= window.innerHeight;
};

const scrollHandlersFactory = function scrollHandlersFactory(store, constants) {
    let inlineBlbdEl;
    const {
        PAGE_SIZE,
        MAX_LOADED_PAGES,
        ROW_HEIGHT,
        PAGE_HEIGHT        
    } = constants;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                store.dispatch({
                    type: 'FADE_IN'
                });
                observer.unobserve(entry.target);
            }
        });
    });

    const observeBillboard = function observeBillboard() {
        // Stop checking after first success
        if (store.getState().inlineBillboardIn) {
            return;
        }
        inlineBlbdEl = document.querySelector('.row-billboard-inline');
        observer.observe(inlineBlbdEl);
    }

    const onScrollPagination = function onScrollPagination(scrollYPos) {
        // Infinite scroll formula
        // window.scrollY < document.body.scrollHeight - window.innerHeight;
        if (scrollYPos + ROW_HEIGHT + ROW_HEIGHT < document.body.scrollHeight - window.innerHeight) {
            return;
        }

        const page = store.getState().currentPage + 1;
        const numOfRows = store.getState().rows.length;
        const totalPages = Math.ceil(numOfRows / PAGE_SIZE);
        // Avoid changing the state if last page has been reached
        if (page > totalPages) {
            return;
        }

        store.dispatch({
            type: 'SET_PAGE',
            page,
            numOfRows,
            pageSize: PAGE_SIZE,
            maxLoaded: MAX_LOADED_PAGES
        });
        observeBillboard();
    }

    return {
        onScrollPagination
    };
}

export {
    scrollHandlersFactory
};