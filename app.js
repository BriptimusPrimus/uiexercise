import App from './components/App.js';

const init = function init(initialData) {
    console.log('initialData:', initialData);
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
            [video.id]: {
                id: video.id,
                title: video.title,
                boxart: video.boxart
            }
        }
    };

    return {
        rows: data.rows,
        billboards: data.billboards,
        videos: data.videos.reduce(createIdsMap, {})
    };
}

export function render(data) {
    const processedData = preprocessData(data);
    init(processedData);
};