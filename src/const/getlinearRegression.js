const getlinearRegression = data => {
  const obj = data[0]
  const [i, cx, cy] = Object.keys(obj)
  let xSum = 0
  let ySum = 0
  for (let i = 0; i < data.length; i++) {
    xSum += data[i][cx];
    ySum += data[i][cy];
  }
  const xMean = xSum / data.length
  const yMean = ySum / data.length;
  let num = 0
  let den = 0
  for (let i = 0; i < data.length; i++) {
    let x = data[i][cx]
    let y = data[i][cy]
    num += (x - xMean) * (y - yMean)
    den += (x - xMean) * (x - yMean)
  }
  const a = num / den
  const b = yMean - a * xMean
  const xMin = Math.min.apply(0, data.map(elem => elem[cx]))
  const xMax = Math.max.apply(0, data.map(elem => elem[cx]))

  return { xMin, xMax, a, b }
};

export default getlinearRegression