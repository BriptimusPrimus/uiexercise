import VideosRow from './VideosRow.js';
import Billboard from './Billboard.js';

{/*
    <section class="gallery">
        <ul>
            <Billboard/>
            <VideosRow/>
            <VideosRow/>
            ...
        </ul>
    </section>
*/}
const Gallery = ({rows, billboards, videos}) => {
    const section = document.createElement('section');
    section.setAttribute('class', 'gallery');

    const ul = document.createElement('ul');

    rows.map((videoIds, rowIndex) => {
            // Check for billboard rows
            if (billboards[rowIndex]) {
                return Billboard({
                    videoIds,
                    structure: billboards[rowIndex],
                    videos
                });
            }

            return VideosRow({
                videoIds,
                videos
            })
        })
        .filter(item => item !== undefined)
        .forEach(element => ul.appendChild(element));
    
    section.appendChild(ul);
    return section;
}

export default Gallery;