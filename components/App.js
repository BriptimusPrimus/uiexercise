import Main from './Main.js';

const PAGE_SIZE = 3;
const MAX_LOADED_PAGES = 5;
const ROW_HEIGHT = 166;
const PAGE_HEIGHT = PAGE_SIZE * ROW_HEIGHT;

const register = function register({component, view, initialState}) {
    let currentState = initialState || {};
    console.log('initialState:', initialState);

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
        loadedRows: Array.from(
            Array(PAGE_SIZE * MAX_LOADED_PAGES),
            (x, index) => index
        )
    };

    const element = view(state);
    // In order to make a component stateful, we must
    // register the root node and the rendering function.    
    const updateState = register({
        component: element,
        view,
        initialState: state
    });

    let last_known_scroll_position = 0;
    let ticking = false;

    const scrollHandler = function scrollHandler(scrollYPos) {
        // Uncomment for Infinite scroll
        // window.scrollY < document.body.scrollHeight - window.innerHeight;
        // if (scrollYPos < document.body.scrollHeight - window.innerHeight) {
        //     return;
        // }
        const page = resolvePage(scrollYPos, PAGE_HEIGHT, state.currentPage, MAX_LOADED_PAGES);
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
        console.log('state changed:', state);
    }
    window.addEventListener('scroll', (e) => {
        const last_known_scroll_position = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(function() {
            scrollHandler(last_known_scroll_position);
            ticking = false;
          });
          ticking = true;
        }
    });

    // All component functions (stateless or stateful)
    // must return the root node    
    return element;
}

const resolvePage = function resolvePage(scrollYPos, pageHeight, page, maxLoaded) {
    const topPage = resolveTopPage(page, maxLoaded);
    return Math.floor(scrollYPos / pageHeight) + topPage;
}

const resolveTopPage = function resolveTopPage(page, maxLoaded) {
    const adjacentPages = maxLoaded - 1;
    const numofTopPages = Math.floor(adjacentPages / 2);
    return (page - numofTopPages) < 0 ?
        0 :
        page - numofTopPages;
}

const resolveBotPage = function resolveBotPage(page, numOfRows, pageSize, maxLoaded) {
    const totalPages = Math.ceil(numOfRows / pageSize);
    const adjacentPages = maxLoaded - 1;
    const numofBotPages = Math.ceil(adjacentPages / 2);
    return (page + numofBotPages) > totalPages ?
        totalPages :
        page + numofBotPages;    
}

const resolveLoadedRows = function resolveLoadedRows({page, numOfRows, pageSize, maxLoaded}) {
    const lastRow = numOfRows - 1;

    const topPage = resolveTopPage(page, maxLoaded);
    const botPage = resolveBotPage(page, numOfRows, pageSize, maxLoaded);

    const topRow = topPage * pageSize;
    const botRow = ((botPage * pageSize) + pageSize - 1) > lastRow ?
        lastRow :
        ((botPage * pageSize) + pageSize - 1);

    return Array.from(
        Array(botRow - topRow + 1),
        (x, index) => index + topRow
    );
}

export default App;
