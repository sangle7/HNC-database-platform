module.exports = app => {
  return class Databaselist extends app.Service {
    async getByDrugId(hncdrug_id){
      const list = await app.mysql.select('drug2pubmed', {
        where: {
          hncdrug_id
        },
      })
      return {
        list
      }
    }
    async query(pubmed_id) {
        const list = await app.mysql.select('drug2pubmed', {
          where: {
            pubmed_id
          },
        })
        return {
          list
        }
      }
      async queryByIds(hncdrug_id, pubmed_id) {
        const r = await app.mysql.select('drug2pubmed', {
          where: {
            pubmed_id,
            hncdrug_id
          },
        })
        return r[0]
      }
      async generateChart() {
        const chart2 = [
          [{
            name: 'Adverse Event',
            value: await app.mysql.count('drug2pubmed', {
              efficacy: 'Adverse Event'
            })
          }, {
            name: 'Controvesial',
            value: await app.mysql.count('drug2pubmed', {
              efficacy: 'Controvesial'
            })
          }, {
            name: 'Effective in Basic Research',
            value: await app.mysql.count('drug2pubmed', {
              efficacy: 'Effective in Basic Research'
            })
          }, {
            name: 'Effective in Clinical',
            value: await app.mysql.count('drug2pubmed', {
              efficacy: 'Effective in Clinical'
            })
          }, {
            name: 'Effective in Clinical;Adverse Event',
            value: await app.mysql.count('drug2pubmed', {
              efficacy: 'Effective in Clinical;Adverse Event'
            })
          }, {
            name: 'Effective in Clinical;Effective in Basic Research',
            value: await app.mysql.count('drug2pubmed', {
              efficacy: 'Effective in Clinical;Effective in Basic Research'
            })
          }, {
            name: 'Not Effective',
            value: await app.mysql.count('drug2pubmed', {
              efficacy: 'Not Effective'
            })
          }, {
            name: 'Not Effective;Adverse Event',
            value: await app.mysql.count('drug2pubmed', {
              efficacy: 'Not Effective;Adverse Event'
            })
          }],
          [{
            name: 'Case Report',
            value: await app.mysql.count('drug2pubmed', {
              evidence: 'Case Report'
            })
          }, {
            name: 'Clinical Trial',
            value: await app.mysql.count('drug2pubmed', {
              evidence: 'Clinical Trial'
            })
          }, {
            name: 'Case Report;Clinical Trial',
            value: await app.mysql.count('drug2pubmed', {
              evidence: 'Case Report;Clinical Trial'
            })
          }, {
            name: 'Case Report;Review',
            value: await app.mysql.count('drug2pubmed', {
              evidence: 'Case Report;Review'
            })
          }, {
            name: 'Meta-Analysis',
            value: await app.mysql.count('drug2pubmed', {
              evidence: 'Meta-Analysis'
            })
          }, {
            name: 'In Vivo Study',
            value: await app.mysql.count('drug2pubmed', {
              evidence: 'In Vivo Study'
            })
          }, {
            name: 'Cohort Report',
            value: await app.mysql.count('drug2pubmed', {
              evidence: 'Cohort Report'
            })
          }, {
            name: 'Randomized Controlled Trial',
            value: await app.mysql.count('drug2pubmed', {
              evidence: 'Randomized Controlled Trial'
            })
          }, {
            name: 'Review',
            value: await app.mysql.count('drug2pubmed', {
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