module.exports = app => {
  return class Databaselist extends app.Service {
      async search(q) {
        const result = await app.mysql.query(`SELECT * FROM survivalgene WHERE name like '${q}%'`)
        return result.slice(0,10)
      }
      async get(name){
        const result = await app.mysql.get('survivalgene', {
          name
        })
        return result
      }
  }
}