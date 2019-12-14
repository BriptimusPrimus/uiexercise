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

export {
    register,
    resolvePage,
    resolveLoadedRows
};