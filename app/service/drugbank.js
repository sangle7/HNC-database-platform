module.exports = app => {
  return class Databaselist extends app.Service {
    * queryById (dbid) {
      const drug = yield app.mysql.get('drugbank',{dbid})
      return { drug }
    }
  }
}
