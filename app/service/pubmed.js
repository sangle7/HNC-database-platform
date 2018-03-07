module.exports = app => {
  return class Databaselist extends app.Service {
    * getById(id) {
        const result = yield app.mysql.get('pubmed', {
          id
        })
        return {
          result
        }
      }
      * queryByPage(page) {
        const total = yield app.mysql.count('pubmed')
        const list = yield app.mysql.select('pubmed', {
          limit: 10,
          offset: (Number(page) - 1) * 10
        });
        return {
          list,
          total
        }
      }
  }
}