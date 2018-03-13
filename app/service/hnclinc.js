module.exports = app => {
  return class Databaselist extends app.Service {
    * queryById(SampleID) {
        const item = yield app.mysql.get('hnclinc', {
          SampleID
        })
        return {
          item
        }
      }
      * filterByType(type) {
        type = type.toLowerCase()
        const colnames1 = [],
          colnames2 = []
        const results = yield app.mysql.query('SELECT * FROM hnclinc WHERE ? IS NOT NULL;', [type]);

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
      * queryByPage(page) {
        const total = yield app.mysql.count('hnclinc')
        const list = yield app.mysql.select('hnclinc', {
          limit: 10,
          offset: (Number(page) - 1) * 10
        });
        return {
          list,
          total
        }
      }
      * generateChart() {
        const total = yield app.mysql.count('hnclinc')
        const female = yield app.mysql.count('hnclinc', {gender: 'Female'});
        const male = yield app.mysql.count('hnclinc', {gender: 'Male'});
        const hpvP = yield app.mysql.count('hnclinc', {hpv: 'positive'});
        const hpvN = yield app.mysql.count('hnclinc', {hpv: 'negative'});
        const vitalA = yield app.mysql.count('hnclinc', {vital: 'alive'});
        const vitalD = yield app.mysql.count('hnclinc', {vital: 'dead'});        
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