import _ from 'lodash';
import './index.css';
import './index.less';
import Imgsrc from './assets/122.jpeg'

let {printMe, alertLate} = require('./print.js')

function createDomElement() {
    let elements = document.createElement('div');
    elements.innerHTML = _.join(['好的','可以'],'  ');
    elements.classList.add('wrap');
    
    let Img = new Image();
    Img.src = Imgsrc;
    elements.appendChild(Img);
    
    let btn = document.createElement('button');
    btn.innerHTML = '点这里';
    btn.onclick = printMe;
    btn.onclick = alertLate;
    elements.appendChild(btn);
    
    return elements;
}

let element = createDomElement();

document.body.appendChild(element)