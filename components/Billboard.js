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
    const bgnClassName = structure.type === 'inline' ?
        'row-billboard row-billboard-inline' :
        'row-billboard';

    const li = document.createElement('li');
    li.setAttribute('class', bgnClassName);

    const header = document.createElement('header');
    header.setAttribute('id', `video_${videoId}`);

    const bgndImg = document.createElement('img');
    const imgSrc = video.background || video.backgroundShort;
    bgndImg.setAttribute('src', imgSrc);
    bgndImg.setAttribute('class', 'billboard-background');
    bgndImg.setAttribute('alt', video.title);
    header.appendChild(bgndImg);

    const metadata = BillboardMeta({
        video,
        buttons: structure.buttons,
        hidden: structure.type === 'inline' && !inlineBillboardIn,
        fadeIn: structure.type === 'inline' && inlineBillboardIn && fadeIn
    });
    header.appendChild(metadata);

    li.appendChild(header);
    return li;
}

export default Billboard;