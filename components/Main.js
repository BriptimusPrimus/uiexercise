import Gallery from './Gallery.js';

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

export default Main;