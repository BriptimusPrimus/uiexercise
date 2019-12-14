import { dom as d } from '../lib/state-ui-lib/index.js';
import Boxshot from './Boxshot.js';

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
    return d(
        'li',
        {
            class: 'row-videos'
        },
        d(
            'article',
            null,
            videoIds.map(videoId => Boxshot({
                video: videos[videoId]
            }))            
        )
    );
}

export default VideosRow;