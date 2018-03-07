import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { Breadcrumb, Tabs, DatasourceTable, PieChart } from '../../../components'

const a = {
  "pmid": 16998793,
  "date": "2006 Dec 15",
  "author": "Mishra|Alok|A; Bharti|Alok C|AC; Varghese|Prishla|P; Saluja|Daman|D; Das|Bhudev C|BC",
  "journal": "International journal of cancer. Journal internati",
  "journal_abbv": "Int. J. Cancer",
  "volume": 119,
  "issue": 12,
  "abstract": "Oral cancer is one of the most common cancers in India and south-east Asian region consisting of more than 50% of all malignant tumors. Along with many known risk factors, infection of Human Papillomavirus (HPV) has been associated with the development of oral cancer and is suggested to modulate host cell transcription. Reciprocally, cellular transcription factors, such as NF-kappaB and AP-1 are known to modulate the expression of viral and other genes involved in the development of cancer. In the absence of data on NF-kappaB in relation to HPV in oral cancer, we studied the DNA binding activity and expression pattern of NF-kappaB family of proteins in different stages of oral cancer and correlated with HPV infection that has been associated with better prognosis of the disease. A total of 110 fresh oral tissue biopsies were collected comprising 10 normal controls, 34 precancer and 66 oral cancer lesions prior to chemotherapy/radiotherapy. Diagnosis of HPV was done by both consensus and type-specific PCR. Ele<br>ctrophoretic mobility shift assays, western blots and immunohistochemical analysis were performed to assess the binding activity and expression pattern of NF-kappaB family of proteins (p50, p65, p52, c-Rel, RelB and Bcl-3) in oral tissue biopsies. Twenty seven percent (18/66) of the oral cancer biopsies showed the presence of HPV infection exclusively of high risk HPV type 16, which was primarily associated with the well differentiated squamous cell carcinomas (WDSCC). We observed a high constitutive activation of NF-kappaB with concomitant upregulated expression of all the NF-kappaB members in oral cancer tissues. Expression of NF-kappaB components gradually increased as the severity of lesion increased from precancer to invasive cancer. NF-kappaB p50 was found to be the major DNA binding component, which is indicative of homodimerization of p50 subunits. Interestingly, in HPV16 infected oral cancers although p50 showed high binding activity, p65 also showed a partial involvement as evidenced in supershift a<br>ssay. Both by western blotting and immunohistochemistry, a differential overexpression and nuclear localization of p50, p65 and partially of Bcl-3 were observed in HPV16 positive oral cancer patients that also showed an over-expression of p21. We therefore, demonstrate a constitutive activation and differential expression of NF-kappaB proteins, which change as a function of severity of oral lesions during development of oral cancer. The NF-kappaB DNA binding is primarily due to homodimerization of p50 but infection of high risk HPV promotes participation of p65 in NF-kappaB complex formation, leading to heterodimerization of p50/p65. We propose that the involvement of p65 in HPV infected oral cancer may be linked to improved differentiation and better prognosis of the disease when treated.",
  "title": "Differential expression and activation of NF-kappaB family proteins during oral carcinogenesis: Role of high risk human papillomavirus infection."
}
const DatasetsRecords = props => {
  const { location, history, dataSource, loading, pagination } = props
  const BreadcrumbProps = {
    path: location.pathname,
    handleClick (index) {
      const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
      if (newpath !== location.pathname) {
        history.push(newpath)
      }
    },
  }

  const TableProps = {
    dataSource,
    loading,
    columns: Object.keys(a).map((elem,i) => ({
      title: elem,
      dataIndex: elem,
      width: elem === 'abstract' ? 200 : 50,
      render: v => v ||'N/A',
    })),
    scroll: { x: '500%', y: 600 },
    pagination,
    onChange: page => {
      const search = {
        ...queryString.parse(location.search),
        page: page.current,
      }
      props.history.push(`/Datasets/Records?${queryString.stringify(search)}`)
    },
  }
  const TabProps = {
    tabs: [{
      key: 'Table',
      title: 'Table',
      content: <DatasourceTable {...TableProps} />,
    }, {
      key: 'Graph',
      title: 'Graph',
      content: <div style={{ display: 'flex', flexWrap: 'wrap' }}><PieChart /><PieChart /><PieChart /></div>,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return (
    <div>
      <Breadcrumb {...BreadcrumbProps} />
      <Tabs {...TabProps} />
    </div>
  )
}

DatasetsRecords.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default DatasetsRecords
