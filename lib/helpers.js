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
        (botPage * pageSize) + pageSize - 1;

    return Array.from(
        Array(botRow - topRow + 1),
        (x, index) => index + topRow
    );
}

const throttle = function throttle(fn, delay) {
    let running = false;
    let onceMore = false;
    return function() {
        const next = () => {
            fn.apply(this, arguments);
            setTimeout(() => {
                if (onceMore) {
                    onceMore = false;
                    next();
                } else {
                    running = false;
                }
            }, delay);
        }
        if (!running) {
            running = true;
            next();
        } else {
            onceMore = true;
        }
    }
}

export {
    register,
    resolvePage,
    resolveLoadedRows,
    throttle
};