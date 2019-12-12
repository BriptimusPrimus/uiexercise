{/*
<nav class="billboard-metadata">
    <img class="billboard-metadata-logo" src="{logo}">
    <p class="billboard-metadata-synopsis">
        {synopsis}
    </p>
    <MetadataButtons/>
</nav>
*/}
const BillboardMeta = ({video, buttons}) => {
    const { logo, synopsis } = video;

    const nav = document.createElement('nav');
    nav.setAttribute('class', 'billboard-metadata');
    
    const logoImg = document.createElement('img');
    logoImg.setAttribute('class', 'billboard-metadata-logo');
    logoImg.setAttribute('src', logo);
    nav.appendChild(logoImg);

    const synopsisText = document.createElement('p');
    synopsisText.setAttribute('class', 'billboard-metadata-synopsis');
    const textNode = document.createTextNode(synopsis);
    synopsisText.appendChild(textNode);
    nav.appendChild(synopsisText);

    return nav;
}

export default BillboardMeta;