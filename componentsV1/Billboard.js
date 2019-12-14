import { dom as d } from '../lib/state-ui-lib/index.js';
import BillboardMeta from './BillboardMeta.js';

{/* 
<li class="row-billboard">
    <header id="id">
        <img class="billboard-background" src="{background}" alt="{title}">
        <BillboardMeta/>
    </header>
</li>
*/}
const Billboard = ({
    videoIds,
    structure,
    videos,
    inlineBillboardIn,
    fadeIn
}) => {
    if (!Array.isArray(videoIds) || videoIds[0] === undefined) {
        return undefined;
    }

    // Grab the first video ID in the row, discard the rest
    const videoId = videoIds[0];
    const video = videos[videoId];

    return d(
        'li',
        {
            class: structure.type === 'inline' ?
                'row-billboard row-billboard-inline' :
                'row-billboard'
        },
        d(
            'header',
            {
                id: `video_${videoId}`
            },
            d(
                'img',
                {
                    src: video.background || video.backgroundShort,
                    class: 'billboard-background',
                    alt: video.title
                }
            ),
            BillboardMeta({
                video,
                buttons: structure.buttons,
                hidden: structure.type === 'inline' && !inlineBillboardIn,
                fadeIn: structure.type === 'inline' && inlineBillboardIn && fadeIn
            })            
        )
    );    
}

export default Billboard;