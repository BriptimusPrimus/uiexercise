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
const Gallery = ({
    loadedRows,
    rows,
    billboards,
    videos,
    inlineBillboardIn,
    fadeIn
}) => {
    const section = document.createElement('section');
    section.setAttribute('class', 'gallery');

    const ul = document.createElement('ul');

    loadedRows.map((loadedRowIdx) => {
            const videoIds = rows[loadedRowIdx];
            if (!videoIds) {
                return undefined;
            }

            // Check for billboard rows
            if (billboards[loadedRowIdx]) {
                return Billboard({
                    videoIds,
                    structure: billboards[loadedRowIdx],
                    videos,
                    inlineBillboardIn,
                    fadeIn
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