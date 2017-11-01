module.exports = app => {
  return class Databaselist extends app.Service {
    * getById (id) {
      const result = yield app.mysql.get('pubmed',{id})
      return { result }
    }
  }
}
