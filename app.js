// App layout
{/* 
<main>
    <section class="gallery">
        <ul>
            <il class="row-videos">
                <article class="boxshot">
                    <img id={id} class="boxshot" src="{boxart}" alt="{title}">
                    <img id={id} class="boxshot" src="{boxart}" alt="{title}">
                    ...
                </article>
            </il>
            <il class="row-videos">
                ...
            </il>
            ...
        </ul>
    </section>
</main>
*/}


{/*
<img id={id} class="boxshot" src="{boxart}" alt="{title}">
*/}
const Boxshot = ({video}) => {
    const { id, title, boxart } = video;
    const img = document.createElement('img');
    img.setAttribute('id', id);
    img.setAttribute('src', boxart);
    img.setAttribute('alt', title);
    img.setAttribute('class', 'boxshot');
    return img;
}

{/* 
<il class="row-videos">
    <article>
        <Boxshot/>
        <Boxshot/>
        ...
    </article>
</il> 
*/}
const VideosRow = ({videoIds, videos}) => {
    const videosRow = document.createElement('li');
    videosRow.setAttribute('class', 'row-videos');

    const article = document.createElement('article');
    const boxshots = videoIds.map(videoId => Boxshot({
            video: videos[videoId]
        }))
        .forEach(element => article.appendChild(element));

    videosRow.appendChild(article);
    return videosRow;
}

{/*
    <section class="gallery">
        <ul>
            <RowVideos/>
            <RowVideos/>
            ...
        </ul>
    </section>
*/}
const Gallery = ({rows, billboards, videos}) => {
    const section = document.createElement('section');
    section.setAttribute('class', 'gallery');

    const ul = document.createElement('ul');

    rows.map(videoIds => VideosRow({
            videoIds,
            videos
        }))
        .forEach(element => ul.appendChild(element));
    
    section.appendChild(ul);
    return section;
}

{/* 
<main>
   <Gallery/>
</main> 
*/}
const Main = ({rows, billboards, videos}) => {
    const main = document.createElement('main');

    const gallery = Gallery({rows, billboards, videos});
    main.appendChild(gallery);

    return main;
}

const App = data => {
    return Main(data);
}

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