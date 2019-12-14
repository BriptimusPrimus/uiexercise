import { dom as d } from '../lib/state-ui-lib/index.js';

{/*
<nav>
    <MetadataButton/>
    <MetadataButton/>
    ...
</nav>
*/}
const MetadataButtons = ({buttons}) =>  {
    return d(
        'nav',
        null,
        buttons.map(button => MetadataButton({
            ...button
        }))        
    );
}

{/*
<button class="billboard-metadata-button billboard-metadata-button-play">
    {text}
</button>
*/}
const MetadataButton = ({ type, text }) => {
    return d(
        'button',
        {
            class: type === 'play' ?
                'billboard-metadata-button billboard-metadata-button-play' :
                'billboard-metadata-button'
        },
        text
    );
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
    const element = d(
        'article',
        {
            class: `billboard-metadata ${hiddenClass}`
        },
        d(
            'img',
            {
                class: 'billboard-metadata-logo',
                src: logo
            }
        ),
        synopsis ? d(
            'p',
            {
                class: 'billboard-metadata-synopsis',                
            },
            synopsis
        ) : null,
        MetadataButtons({buttons})
    );

    // To trigger the CSS animation we set the hidden class on the element
    // And we wait for some time before removing it
    if (fadeIn) {
        setTimeout(()=> {
            element.setAttribute('class', 'billboard-metadata');
        }, 500);
    }

    return element;
}

export default BillboardMeta;