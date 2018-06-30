module.exports = app => {
  return class Databaselist extends app.Service {
    /**
     * 
     * @param caseId GSEXXXX
     * @param type Tumor/hpv
     * @param geneType coding/lnc
     * 
     */
    async getByCase({caseId, type, geneType,page}) {

      const list = await app.mysql.select('difftable',{
        where: {
          dataset: caseId,
          data_type: type,
          gene_type: geneType,
        },
        limit: 10,
        offset: 10 * (page - 1)
      });

      const total = await app.mysql.count('difftable', {
        dataset: caseId,
        data_type: type,
        gene_type: geneType,
      })
      

      return { list, total }
    }

    async getByGene({geneId}) {

      const list = await app.mysql.select('difftable',{
        where: {
          gene: geneId
        },
      });
      
      return { list }
    }

    async searchByGene({gene, caseId}){
      const list = await app.mysql.query(`SELECT * FROM difftable WHERE gene like '%${gene}%' and dataset = '${caseId}'`)
      return { list }
    }
  }
}

var orderMap = {
  ascend:"ASC",
  descend:"DESC"
}