import { resolveLoadedRows } from '../lib/helpers.js';

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

const keyMapper = function keyMapper(acum, curr) {
    return {
        ...acum,
        [curr]: true
    };
}

const rowsDiff = function rowsDiff(state, action) {
    switch (action.type) {
        case 'SET_PAGE':
            const calc = resolveLoadedRows({
                page: action.page,
                numOfRows: action.numOfRows,
                pageSize: action.pageSize,
                maxLoaded: action.maxLoaded
            });
            const curr = state.loadedRows;
            return {
                remove: calc[0] > curr[0] ?
                    curr.filter(num => num < calc[0]).reduce(keyMapper, {}) :
                    curr.filter(num => num > calc[calc.length - 1]).reduce(keyMapper, {}),
                add: calc[0] >= curr[0] ?
                    calc.filter(num => num > curr[curr.length - 1]).reduce(keyMapper, {}) :
                    calc.filter(num => num < curr[0]).reduce(keyMapper, {})
            };
        default:
            return {};
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

const reducer = function reducer(state, action) {
    return {
        rows: rows(state.rows, action),
        billboards: billboards(state.billboards, action),
        videos: videos(state.videos, action),
        currentPage: currentPage(state.currentPage, action),
        loadedRows: loadedRows(state.loadedRows, action),
        rowsDiff: rowsDiff(state, action),
        inlineBillboardIn: inlineBillboardIn(state.inlineBillboardIn, action),
        fadeIn: fadeIn(state.fadeIn, action)
    };
}

export default reducer;