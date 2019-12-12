import VideosRow from './VideosRow.js';

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

export default Gallery;