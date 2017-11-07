module.exports = app => {
  return class Databaselist extends app.Service {
    * queryById (dbid) {
      const drug = yield app.mysql.get('drugbank',{dbid})
      return { drug }
    }
    * queryByName (name) {
      const list = yield app.mysql.select('drugbank', {
        where: { name },
      });
      return { item: list[0] }
    }
  }
}
