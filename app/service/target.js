module.exports = app => {
  return class Databaselist extends app.Service {
    async queryByPage(page) {
        const total = await app.mysql.count('target')
        const list = await app.mysql.select('target', {
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
      async generateChart() {
        const regulationI = await app.mysql.count('target', {
          regulation: 'inhibit'
        })
        const regulationA = await app.mysql.count('target', {
          regulation: 'activate'
        })
        const interactionD = await app.mysql.count('target', {
          interaction: 'directly'
        })
        const interactionI = await app.mysql.count('target', {
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