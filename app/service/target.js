module.exports = app => {
  return class Databaselist extends app.Service {
    * queryByPage(page) {
        const total = yield app.mysql.count('target')
        const list = yield app.mysql.select('target', {
          orders: [
            ['hncdrug_id', 'asc']
          ],
          limit: 10,
          offset: (Number(page) - 1) * 10
        });
        return {
          list,
          total
        }
      }
      * generateChart() {
        const regulationI = yield app.mysql.count('target', {
          regulation: 'inhibit'
        })
        const regulationA = yield app.mysql.count('target', {
          regulation: 'activate'
        })
        const interactionD = yield app.mysql.count('target', {
          interaction: 'directly'
        })
        const interactionI = yield app.mysql.count('target', {
          interaction: 'Indirectly'
        })
        const chart = [
          [{
            name: 'inhibit',
            value: regulationI
          }, {
            name: 'activate',
            value: regulationA
          }],
          [{
            name: 'directly',
            value: interactionD,
          }, {
            name: 'indirectly',
            value: interactionI,
          }]
        ]
        return {
          chart
        }
      }
  }
}