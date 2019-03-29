const R = require('../utils/R');
const md5 = require('md5');
const path = require('path')
const fs = require('fs')

exports.multiinput = async ctx => {
    let body = {
      ret: 500,
    }
  
    const {
      nameslist
    } = ctx.request.body
    
      const singlegene = nameslist.split(",")
      const genenotinlist = []
      const geneforanalysis = []
      
      for (var i=0;i<singlegene.length;i++)
      {
        try {
            const result = singlegene[i] ? await ctx.service.survivalgene.get(singlegene[i]) : false
            result ? singlegene[i] : genenotinlist.push(singlegene[i])
            result ? geneforanalysis.push(singlegene[i]) : false
            
          } catch (error) {
            body.error = error
          }
      }
      var  returnmsg = ""
      var md5String = ""           
      if(singlegene.length<2){
        returnmsg = "You had just input only one gene."
      } else {
        if(genenotinlist.length>0){
          returnmsg = "The gene \"" + genenotinlist.join("\" and \"") + "\" are not exist in our data."
        } else {
          returnmsg = null
          md5String = md5(geneforanalysis)
          const rResult = R(`survival.multi.R`, ` ${md5String}`)
          console.log(md5String)
          if (rResult.code === 0) {
            
          } else {
            console.log(rResult.stderr) //错误日志
          }
        }
        
      } 
      body = {
        nameslist: geneforanalysis.join("_"),
        md5String: md5String,
        msg: returnmsg,
        ret: 200,
      }
 
      ctx.body = body
}
   