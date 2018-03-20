module.exports = app => {
  return class Databaselist extends app.Service {
    async queryById(dbid) {
        const drug = await app.mysql.get('drugbank', {
          dbid
        })
        return {
          drug
        }
      }
      async queryByName(name) {
        const list = await app.mysql.select('drugbank', {
          where: {
            name
          },
        });
        return {
          item: list[0]
        }
      }
      async search(q) {
        const result = await app.mysql.query(`SELECT * FROM drugbank WHERE dbid like '%${q}%' or name like '%${q}%'`)
        const list = []
        for (let elem of result) {
          let isValid = await app.mysql.select('hncdrug', {
            where: {
              drug_id: elem.dbid
            },
          })
          if (isValid[0]) {
            list.push(elem)
          }
        }
        return {
          list,
          total: list.length
        }
      }
  }
}