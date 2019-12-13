import Gallery from './Gallery.js';

// Layout
{/* 
<main>
    <section class="gallery">
        <ul>
            <il class="row-videos">
                <article class="boxshot">
                    <img id={id} class="boxshot" src="{boxart}" alt="{title}">
                    <img id={id} class="boxshot" src="{boxart}" alt="{title}">
                    ...
                </article>
            </il>
            <il class="row-videos">
                ...
            </il>
            ...
        </ul>
    </section>
</main>
*/}

{/* 
<main>
   <Gallery/>
</main> 
*/}
const Main = (props) => {
    const main = document.createElement('main');

    const gallery = Gallery(props);
    main.appendChild(gallery);

    return main;
}

export default Main;