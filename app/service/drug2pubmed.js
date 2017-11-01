module.exports = app => {
  return class Databaselist extends app.Service {
    * query (hncgene_id) {
      const list = yield app.mysql.select('drug2pubmed',{
        where: { hncgene_id },
      })
      return { list }
    }
  }
}
