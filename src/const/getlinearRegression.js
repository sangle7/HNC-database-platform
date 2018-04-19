const getlinearRegression = data => {
  const n = data.length
  const obj = data[0]
  const [i, cx, cy] = Object.keys(obj)
  let xSum = 0
  let ySum = 0
  let xSum1 = 0
  let ySum1 = 0
  for (let i = 0; i < n; i++) {
    xSum += data[i][cx];
    ySum += data[i][cy];
  }
  const xMean = xSum / n //x平均值
  const yMean = ySum / n //y平均值

  let num = 0
  let den = 0
  for (let i = 0; i < n; i++) {
    let x = data[i][cx]
    let y = data[i][cy]
    num += (x - xMean) * (y - yMean)
    den += (x - xMean) * (x - yMean)

    xSum1 += Math.pow(data[i][cx] - xMean , 2)  
    ySum1 += Math.pow(data[i][cy] - yMean , 2) 
  }
  const a = num / den
  const b = yMean - a * xMean
  const xMin = Math.min.apply(0, data.map(elem => elem[cx]))
  const xMax = Math.max.apply(0, data.map(elem => elem[cx]))

  const xSd = Math.sqrt(xSum1 / n) //x标准差
  const ySd = Math.sqrt(ySum1 / n) //y标准差

  let total = 0
  for (let i = 0; i < n; i++) {
    total += (data[i][cx] - xMean) / xSd * (data[i][cy] - yMean) / ySd
  }

  const result = total / n

  return { xMin, xMax, a, b, result }
};

export default getlinearRegression