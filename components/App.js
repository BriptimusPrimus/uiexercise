import Main from './Main.js';

const constants = {
    PAGE_SIZE: 6,
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
        loadedRows: [0, 1]
    };

    const element = view(state);
    // In order to make a component stateful, we must
    // register the root node and the rendering function.    
    const updateState = register({
        component: element,
        view,
        initialState: state
    });

    document.body.addEventListener('click', (e) => {
        state = updateState({
            currentPage: state.currentPage + 1,
            loadedRows: state.loadedRows.concat(state.loadedRows.length)
        });
        console.log('state changed:', state);
    });

    // All component functions (stateless or stateful)
    // must return the root node    
    return element;
}

export default App;
