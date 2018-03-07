module.exports = app => {
  return class Databaselist extends app.Service {
    * query(pubmed_id) {
        const list = yield app.mysql.select('drug2pubmed', {
          where: {
            pubmed_id
          },
        })
        return {
          list
        }
      }
      * queryByIds(hncdrug_id, pubmed_id) {
        const r = yield app.mysql.select('drug2pubmed', {
          where: {
            pubmed_id,
            hncdrug_id
          },
        })
        return r[0]
      }
      * generateChart() {
        const chart2 = [
          [{
            name: 'Adverse Event',
            value: yield app.mysql.count('drug2pubmed', {
              efficacy: 'Adverse Event'
            })
          }, {
            name: 'Controvesial',
            value: yield app.mysql.count('drug2pubmed', {
              efficacy: 'Controvesial'
            })
          }, {
            name: 'Effective in Basic Research',
            value: yield app.mysql.count('drug2pubmed', {
              efficacy: 'Effective in Basic Research'
            })
          }, {
            name: 'Effective in Clinical',
            value: yield app.mysql.count('drug2pubmed', {
              efficacy: 'Effective in Clinical'
            })
          }, {
            name: 'Effective in Clinical;Adverse Event',
            value: yield app.mysql.count('drug2pubmed', {
              efficacy: 'Effective in Clinical;Adverse Event'
            })
          }, {
            name: 'Effective in Clinical;Effective in Basic Research',
            value: yield app.mysql.count('drug2pubmed', {
              efficacy: 'Effective in Clinical;Effective in Basic Research'
            })
          }, {
            name: 'Not Effective',
            value: yield app.mysql.count('drug2pubmed', {
              efficacy: 'Not Effective'
            })
          }, {
            name: 'Not Effective;Adverse Event',
            value: yield app.mysql.count('drug2pubmed', {
              efficacy: 'Not Effective;Adverse Event'
            })
          }],
          [{
            name: 'Case Report',
            value: yield app.mysql.count('drug2pubmed', {
              evidence: 'Case Report'
            })
          }, {
            name: 'Clinical Trial',
            value: yield app.mysql.count('drug2pubmed', {
              evidence: 'Clinical Trial'
            })
          }, {
            name: 'Case Report;Clinical Trial',
            value: yield app.mysql.count('drug2pubmed', {
              evidence: 'Case Report;Clinical Trial'
            })
          }, {
            name: 'Case Report;Review',
            value: yield app.mysql.count('drug2pubmed', {
              evidence: 'Case Report;Review'
            })
          }, {
            name: 'Meta-Analysis',
            value: yield app.mysql.count('drug2pubmed', {
              evidence: 'Meta-Analysis'
            })
          }, {
            name: 'In Vivo Study',
            value: yield app.mysql.count('drug2pubmed', {
              evidence: 'In Vivo Study'
            })
          }, {
            name: 'Cohort Report',
            value: yield app.mysql.count('drug2pubmed', {
              evidence: 'Cohort Report'
            })
          }, {
            name: 'Randomized Controlled Trial',
            value: yield app.mysql.count('drug2pubmed', {
              evidence: 'Randomized Controlled Trial'
            })
          }, {
            name: 'Review',
            value: yield app.mysql.count('drug2pubmed', {
              evidence: 'Review'
            })
          }, ]
        ]
        return {
          chart2
        }
      }
  }
}