module.exports = app => {
  return class Databaselist extends app.Service {
    async queryById(id) {
        const result = await app.mysql.get('hncdrug', {
          id
        })
        return {
          dbid: result.drug_id
        }
      }
    async query(page) {
      const geneIds = await app.mysql.select('hncdrug', {
        limit: 10,
        offset: 10 * (page - 1)
      })
      const total = await app.mysql.count('hncdrug')
      return {
        geneIds,
        total,
      }
    }
    async getAll() {
      const geneIds = await app.mysql.select('hncdrug', {})
      return {
        geneIds,
      }
    }
  }
}