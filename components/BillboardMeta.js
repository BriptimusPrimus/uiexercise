{/*
<nav>
    <MetadataButton/>
    <MetadataButton/>
    ...
</nav>
*/}
const MetadataButtons = ({buttons}) =>  {
    const nav = document.createElement('nav');
    buttons.map(button => MetadataButton({
            ...button
        }))
        .forEach(element => nav.appendChild(element));
    return nav;
}

{/*
<button class="billboard-metadata-button billboard-metadata-button-play">
    {text}
</button>
*/}
const MetadataButton = ({ type, text }) => {
    const className = type === 'play' ?
        'billboard-metadata-button billboard-metadata-button-play' :
        'billboard-metadata-button';
    const button = document.createElement('button');
    button.setAttribute('class', className);
    const textNode = document.createTextNode(text);
    button.appendChild(textNode);
    return button;
}

{/*
<article class="billboard-metadata">
    <img class="billboard-metadata-logo" src="{logo}">
    <p class="billboard-metadata-synopsis">
        {synopsis}
    </p>
    <MetadataButtons/>
</article>
*/}
const BillboardMeta = ({video, buttons, hidden, fadeIn}) => {
    const { logo, synopsis } = video;

    const hiddenClass = hidden || fadeIn ? 'hidden' : '';
    const article = document.createElement('article');
    article.setAttribute('class', `billboard-metadata ${hiddenClass}`);
    
    const logoImg = document.createElement('img');
    logoImg.setAttribute('class', 'billboard-metadata-logo');
    logoImg.setAttribute('src', logo);
    article.appendChild(logoImg);

    if (synopsis) {
        const synopsisText = document.createElement('p');
        synopsisText.setAttribute('class', 'billboard-metadata-synopsis');
        const textNode = document.createTextNode(synopsis);
        synopsisText.appendChild(textNode);
        article.appendChild(synopsisText);
    }
    // To trigger the CSS animation we set the hidden class on the element
    // And we wait for some time before removing it
    if (fadeIn) {
        setTimeout(()=> {
            article.setAttribute('class', 'billboard-metadata');
        }, 500);
    }

    const metaButtons = MetadataButtons({buttons});
    article.appendChild(metaButtons);

    return article;
}

export default BillboardMeta;