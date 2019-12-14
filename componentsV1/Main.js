import { dom as d } from '../lib/state-ui-lib/index.js';
import Gallery from './Gallery.js';

{/* 
<main>
   <Gallery/>
</main>
*/}
const Main = props => {
    return d(
        'main',
        null,
        Gallery(props)
    );
}

export default Main;