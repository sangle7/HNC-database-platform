const R = require('../utils/R');
const md5 = require('md5');

exports.init = function* (ctx) {
    const app = ctx.app
    let body = {
        ret: 500,
    }

    const {
        type
    } = ctx.request.body
    try {
        const {
            colnames1,
            colnames2
        } = yield ctx.service.hnclinc.filterByType(type)
        const str1 = colnames1.join(','),
            str2 = colnames2.join(',')
        const md5String = md5(str1 + str2) //这里按照select的选项判断md5？还是按照columnname吧 数据库可能会改
        const rResult = R(`diff.analysis.R`, `${app.config.Rpath}/lncRNA.matrix.adj.txt ${str1} ${str2} ${md5String}`)
        if (rResult.code === 0) {
            console.log(rResult.code) //状态码
        } else {
            console.log(rResult.stderr) //错误日志
        }
        body = {
            list: [{
                id: '12321'
            }],
            str1,
            str2,
            md5String,
            step: 9,
            ret: 200,
        }
    } catch (error) {
        body.error = error
    }
    ctx.body = body
}