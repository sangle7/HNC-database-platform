import Navigation from './navigation'
import Diff from './analysis/diff'
import Corr from './analysis/corr'
import Survival from './analysis/survival'
import GeneList from './gene'
import DrugList from './connectivemap'
// import GeneListd from './analysis/genelist'
import Wrapper from './wrapper'
import ErrorPage from './errorpage'
import MdPage from './mdPage'
import Statistic from './statistic'
import HomePage from './homepage'

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