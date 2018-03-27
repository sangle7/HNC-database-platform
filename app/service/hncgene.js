module.exports = app => {
  return class Databaselist extends app.Service {
    async getIdByGeneId(geneId) {
        const list = await app.mysql.select('hncgene', {
          where: {
            gene_id: geneId
          }
        });
        return {
          hncGeneId: list[0].id
        }
      }
    async query(page) {
      const geneIds = await app.mysql.select('hncgene', {
        limit: 10,
        offset: 10 * (page - 1)
      })
      const total = await app.mysql.count('hncgene')
      return {
        geneIds,
        total,
      }
    }
    async getAll() {
      const geneIds = await app.mysql.select('hncgene', {})
      return {
        geneIds,
      }
    }
  }
}