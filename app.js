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
const RowVideos = ({row, videos}) => {
    const rowVideos = document.createElement('li');
    rowVideos.setAttribute('class', 'row-videos');

    const article = document.createElement('article');

    // TODO: convert this into a loop
    const videoId0 = row[0];
    const boxshot0 = Boxshot({ video: videos[videoId0]});
    article.appendChild(boxshot0);
    
    const videoId1 = row[1];
    const boxshot1 = Boxshot({ video: videos[videoId1]});
    article.appendChild(boxshot1);

    rowVideos.appendChild(article);
    return rowVideos;
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
    
    // TODO: convert this into a loop
    const row1 = RowVideos({
        row: rows[1],
        videos
    });
    ul.appendChild(row1);
    
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