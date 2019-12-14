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

    const onScrollFadeIn = function onScrollFadeIn(scrollYPos) {
        // Stop checking after first success
        if (store.getState().inlineBillboardIn) {
            return;
        }

        if (shouldFadeIn(inlineBlbdEl)) {
            store.dispatch({
                type: 'FADE_IN'
            });
        }
    }

    const onScrollPagination = function onScrollPagination(scrollYPos) {
        // Infinite scroll formula
        // window.scrollY < document.body.scrollHeight - window.innerHeight;
        if (scrollYPos + ROW_HEIGHT < document.body.scrollHeight - window.innerHeight) {
            return;
        }
        const page = resolvePage(scrollYPos, PAGE_HEIGHT);
        if (page === store.getState().currentPage) {
            return;
        }

        store.dispatch({
            type: 'SET_PAGE',
            page,
            numOfRows: store.getState().rows.length,
            pageSize: PAGE_SIZE,
            maxLoaded: MAX_LOADED_PAGES
        });
        inlineBlbdEl = document.querySelector('.row-billboard-inline');
    }

    return {
        onScrollFadeIn,
        onScrollPagination
    };
}

export {
    scrollHandlersFactory
};