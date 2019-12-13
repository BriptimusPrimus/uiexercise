import Main from './Main.js';

const constants = {
    PAGE_SIZE: 3,
    MAX_LOADED_PAGES: 3
}; 

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
            Array(constants.PAGE_SIZE * constants.MAX_LOADED_PAGES),
            (x, index) => index
        ),
        lastPageLoaded: constants.MAX_LOADED_PAGES - 1
    };

    const element = view(state);
    // In order to make a component stateful, we must
    // register the root node and the rendering function.    
    const updateState = register({
        component: element,
        view,
        initialState: state
    });

    const totalPages = Math.ceil(state.rows.length / constants.PAGE_SIZE);
    let last_known_scroll_position = 0;
    let ticking = false;

    // window.scrollY < document.body.scrollHeight - window.innerHeight;
    const scrollHandler = function scrollHandler(scrollYPos) {
        if (state.lastPageLoaded >= totalPages - 1) {
            return;
        }
        if (scrollYPos < document.body.scrollHeight - window.innerHeight) {
            return;
        }

        state = updateState({
            currentPage: state.currentPage + 1,
            loadedRows: state.loadedRows.concat(
                Array.from(
                    Array(constants.PAGE_SIZE),
                    (x, index) => index + state.loadedRows.length
                )
            ),
            lastPageLoaded: state.lastPageLoaded + 1
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

export default App;
