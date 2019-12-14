import { createStore, register } from '../lib/state-ui-lib/index.js';
import Main from './Main.js';
import {
    resolvePage,
    resolveLoadedRows    
} from '../lib/helpers.js';
// import { scrollHandlersFactory } from '../lib/events.js';

const PAGE_SIZE = 6;
const MAX_LOADED_PAGES = 3;
const ROW_HEIGHT = 166;
const PAGE_HEIGHT = PAGE_SIZE * ROW_HEIGHT;

const view = function view(state) {
    return Main(state); 
}

const App = data => {
    const initialState = {
        ...data,
        currentPage: 0,
        loadedRows: resolveLoadedRows({
            page: 0,
            numOfRows: data.rows.length,
            pageSize: PAGE_SIZE,
            maxLoaded: MAX_LOADED_PAGES
        }),
        inlineBillboardIn: false,
        fadeIn: false
    };
    // Returns a store with a dispatch function to
    // trigger state changes by dispatching actions.
    const store = createStore(initialState, reducer);

    // In order to make a component stateful, we must
    // register the rendering function (view) with the store.
    const element = register({
        view,
        store
    });

    const {
        onScrollFadeIn,
        onScrollPagination
    } = scrollHandlersFactory(store, {
        PAGE_SIZE,
        MAX_LOADED_PAGES,
        ROW_HEIGHT,
        PAGE_HEIGHT
    });

    let lastKnownScrollPos = 0;
    let ticking = false;
    window.addEventListener('scroll', (e) => {
        lastKnownScrollPos = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                onScrollPagination(lastKnownScrollPos);
                onScrollFadeIn();
                ticking = false;
            });
            ticking = true;
        }
    });

    // All component functions (stateless or stateful)
    // must return the root node
    return element;
}

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

export default App;


// Reducers
const rows = function rows(state) {
    return state;
}

const billboards = function billboards(state) {
    return state;
}

const videos = function videos(state) {
    return state;
}

const currentPage = function currentPage(state, action) {
    switch (action.type) {
        case 'SET_PAGE':
            return action.page;
        default:
            return state;
    }
    return state;
}

const loadedRows = function loadedRows(state, action) {
    switch (action.type) {
        case 'SET_PAGE':
            return resolveLoadedRows({
                page: action.page,
                numOfRows: action.numOfRows,
                pageSize: action.pageSize,
                maxLoaded: action.maxLoaded
            });
        default:
            return state;
    }
}

const inlineBillboardIn = function inlineBillboardIn(state, action) {
    switch (action.type) {
        case 'FADE_IN':
            return true;
        default:
            return state;
    }
}

const fadeIn = function fadeIn(state, action) {
    switch (action.type) {
        case 'FADE_IN':
            return true;
        case 'SET_PAGE':
            return false;
        default:
            return state;
    }
}

const reducer = function app(state, action) {
    return {
        rows: rows(state.rows, action),
        billboards: billboards(state.billboards, action),
        videos: videos(state.videos, action),
        currentPage: currentPage(state.currentPage, action),
        loadedRows: loadedRows(state.loadedRows, action),
        inlineBillboardIn: inlineBillboardIn(state.inlineBillboardIn, action),
        fadeIn: fadeIn(state.fadeIn, action)
    };
}