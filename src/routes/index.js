import Navigation from './navigation'
import GenePage from './genepage'
import Annalysis from './annalysis'
import Datasets from './datasets'
import GeneList from './genelist'
import DatasetsNCRNA from './datasets/ncRNA'
import DrugPage from './drugpage'
import CasePage from './casepage'
import Wrapper from './datasets/wrapper'
import Genes from './datasets/genes'
import Drugs from './datasets/drugs'
import Cases from './datasets/cases'
import Records from './datasets/records'
import ErrorPage from './errorpage'
import MdPage from './mdPage'


const DatasetsGenes = Wrapper(Genes, '/cgi/datasets/genes')
const DatasetsDrugs = Wrapper(Drugs, '/cgi/datasets/drugs')
const DatasetsCases = Wrapper(Cases, '/cgi/datasets/cases', '/cgi/datasets/caseschart')
const DatasetsRecords = Wrapper(Records, '/cgi/datasets/records')

export {
    GenePage,
    CasePage,
    Navigation,
    Annalysis,
    GeneList,
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