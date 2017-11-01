function countFromArray (array, countkey) {
  const dataObj = array.reduce((pre, elem) => {
    const molArr = elem[countkey].split(';')
    molArr.forEach(item => {
      pre[item] = pre[item] ? pre[item] + 1 : 1
    })
    return pre
  }, {})
  const data = []
  for (let key in dataObj) {
    data.push({
      name: key,
      count: dataObj[key],
    })
  }
  return data
}

export { countFromArray }