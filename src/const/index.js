import countFromArray from './countFromArray'
import mutsNeedlePlot from './mutsNeedlePlot'

const COLORS = ['#E64B35','#4DBBD5','#00A087','#3C5488','#F3987F','#8491B4','#91D1C2','#7E6148','#B09C85','#DC0000']
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
  text: 'Connective Map',
  src: '/ConnectiveMap',
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