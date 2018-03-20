module.exports = app => {
  return class Databaselist extends app.Service {
    async query (page) {
      const list = await app.mysql.select('gene',{
        limit: 10,
        offset:10 * (page - 1)
      })
      const total = await app.mysql.query('select count(1) from gene;')
      return { list, total: total[0]['count(1)'] }
    }
    async getIdByName (symbol) {
      const list = await app.mysql.select('gene', {
        where: { symbol },
      });
      return { item: list[0] }
    }
    async getItemById(id) {
      const list = await app.mysql.select('gene', {
        where: { id },
      });
      return { item: list[0] }
    }
    async search (q) {
      const result = await app.mysql.query(`SELECT * FROM gene WHERE hgncid like '%${q}%' or id like '%${q}%' or symbol like '%${q}%'`)
      const list = []
      for(let elem of result){
        let isValid = await app.mysql.select('hncgene',{
          where:{gene_id:elem.id},
        })
        if(isValid[0]){
          list.push(elem)
        }
      }
      return { list, total: list.length }
    }
  }
}
