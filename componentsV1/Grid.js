import { createStore, dom as d } from '../lib/state-ui-lib/index.js';
import reducer from '../reducers/app.js';
import {
    throttle
} from '../lib/helpers.js';
import { scrollHandlersFactory } from '../lib/eventsV1.js';
import { GridView, RowView } from './GridView.js';

import {
    PAGE_SIZE,
    MAX_LOADED_PAGES,
    ROW_HEIGHT,
    PAGE_HEIGHT,
    SCROLL_DELAY
} from '../lib/constants.js';

const update = function update(root) {
    return function renderOnUpdate(state) {
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
        elements.forEach(el => {
            if (remove[el.dataset.rowId] === true) {
                root.removeChild(el);
            }
        });

        const addKeys = Object.keys(add);
        if (addKeys[0] > Number(elements[elements.length - 1].dataset.rowId)) {
            addKeys.forEach(rowIdx => {
                const el = RowView({
                    ...state,
                    rowIdx
                });
                if (el) {
                    root.appendChild(el);
                }
            });
        } else {
            for (let i = addKeys.length - 1; i >= 0; i-=1) {
                const rowIdx = addKeys[i];
                const el = RowView({
                    ...state,
                    rowIdx
                });
                if (el) {
                    root.prepend(el);
                }
            }
        }
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

    setTimeout(() => {
        observeBillboard();
    });    

    return element;
}

export default Grid;
