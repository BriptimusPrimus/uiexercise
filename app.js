import App from './components/App.js';

const init = function init(initialData) {
    const element = App(initialData);
    const container = document.getElementById('root');
    container.innerHtml = '';
    container.appendChild(element);
}

// Changes the structure of the initial data to provide
// faster and easier video lookup
const preprocessData = function preprocessData(data) {
    const createIdsMap = (acum, video) => {
        return {
            ...acum,
            [video.id]: video
        };
    };

    const createRowsMap = (acum, billboard) => {
        return {
            ...acum,
            [billboard.row]: billboard
        };
    }

    return {
        rows: data.rows,
        billboards: data.billboards.reduce(createRowsMap, {}),
        videos: data.videos.reduce(createIdsMap, {})
    };
}

export function render(data) {
    const processedData = preprocessData(data);
    init(processedData);
};