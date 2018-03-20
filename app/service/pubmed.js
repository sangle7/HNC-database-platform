module.exports = app => {
  return class Databaselist extends app.Service {
    async getById(id) {
        const result = await app.mysql.get('pubmed', {
          id
        })
        return {
          result
        }
      }
      async queryByPage(page) {
        const total = await app.mysql.count('pubmed')
        const list = await app.mysql.select('pubmed', {
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