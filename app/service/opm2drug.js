module.exports = app => {
  return class Databaselist extends app.Service {
    async getByDrugId(dbid){
      const list = await app.mysql.select('opm2drug', {
        where: {
          dbid
        },
      })
      return {
        list
      }
    }
  }
}