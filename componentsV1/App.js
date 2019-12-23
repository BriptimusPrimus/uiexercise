import { createStore, register } from '../lib/state-ui-lib/index.js';
import Main from './Main.js';
import reducer from '../reducers/app.js';
import {
    resolvePage,
    resolveLoadedRows,
    throttle
} from '../lib/helpers.js';
import { scrollHandlersFactory } from '../lib/eventsV1.js';

const PAGE_SIZE = 3;
const MAX_LOADED_PAGES = 7;
const ROW_HEIGHT = 166;
const PAGE_HEIGHT = PAGE_SIZE * ROW_HEIGHT;
const SCROLL_DELAY = 2000;

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
    return view(initialState);
    // // Returns a store with a dispatch function to
    // // trigger state changes by dispatching actions.
    // const store = createStore(initialState, reducer);

    // // In order to make a component stateful, we must
    // // register the rendering function (view) with the store.
    // const element = register({
    //     view,
    //     store
    // });

    // const { onScrollPagination, observeBillboard } = scrollHandlersFactory(store, {
    //     PAGE_SIZE,
    //     MAX_LOADED_PAGES,
    //     ROW_HEIGHT,
    //     PAGE_HEIGHT
    // });

    // const throttledScroll = throttle(() => {
    //     onScrollPagination();
    // }, SCROLL_DELAY);
    // window.addEventListener('scroll', throttledScroll);

    // setTimeout(() => {
    //     observeBillboard();
    // }, 10);

    // // All component functions (stateless or stateful)
    // // must return the root node
    // return element;
}

export default App;
