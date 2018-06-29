module.exports = app => {
  return class Databaselist extends app.Service {
    async getSampleByDataset (datasetID) {
      const list = await app.mysql.query(`SELECT DISTINCT SampleID from hnclinc WHERE DatasetID = '${datasetID}'`)
      return list;

    }
    async getAllDataset () {
      const options = await app.mysql.query('SELECT DISTINCT DatasetID from hnclinc')
      return options;
    }
    async getStatistics() {

      const arr = [{
        key: 'Gene',
        total: await app.mysql.count('hncgene'),
        case: await app.mysql.count('gene2pubmed'),
        pubmed: await this.doCount('SELECT COUNT(DISTINCT pubmed_id) from gene2pubmed','COUNT(DISTINCT pubmed_id)'),
      },{
        key: 'Drug',
        total: await app.mysql.count('hncdrug'),
        case: await app.mysql.count('drug2pubmed'),
        pubmed: await this.doCount('SELECT COUNT(DISTINCT pubmed_id) from drug2pubmed','COUNT(DISTINCT pubmed_id)'),
      }]
      return arr
    }

    async getGeneData() {
      const arr = [{
        key: 'Gene',
        total: await app.mysql.count('hncgene'),
        pubmed: await this.doCount('SELECT COUNT(DISTINCT pubmed_id) from gene2pubmed','COUNT(DISTINCT pubmed_id)'),
      },{
        key: 'Drug',
        total: await app.mysql.count('hncdrug'),
        pubmed: await this.doCount('SELECT COUNT(DISTINCT pubmed_id) from drug2pubmed','COUNT(DISTINCT pubmed_id)'),
      }]
      return arr
    }

    async doCount(query,prefix) {
      const result = await app.mysql.query(query)
      return result[0][prefix]
    }

    async getByAge(min, max) {
      const arr = await app.mysql.query(`SELECT * FROM hnclinc WHERE age > ${min} and age < ${max};`);
      return arr.length
    }

    async getPieChart() {
      const total = await app.mysql.count('hnclinc')
      const arr = [{
        key: 'gender',
        value: [{
          name: 'male',
          value: await app.mysql.count('hnclinc', {
            gender: 'male'
          }),
        }, {
          name: 'female',
          value: await app.mysql.count('hnclinc', {
            gender: 'female'
          }),
        }],
      }, {
        key: 'tumor/normal',
        value: [{
          name: 'tumor',
          value: await app.mysql.count('hnclinc', {
            'tumor/normal': 'tumor'
          }),
        }, {
          name: 'normal',
          value: await app.mysql.count('hnclinc', {
            'tumor/normal': 'normal'
          }),
        }],
      }, {
        key: 'tobacco',
        value: [{
          name: 'positive',
          value: await app.mysql.count('hnclinc', {
            tobacco: 'yes'
          }),
        }, {
          name: 'negative',
          value: await app.mysql.count('hnclinc', {
            tobacco: 'no'
          }),
        }],
      }, {
        key: 'alcohol',
        value: [{
          name: 'positive',
          value: await app.mysql.count('hnclinc', {
            alcohol: 'yes'
          }),
        }, {
          name: 'negative',
          value: await app.mysql.count('hnclinc', {
            alcohol: 'no'
          }),
        }],
      }, {
        key: 'recurrence',
        value: [{
          name: 'positive',
          value: await app.mysql.count('hnclinc', {
            recurrence: 'yes'
          }),
        }, {
          name: 'negative',
          value: await app.mysql.count('hnclinc', {
            recurrence: 'no'
          }),
        }],
      }, {
        key: 'hpv',
        value: [{
          name: 'positive',
          value: await app.mysql.count('hnclinc', {
            hpv: 'positive'
          }),
        }, {
          name: 'negative',
          value: await app.mysql.count('hnclinc', {
            hpv: 'negative'
          }),
        }],
      },{
        key: 'race',
        value: [{
          name: 'asian',
          value: await app.mysql.count('hnclinc', {
            race: 'asian'
          }),
        }, {
          name: 'white',
          value: await app.mysql.count('hnclinc', {
            race: 'white'
          }),
        }, {
          name: 'black',
          value: await app.mysql.count('hnclinc', {
            race: 'black'
          }),
        }],
        total,
      }, {
        key: 'age',
        value: [{
          name: '0-20',
          value: await this.getByAge(0, 20)
        }, {
          name: '20-30',
          value: await this.getByAge(20, 30)
        }, {
          name: '30-40',
          value: await this.getByAge(30, 40)
        }, {
          name: '40-50',
          value: await this.getByAge(40, 50)
        }, {
          name: '50-60',
          value: await this.getByAge(50, 60)
        }, {
          name: '60-70',
          value: await this.getByAge(60, 70)
        }, {
          name: '70-80',
          value: await this.getByAge(70, 80)
        }, {
          name: '80-90',
          value: await this.getByAge(80, 90)
        }],
        total,
      }]
      return arr
    }
    async queryById(SampleID) {
      const list = await app.mysql.select('hnclinc', {
        where: {
          DatasetID: SampleID,
        }
      })
      return {
        list
      }
    }
    async filterByType(type) {
      type = type.toLowerCase()
      const colnames1 = [],
        colnames2 = []
      const results = await app.mysql.query('SELECT * FROM hnclinc WHERE ? IS NOT NULL;', [type]);

      for (let element of results) {
        if (/^pos/i.test(element[type]) && /^GSM/.test(element.SampleID)) {
          colnames1.push(element.SampleID)
        } else if (/^neg/i.test(element[type]) && /^GSM/.test(element.SampleID)) {
          colnames2.push(element.SampleID)
        }
      }
      // results.forEach(element => {
      //   if (/^dead/i.test(element[type]) && /^GSM/.test(element.SampleID)) {
      //     colnames1.push(element.SampleID)
      //   } else if (/^alive/i.test(element[type]) && /^GSM/.test(element.SampleID)) {
      //     colnames2.push(element.SampleID)
      //   }
      // });

      return {
        colnames1,
        colnames2
      }
    }
    async queryByPage(page) {
      const total = await app.mysql.count('hnclinc')
      const list = await app.mysql.select('hnclinc', {
        limit: 10,
        offset: (Number(page) - 1) * 10
      });
      return {
        list,
        total
      }
    }
    async generateChart() {
      const total = await app.mysql.count('hnclinc')
      const female = await app.mysql.count('hnclinc', {
        gender: 'Female'
      });
      const male = await app.mysql.count('hnclinc', {
        gender: 'Male'
      });
      const hpvP = await app.mysql.count('hnclinc', {
        hpv: 'positive'
      });
      const hpvN = await app.mysql.count('hnclinc', {
        hpv: 'negative'
      });
      const vitalA = await app.mysql.count('hnclinc', {
        vital: 'alive'
      });
      const vitalD = await app.mysql.count('hnclinc', {
        vital: 'dead'
      });
      const chart = [{
        name: 'gender',
        male,
        female,
        unknown: total - female - male
      }, {
        name: 'hpv',
        positive: hpvP,
        negative: hpvN,
        unknown: total - hpvP - hpvN
      }, {
        name: 'vital',
        alive: vitalA,
        dead: vitalD,
        unknown: total - vitalA - vitalD
      }]
      return {
        chart
      }
    }
  }
}