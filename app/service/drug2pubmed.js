module.exports = app => {
  return class Databaselist extends app.Service {
    * query (pubmed_id) {
      const list = yield app.mysql.select('drug2pubmed',{
        where: { pubmed_id },
      })
      return { list }
    }
  }
}
