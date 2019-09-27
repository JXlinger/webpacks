import _ from 'lodash';
import './index.css';
import './index.less';
import Imgsrc from './assets/122.jpeg';
import axios from 'axios';

const {
  printMe,
  alertLate
} = require('./print');

function createDomElement() {
  const elements = document.createElement('div');
  elements.innerHTML = _.join(['好的', '可以'], '  ');
  elements.classList.add('wrap');

  const Img = new Image();
  Img.src = Imgsrc;
  elements.appendChild(Img);

  const btn = document.createElement('button');
  btn.classList.add('btn01');
  btn.innerHTML = '可以吗';
  btn.onclick = printMe;

  const btns = document.createElement('button');
  btns.classList.add('btn02');
  btns.innerHTML = '第二按钮';
  btns.onclick = alertLate;
  elements.appendChild(btn);
  elements.appendChild(btns);

  return elements;
}

const element = createDomElement();

document.body.appendChild(element);

axios.get('api/banners', {

}).then(res => {
  console.log(res);
});
