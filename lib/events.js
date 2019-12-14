import {
    resolvePage,
    resolveLoadedRows
} from './helpers.js';

const shouldFadeIn = function shouldFadeIn(elem) {
    if (!elem || !elem.getBoundingClientRect) {
        return;
    }
    return elem.getBoundingClientRect().bottom <= window.innerHeight;
};

const scrollHandlersFactory = function scrollHandlersFactory(initialState, updateState, constants) {
    let state = initialState;
    let inlineBlbdEl;
    const {
        PAGE_SIZE,
        MAX_LOADED_PAGES,
        ROW_HEIGHT,
        PAGE_HEIGHT        
    } = constants;

    const onScrollFadeIn = function onScrollFadeIn(scrollYPos) {
        // Stop checking after first success
        if (state.inlineBillboardIn) {
            return;
        }

        if (shouldFadeIn(inlineBlbdEl)) {
            state = updateState({
                inlineBillboardIn: true
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
        if (page === state.currentPage) {
            return;
        }

        state = updateState({
            currentPage: page,
            loadedRows: resolveLoadedRows({
                page,
                numOfRows: state.rows.length,
                pageSize: PAGE_SIZE,
                maxLoaded: MAX_LOADED_PAGES
            }),
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
