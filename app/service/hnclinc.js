module.exports = app => {
  return class Databaselist extends app.Service {
    * queryById (id) {
      const item = yield app.mysql.get('hnclinc',{id})
      return { item }
    }
    * filterByType(type = 'hpv') {
      const colnames1=[],colnames2= []
      const results = yield app.mysql.query('SELECT * FROM hnclinc WHERE ? IS NOT NULL;',[type]);
      results.forEach(element => {
        if(/^pos/i.test(element[type]) && /^GSM/.test(element.SampleID)){
          colnames1.push(element.SampleID)
        }
        else if(/^neg/i.test(element[type]) && /^GSM/.test(element.SampleID)){
          colnames2.push(element.SampleID)
        }
      });
      return { colnames1, colnames2}
    }
  }
}
