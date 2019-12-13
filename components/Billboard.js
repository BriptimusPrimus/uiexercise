import BillboardMeta from './BillboardMeta.js';

{/* 
<li class="row-billboard">
    <header id="id">
        <img class="billboard-background" src="{background}" alt="{title}">
        <BillboardMeta/>
    </header>
</li>
*/}
const Billboard = ({videoIds, structure, videos}) => {
    if (!Array.isArray(videoIds) || videoIds[0] === undefined) {
        return undefined;
    }

    // Grab the first video ID in the row, discard the rest
    const videoId = videoIds[0];
    const video = videos[videoId];

    const li = document.createElement('li');
    li.setAttribute('class', 'row-billboard');

    const header = document.createElement('header');
    header.setAttribute('id', videoId);

    const bgndImg = document.createElement('img');
    bgndImg.setAttribute('src', video.background);
    bgndImg.setAttribute('class', 'billboard-background');
    bgndImg.setAttribute('alt', video.title);
    header.appendChild(bgndImg);

    const metadata = BillboardMeta({
        video,
        buttons: structure.buttons
    });
    header.appendChild(metadata);

    li.appendChild(header);
    return li;
}

export default Billboard;