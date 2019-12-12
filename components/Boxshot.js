{/*
<img id={id} class="boxshot" src="{boxart}" alt="{title}">
*/}
const Boxshot = ({video}) => {
    const { id, title, boxart } = video;
    const img = document.createElement('img');
    img.setAttribute('id', id);
    img.setAttribute('src', boxart);
    img.setAttribute('alt', title);
    img.setAttribute('class', 'boxshot');
    return img;
}

export default Boxshot;