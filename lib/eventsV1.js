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
                // DOM manipulation, remove class hidden
                document.querySelector('.billboard-metadata.hidden')
                    .classList.remove('hidden');
            }
        });
    });

    const observeBillboard = function observeBillboard() {
        // Stop checking after first success
        if (store.getState().inlineBillboardIn) {
            return;
        }
        inlineBlbdEl = document.querySelector('.row-billboard-inline');
        inlineBlbdEl && observer.observe(inlineBlbdEl);
    }

    const scrollUpHandler = function scrollUpHandler() {
        console.log('scrollUpHandler', window.scrollY);
        if (window.scrollY > ROW_HEIGHT) {
            return;
        }
        if (store.getState().currentPage === 0) {
            return;
        }

        console.log('scrollUpHandler page =');
        const page = store.getState().currentPage - 1;
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
    }

    const scrollDownHandler = function scrollDownHandler() {
        console.log('scrollDownHandler', window.scrollY);
        // Infinite scroll formula
        // window.scrollY < document.body.scrollHeight - window.innerHeight;
        if (window.scrollY + ROW_HEIGHT  + ROW_HEIGHT < document.body.scrollHeight - window.innerHeight) {
            return;
        }

        console.log('scrollDownHandler page =');
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

    let lastScrollY = 0;
    const onScrollPagination = function onScrollPagination() {
        if (window.scrollY > lastScrollY) {
            lastScrollY = window.scrollY;
            scrollDownHandler();
            return;
        }

        scrollUpHandler();
        lastScrollY = window.scrollY;
    }

    return {
        onScrollPagination,
        observeBillboard
    };
}

export {
    scrollHandlersFactory
};