module.exports = app => {
  return class Databaselist extends app.Service {
    * getIdByGeneId(geneId) {
        const list = yield app.mysql.select('hncgene', {
          where: {
            gene_id: geneId
          }
        });
        console.log(list)
        return {
          hncGeneId: list[0].id
        }
      }
    * query(page) {
      const geneIds = yield app.mysql.select('hncgene', {
        limit: 10,
        offset: 10 * (page - 1)
      })
      const total = yield app.mysql.count('hncgene')
      return {
        geneIds,
        total,
      }
    }
    * getAll() {
      const geneIds = yield app.mysql.select('hncgene', {})
      return {
        geneIds,
      }
    }
  }
}