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
    const videosRow = document.createElement('li');
    videosRow.setAttribute('class', 'row-videos');

    const article = document.createElement('article');
    const boxshots = videoIds.map(videoId => Boxshot({
            video: videos[videoId]
        }))
        .forEach(element => article.appendChild(element));

    videosRow.appendChild(article);
    return videosRow;
}

export default VideosRow;