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
        inlineBillboardIn: false
    };
    // Returns a store with a dispatch function to
    // trigger state changes by dispatching actions.
    const store = createStore(initialState);

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
                state: {
                    inlineBillboardIn: true,
                    fadeIn: true
                }
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
            state: {
                currentPage: page,
                loadedRows: resolveLoadedRows({
                    page,
                    numOfRows: store.getState().rows.length,
                    pageSize: PAGE_SIZE,
                    maxLoaded: MAX_LOADED_PAGES
                }),
                // Set to default value to prevent repetetion
                fadeIn: false
            }
        });
        inlineBlbdEl = document.querySelector('.row-billboard-inline');
    }

    return {
        onScrollFadeIn,
        onScrollPagination
    };
}

export default App;

// // Reducers
// const reducer = function app(state, action) {
//     return {
//         rows: ,
//         billboards: ,
//         videos: 

//         currentPage: ,
//         loadedRows: ,
//         inlineBillboardIn: 
//     };
// }