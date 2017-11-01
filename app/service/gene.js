module.exports = app => {
  return class Databaselist extends app.Service {
    * query (page) {
      const list = yield app.mysql.select('gene',{
        limit: 10,
        offset:10 * (page - 1)
      })
      const total = yield app.mysql.query('select count(1) from gene;')
      return { list, total: total[0]['count(1)'] }
    }
    * getIdByName (symbol) {
      const list = yield app.mysql.select('gene', {
        where: { symbol },
      });
      return { item: list[0] }
    }
    * search (q) {
      const result = yield app.mysql.query(`SELECT * FROM gene WHERE hgncid like '%${q}%' or id like '%${q}%' or symbol like '%${q}%'`)
      return { list: result, total: result.length }
    }
  }
}
