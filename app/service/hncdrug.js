module.exports = app => {
  return class Databaselist extends app.Service {
    * queryById (id) {
      const result = yield app.mysql.get('hncdrug',{id})
      return {dbid:result.drug_id}
    }
  }
}
