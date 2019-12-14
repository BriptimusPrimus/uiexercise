import { dom as d } from '../lib/state-ui-lib/index.js';
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
    return d(
        'section',
        {
            class: 'gallery'
        },
        d(
            'ul',
            null,
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
        )
    );
}

export default Gallery;