module.exports = app => {
  return class Databaselist extends app.Service {
    /**
     * 
     * @param caseId GSEXXXX
     * @param type Tumor/hpv
     * @param geneType coding/lnc
     * @param gene gene
     * 
     */
    async getBoxPlot({caseId, type, geneType, gene}) {

      const table1 = [caseId,type,1,geneType].join('_')
      const table2 = [caseId,type,2,geneType].join('_')

      const boxplot1 = await app.mysql.get(table1, { gene });
      const boxplot2 = await app.mysql.get(table2, { gene });
    
      return { boxplot1, boxplot2 }
    }
  }
}

var orderMap = {
  ascend:"ASC",
  descend:"DESC"
}