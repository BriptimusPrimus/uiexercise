import { dom as d } from '../lib/state-ui-lib/index.js';

{/*
<img id={id} class="boxshot" src="{boxart}" alt="{title}">
*/}
const Boxshot = ({video}) => {
    const { id, title, boxart } = video;
    const img = document.createElement('img');
    return d(
        'img',
        {
            id: `video_${id}`,
            src: boxart,
            alt: title,
            class: 'boxshot'
        }
    );
}

export default Boxshot;