function countFromArray (array, countkey) {
  const dataObj = array.reduce((pre, elem) => {
    const molArr = elem[countkey].split(';')
    molArr.forEach(item => {
      pre[item] = pre[item] ? pre[item] + 1 : 1
    })
    return pre
  }, {})
  const data = Object.entries(dataObj).map(elem => {
    return {
      name: elem[0],
      value: elem[1],
    }
  })
  return data
}

export default countFromArray
