const queryString = require('query-string')

module.exports = app => {
  return class Databaselist extends app.Service {
    async getByPagi({offset, size, sorter, filter, table}) {
      const { gene = '', drug = '' } = queryString.parse(filter)
      const { columnKey, order } = sorter
      let filterColStr = '*'

      if(drug){
        const columns = await app.mysql.query(`SHOW columns FROM ${table}connectivemap`)
        const columnsName = columns.map(e=>'`'+ e.Field + '`')
        const drugReg = new RegExp(drug,'gi')
        const filterCol = columnsName.filter(col=>drugReg.test(col))
        filterCol.unshift('id')
        filterColStr = filterCol.join(',')
      }

      const orderquery = columnKey ?  'ORDER BY `'+ columnKey +'`' + orderMap[order]: ''
      const list = await app.mysql.query(`SELECT ${filterColStr} FROM ${table}connectivemap WHERE id like '%${gene}%' ${orderquery} LIMIT ${size} OFFSET ${offset}`)
      const count = await app.mysql.query(`SELECT COUNT(*) AS count FROM ${table}connectivemap WHERE id like '%${gene}%'`)
      const total = await app.mysql.count(`${table}connectivemap`)        
      return { list, total, filtedtotal:count[0].count }
    }
  }
}

var orderMap = {
  ascend:"ASC",
  descend:"DESC"
}