module.exports = app => {
  return class Databaselist extends app.Service {
    * queryById (id) {
      const item = yield app.mysql.get('hnclinc',{id})
      return { item }
    }
  }
}
