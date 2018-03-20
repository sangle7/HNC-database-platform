module.exports = app => {
    return class Databaselist extends app.Service {
        async search(q) {
          const result = await app.mysql.query(`SELECT * FROM genename WHERE name like '${q}%'`)
          return result.slice(0,10)
        }
    }
  }