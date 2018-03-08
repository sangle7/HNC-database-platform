module.exports = app => {
  return class Databaselist extends app.Service {
    * queryById(dbid) {
        const drug = yield app.mysql.get('drugbank', {
          dbid
        })
        return {
          drug
        }
      }
      * queryByName(name) {
        const list = yield app.mysql.select('drugbank', {
          where: {
            name
          },
        });
        return {
          item: list[0]
        }
      }
      * search(q) {
        const result = yield app.mysql.query(`SELECT * FROM drugbank WHERE dbid like '%${q}%' or name like '%${q}%'`)
        const list = []
        for (let elem of result) {
          let isValid = yield app.mysql.select('hncdrug', {
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