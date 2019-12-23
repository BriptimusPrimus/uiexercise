import { createStore, dom as d } from '../lib/state-ui-lib/index.js';
import reducer from '../reducers/app.js';
import {
    throttle
} from '../lib/helpers.js';
import { scrollHandlersFactory } from '../lib/eventsV1.js';
import { GridView, RowView } from './GridView.js';

const PAGE_SIZE = 3;
const MAX_LOADED_PAGES = 7;
const ROW_HEIGHT = 166;
const PAGE_HEIGHT = PAGE_SIZE * ROW_HEIGHT;
const SCROLL_DELAY = 2000;

const update = function update(root) {
    console.log('Root Element:', root);
    return function renderOnUpdate(state) {
        console.log(state);
        if (!state.rowsDiff) {
            return;
        }
        const { remove, add } = state.rowsDiff;
        if (!remove || !add) {
            return;
        }
        if (Object.keys(remove).length < 1 && Object.keys(add).length < 1) {
            return;
        }

        const elements = Array.from(root.children);
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            console.log(el.id);
            if (remove[el.dataset.rowId] === true) {
                console.log('YES, REMOVE');
                root.removeChild(el);
            }
        }

        Object.keys(add).forEach(rowIdx => {
            const el = RowView({
                ...state,
                rowIdx
            });
            if (el) {
                root.appendChild(el);
            }
        });
    }
}

const Grid = (props) => {
    const element = GridView(props);

    // Returns a store with a dispatch function to
    // trigger state changes by dispatching actions.
    const store = createStore(props, reducer);

    // // In order to make a component stateful, we must
    // // register the rendering function (view) with the store.
    store.subscribe(update(element));

    const { onScrollPagination, observeBillboard } = scrollHandlersFactory(store, {
        PAGE_SIZE,
        MAX_LOADED_PAGES,
        ROW_HEIGHT,
        PAGE_HEIGHT
    });

    const throttledScroll = throttle(() => {
        onScrollPagination();
    }, SCROLL_DELAY);
    window.addEventListener('scroll', throttledScroll);

    return element;
}

export default Grid;
