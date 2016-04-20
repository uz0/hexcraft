'use strict';

var authGui = {
  id: 'authBg',
  component: 'Window',
  padding: 4,
  position: {
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 200
  },
  width: 400,
  height: 400,
  children: [{
    id: 'textAuth',
    text: 'Авторизация',
    font: {
      size: '30px',
      color: '#000'
    },
    component: 'Label',
    position: {
      x: 95 ,
      y: 20
    },
    width: 200,
    height: 50
  },
  {
    id: 'authUsername',
    text: '',
    component: 'Input',
    position: {
      x: 75,
      y: 100
    },
    width: 250,
    height: 50
  },
  {
    id: 'authPassword',
    text: '',
    component: 'Input',
    position: {
      x: 75,
      y: 200
    },
    width: 250,
    height: 50
  },
  {
    id: 'authSubmit',
    text: 'Вход',
    component: 'Button',
    position: {
      x: 90,
      y: 300
    },
    width: 100,
    height: 50
  },
  {
    id: 'demo',
    text: 'Демо',
    component: 'Button',
    position: {
      x: 210,
      y: 300
    },
    width: 100,
    height: 50
  },
  {
    id: 'ErrorMessage',
    font: {
      size: '15px',
      color: '#000'
    },
    component: 'Label',
    position: {
      x: 100,
      y: 350
    },
    width: 200,
    height: 50
  }]
};

export default authGui;
