import Main from './Main.js';

// App layout
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

const App = data => {
    return Main(data);
}

export default App;