// App layout
{/* 
<main>
    <section class="gallery">
        <ul>
            <il class="row-videos">
                <ul>
                    <li id={id}>
                        <article class="boxshot">
                            <figure>
                                <img src="{boxart}" alt="{title}">
                            </figure>
                        </article>
                    </li>
                    <li id={id}>
                        ...
                    </li>
                </ul>
            </il>
            <il class="row-videos">
                ...
            </il>
        </ul>
    </section>
</main>
*/}


const Boxshot = ({video}) => {
    return;
}

{/* 
<il class="row-videos">
    <ul>
        <Boxshot/>
        <Boxshot/>
        ...
    </ul>
</il> 
*/}
const RowVideos = ({row, videos}) => {
    const rowVideos = document.createElement('li');
    rowVideos.setAttribute('class', 'row-videos');

    const ul = document.createElement('ul');

    // TODO: convert this into a loop
    const videoId0 = row[0];
    // const boxshot0 = Boxshot({ video: videos[videoId0]});
    // ul.appendChild(boxshot0);
    
    const videoId1 = row[1];
    // const boxshot1 = Boxshot({ video: videos[videoId1]});
    // ul.appendChild(boxshot1);

    rowVideos.appendChild(ul);
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

export function render(data) {
    init(data);
};