module.exports = app => {
  return class Databaselist extends app.Service {
    * queryById(id) {
        const result = yield app.mysql.get('hncdrug', {
          id
        })
        return {
          dbid: result.drug_id
        }
      }
      * query(page) {
        const geneIds = yield app.mysql.select('hncdrug', {
          limit: 10,
          offset: 10 * (page - 1)
        })
        const total = yield app.mysql.count('hncdrug')
        return {
          geneIds,
          total,
        }
      }
  }
}