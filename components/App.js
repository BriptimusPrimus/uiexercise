import Main from './Main.js';

const PAGE_SIZE = 6;
const MAX_LOADED_PAGES = 3;
const ROW_HEIGHT = 166;
const PAGE_HEIGHT = PAGE_SIZE * ROW_HEIGHT;

const register = function register({component, view, initialState}) {
    let currentState = initialState || {};

    function render(newState) {
      // Create new version of the component using new state
      const newComponent = view(newState);
  
      // Replace old version with new version
      const { parentNode } = component;
      parentNode.replaceChild(newComponent, component);
  
      // Hold currently active node for the next time
      component = newComponent;
    }
  
    const updateState = function updateState(stateChanges) {
        currentState = {
            ...currentState,
            ...stateChanges
        };
        render(currentState);
        return currentState;
    }

    return updateState;
}

const view = function view(state) {
    return Main(state); 
}

const App = data => {
    let state = {
        ...data,
        currentPage: 0,
        loadedRows: resolveLoadedRows({
            page: 0,
            numOfRows: data.rows.length,
            pageSize: PAGE_SIZE,
            maxLoaded: MAX_LOADED_PAGES
        }),
    };

    const element = view(state);
    // In order to make a component stateful, we must
    // register the root node and the rendering function.    
    const updateState = register({
        component: element,
        view,
        initialState: state
    });

    let lastKnownScrollPos = 0;
    let ticking = false;
    const scrollHandler = function scrollHandler(scrollYPos) {
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
        // console.log('state changed:', state);
    }
    window.addEventListener('scroll', (e) => {
        lastKnownScrollPos = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                scrollHandler(lastKnownScrollPos);
                ticking = false;
            });
            ticking = true;
        }
    });

    // All component functions (stateless or stateful)
    // must return the root node    
    return element;
}

const resolvePage = function resolvePage(scrollYPos, pageHeight) {
    return Math.floor(scrollYPos / pageHeight);
}

const resolveLoadedRows = function resolveLoadedRows({page, numOfRows, pageSize, maxLoaded}) {
    const lastRow = numOfRows - 1;
    const totalPages = Math.ceil(numOfRows / pageSize);
    const adjacentPages = maxLoaded - 1;
    const numofBotPages = Math.ceil(adjacentPages / 2);

    const botPage = (page + numofBotPages) > totalPages ?
        totalPages :
        page + numofBotPages;

    const botRow = ((botPage * pageSize) + pageSize - 1) > lastRow ?
        lastRow :
        ((botPage * pageSize) + pageSize - 1);

    return Array.from(
        Array(botRow + 1),
        (x, index) => index
    );
}

export default App;
