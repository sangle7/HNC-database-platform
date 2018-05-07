module.exports = app => {
  return class Databaselist extends app.Service {
    async getStatistics () {
      const total = await app.mysql.count('hnclinc')

      const arr = [{
        key:'gender',
        male:await app.mysql.count('hnclinc', {
          gender: 'male'
        }),
        female:await app.mysql.count('hnclinc', {
          gender: 'female'
        }),
        total,
      },{
        key:'tumor/normal',
        tumor:await app.mysql.count('hnclinc', {
          'tumor/normal': 'tumor'
        }),
        normal:await app.mysql.count('hnclinc', {
          'tumor/normal': 'normal'
        }),
        total,
      },{
        key:'tobacco',
        positive:await app.mysql.count('hnclinc', {
          tobacco: 'yes'
        }),
        negative:await app.mysql.count('hnclinc', {
          tobacco: 'no'
        }),
        total,
      },{
        key:'alcohol',
        positive:await app.mysql.count('hnclinc', {
          alcohol: 'yes'
        }),
        negative:await app.mysql.count('hnclinc', {
          alcohol: 'no'
        }),
        total,
      },{
        key:'recurrence',
        positive:await app.mysql.count('hnclinc', {
          recurrence: 'yes'
        }),
        negative:await app.mysql.count('hnclinc', {
          recurrence: 'no'
        }),
        total,
      },{
        key:'hpv',
        positive:await app.mysql.count('hnclinc', {
          hpv: 'positive'
        }),
        negative:await app.mysql.count('hnclinc', {
          hpv: 'negative'
        }),
        total,
      }]
      return arr
    }

    async getByAge(min,max){
      const arr = await app.mysql.query(`SELECT * FROM hnclinc WHERE age > ${min} and age < ${max};`);
      return arr.length
    }

    async getPieChart () {
      const total = await app.mysql.count('hnclinc')
      const arr = [{
        key:'race',
        value:[{
          name:'asian',
          value:await app.mysql.count('hnclinc', {
            race: 'asian'
          }),
        },{
          name:'white',
          value:await app.mysql.count('hnclinc', {
            race: 'white'
          }),
        },{
          name:'black',
          value:await app.mysql.count('hnclinc', {
            race: 'black'
          }),
        }],
        total,
      },{
        key:'age',
        value:[{
          name:'0-20',
          value:await this.getByAge(0,20)
        },{
          name:'20-30',
          value:await this.getByAge(20,30)
        },{
          name:'30-40',
          value:await this.getByAge(30,40)
        },{
          name:'40-50',
          value:await this.getByAge(40,50)
        },{
          name:'50-60',
          value:await this.getByAge(50,60)
        },{
          name:'60-70',
          value:await this.getByAge(60,70)
        },{
          name:'70-80',
          value:await this.getByAge(70,80)
        },{
          name:'80-90',
          value:await this.getByAge(80,90)
        }],
        total,
      }]
      return arr
    }
    async queryById(SampleID) {
        const item = await app.mysql.get('hnclinc', {
          SampleID
        })
        return {
          item
        }
      }
      async filterByType(type) {
        type = type.toLowerCase()
        const colnames1 = [],
          colnames2 = []
        const results = await app.mysql.query('SELECT * FROM hnclinc WHERE ? IS NOT NULL;', [type]);

        for (let element of results){
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
        const female = await app.mysql.count('hnclinc', {gender: 'Female'});
        const male = await app.mysql.count('hnclinc', {gender: 'Male'});
        const hpvP = await app.mysql.count('hnclinc', {hpv: 'positive'});
        const hpvN = await app.mysql.count('hnclinc', {hpv: 'negative'});
        const vitalA = await app.mysql.count('hnclinc', {vital: 'alive'});
        const vitalD = await app.mysql.count('hnclinc', {vital: 'dead'});        
        const chart = [{
            name:'gender',
            male,
            female,
            unknown: total -female -male
          },{
            name: 'hpv',
            positive: hpvP,
            negative: hpvN,
            unknown: total -hpvP -hpvN            
          },{
            name:'vital',
            alive:vitalA,
            dead:vitalD,
            unknown: total -vitalA -vitalD            
          }
        ]
        return {
          chart
        }
      }
  }
}