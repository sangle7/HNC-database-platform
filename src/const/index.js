import countFromArray from './countFromArray'
import mutsNeedlePlot from './mutsNeedlePlot'

const COLORS = ['#689F38', '#AFB42B', '#F4A460', '#0097A7', '#00796B', '#0288D1', '#1976D2', '#303F9F', '#5D4037', '#616161', '#546E7A']
const menuWithIcon = [{
  text: 'Home',
  src: '/',
  icon: 'home',
}]

const menu = [{
  text: 'Home',
  src: '/',
},{
  text: 'Gene',
  src: '/Gene',
},{
  text: 'Drug',
  src: '/Drug',
},{
  text:'Annalysis',
  child:[{
    text: 'Diff',
    src: '/Diff',
  },{
    text: 'Corr',
    src: '/Corr',
  },{
    text: 'Survival',
    src: '/Survival',
  }]
},{
  text: 'FAQ',
  src: '/FAQ',
}, {
  text: 'Resources',
  src: '/Resources',
}, {
  text: 'Contact',
  src: '/Contact',
}]

export {
  menu,
  menuWithIcon,
  COLORS,
  mutsNeedlePlot,
  countFromArray
}