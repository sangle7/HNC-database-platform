import Navigation from './navigation'
import Diff from './annalysis/diff'
import Corr from './annalysis/corr'
import Survival from './annalysis/survival'
import GeneList from './gene'
import DrugListd from './annalysis/druglist'
// import GeneListd from './annalysis/genelist'
import Wrapper from './wrapper'
import ErrorPage from './errorpage'
import MdPage from './mdPage'
import Statistic from './statistic'
import HomePage from './homepage'


const DrugList = DrugListd
// const DrugList = Wrapper(DrugListd, '/cgi/drugs')
// const GeneList = Wrapper(GeneListd, '/cgi/genes')


const StatisticPage = Statistic

export {
  Corr,
  Diff,
  Survival,
  Navigation,
  GeneList,
  HomePage,
  DrugList,
  ErrorPage,
  MdPage,
  StatisticPage,
}