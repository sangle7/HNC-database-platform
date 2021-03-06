import countFromArray from './countFromArray'
import getlinearRegression from './getlinearRegression'
import cgiConfig from './cgiConfig'

const COLORS = ['#E64B35', '#4DBBD5', '#00A087', '#3C5488', '#F3987F', '#8491B4', '#91D1C2', '#7E6148', '#B09C85', '#DC0000']
const menuWithIcon = [{
  text: 'Home',
  src: '/',
  icon: 'home',
}]

const menu = [{
  text: 'Home',
  src: '/',
}, {
  text: 'Gene',
  src: '/Gene',
}, {
  text: 'Connectivity Map',
  src: '/ConnectiveMap',
}, {
  text: 'Analysis',
  child: [{
    text: 'Differential expression analysis',
    src: '/Diff',
  }, {
    text: 'Correlation analysis',
    src: '/Corr',
  }, {
    text: 'Survival analysis',
    src: '/Survival',
  }],
}, {
  text: 'statistics',
  src: '/statistics',
}, /* {
  text: 'help',
  src: '/help',
},  */{
  text: 'Contact',
  src: '/Contact',
}]

export {
  menu,
  menuWithIcon,
  COLORS,
  countFromArray,
  getlinearRegression,
  cgiConfig,
}
