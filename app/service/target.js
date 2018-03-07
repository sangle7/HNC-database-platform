module.exports = app => {
    return class Databaselist extends app.Service {
        * queryByPage(page) {
          const total = yield app.mysql.count('target')
          const list = yield app.mysql.select('target', {
            orders: [['hncdrug_id','asc']],
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