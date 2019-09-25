import _ from 'lodash';
import './index.css'
import './index.less'

function createDomElement() {
    let dom = document.createElement('div');
    dom.innerHTML = _.join(['好的','可以'],'  ');
    dom.classList.add('wrap')
    return dom
}

let element = createDomElement();

document.body.appendChild(element)