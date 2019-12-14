import { createStore, register } from '../lib/state-ui-lib/index.js';
import Main from './Main.js';
import reducer from '../reducers/app.js';
import {
    resolvePage,
    resolveLoadedRows    
} from '../lib/helpers.js';
import { scrollHandlersFactory } from '../lib/eventsV1.js';

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

export default App;
