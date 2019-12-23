import { dom as d } from '../lib/state-ui-lib/index.js';
import Grid from './Grid.js';

{/*
    <section class="gallery">
        <Grid/>
    </section>
*/}
const Gallery = (props) => {
    return d(
        'section',
        {
            class: 'gallery'
        },
        Grid(props)
    );
}

export default Gallery;