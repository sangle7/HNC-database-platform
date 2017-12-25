module.exports = app => {
    return class Databaselist extends app.Service {
      * query (page) {
        const geneIds = yield app.mysql.select('hncgene',{
          limit: 10,
          offset:10 * (page - 1)
        })
        const total = yield app.mysql.query('select count(1) from hncgene;')
        return { geneIds, total: total[0]['count(1)'] }
      }
    }
  }
  