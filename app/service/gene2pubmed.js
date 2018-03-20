module.exports = app => {
  return class Databaselist extends app.Service {
    async query(hncgene_id) {
        const list = await app.mysql.select('gene2pubmed', {
          where: {
            hncgene_id
          },
        })
        return {
          list
        }
      }
  }
}