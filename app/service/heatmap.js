module.exports = app => {
  return class Databaselist extends app.Service {
    async getByPagi({offset, size, sorter, filter}) {
      const { columnKey, order } = sorter
      const orderquery = columnKey ?  `ORDER BY ${columnKey} ${orderMap[order]}` : ''
      const list = await app.mysql.query(`SELECT * FROM geneheatmap WHERE id like '%${filter}%' ${orderquery} LIMIT ${size} OFFSET ${offset}`)
      const count = await app.mysql.query(`SELECT COUNT(*) AS count FROM geneheatmap WHERE id like '%${filter}%'`)
      const total = await app.mysql.count('geneheatmap')        
      return { list, total, filtedtotal:count[0].count }
    }
  }
}

var orderMap = {
  ascend:"ASC",
  descend:"DESC"
}