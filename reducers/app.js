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
        inlineBillboardIn: inlineBillboardIn(state.inlineBillboardIn, action),
        fadeIn: fadeIn(state.fadeIn, action)
    };
}

export default reducer;