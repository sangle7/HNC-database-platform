import Navigation from './navigation'
import GenePage from './genepage'
import Annalysis from './annalysis'
import Diff from './annalysis/diff'
import Corr from './annalysis/corr'
import Surviral from './annalysis/surviral'
import Datasets from './datasets'
import DrugListd from './annalysis/druglist'
import GeneListd from './annalysis/genelist'
import DatasetsNCRNA from './datasets/ncRNA'
import DrugPage from './drugpage'
import CasePage from './casepage'
import Wrapper from './wrapper'
import Genes from './datasets/genes'
import Drugs from './datasets/drugs'
import Cases from './datasets/cases'
import Records from './datasets/records'
import ErrorPage from './errorpage'
import MdPage from './mdPage'

// const AnnalysisCorr = Wrapper(Corr, '/cgi/datasets/genes')
const AnnalysisCorr = Corr
const AnnalysisDiff = Diff
// const AnnalysisDiff = Wrapper(Diff, '/cgi/diff/init')
const AnnalysisSurviral = Wrapper(Surviral, '/cgi/datasets/genes')
const DrugList = Wrapper(DrugListd, '/cgi/drugs')
const GeneList = Wrapper(GeneListd, '/cgi/genes')

const DatasetsGenes = Wrapper(Genes, '/cgi/datasets/genes')
const DatasetsDrugs = Wrapper(Drugs, '/cgi/datasets/drugs', '/cgi/datasets/drugschart')
const DatasetsCases = Wrapper(Cases, '/cgi/datasets/cases', '/cgi/datasets/caseschart')
const DatasetsRecords = Wrapper(Records, '/cgi/datasets/records')

export {
    AnnalysisCorr,
    AnnalysisDiff,
    AnnalysisSurviral,
    GenePage,
    CasePage,
    Navigation,
    Annalysis,
    GeneList,
    DrugList,
    Datasets,
    DatasetsGenes,
    DatasetsDrugs,
    DatasetsCases,
    DatasetsRecords,
    DatasetsNCRNA,
    DrugPage,
    ErrorPage,
    MdPage
}