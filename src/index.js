import _ from 'lodash';
import './index.css';
import './index.less';

function createDomElement() {
    let elements = document.createElement('div');
    elements.innerHTML = _.join(['好的','可以'],'  ');
    elements.classList.add('wrap');
    return elements;
}

let element = createDomElement();

document.body.appendChild(element)