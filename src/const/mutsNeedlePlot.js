/**
 *
 * Mutations Needle Plot (muts-needle-plot)
 *
 * Creates a needle plot (a.k.a stem plot, lollipop-plot and soon also balloon plot ;-)
 * This class uses the npm-require module to load dependencies d3, d3-tip
 *
 * @author Michael P Schroeder
 * @class
 */

function MutsNeedlePlot (config) {
    var selectedNeedles =[],verticalLegend,categCounts ={}
  // INITIALIZATION

  const self = this // self = MutsNeedlePlot

  // X-coordinates
  this.maxCoord = config.maxCoord || -1 // The maximum coord (x-axis)
  if (this.maxCoord < 0) { throw new Error("'maxCoord' must be defined initiation config!") }
  this.minCoord = config.minCoord || 1 // The minimum coord (x-axis)

  // data
  const mutationData = config.mutationData || -1 // .json file or dict
  if (this.maxCoord < 0) { throw new Error("'mutationData' must be defined initiation config!") }
  const regionData = config.regionData || -1 // .json file or dict
  if (this.maxCoord < 0) { throw new Error("'regionData' must be defined initiation config!") }
  this.totalCategCounts = {}
  this.categCounts = {}
  this.selectedNeedles = []

  // Plot dimensions & target
  const targetElement = document.getElementById(config.targetElement) || config.targetElement || document.body // Where to append the plot (svg)

  const width = this.width = config.width || targetElement.offsetWidth || 1000
  const height = this.height = config.height || targetElement.offsetHeight || 500

  // Color scale & map
  this.colorMap = config.colorMap || {} // dict
  const colors = Object.keys(this.colorMap).map(key => {
    return self.colorMap[key]
  })
  this.colorScale = d3.scale.category20()
    .domain(Object.keys(this.colorMap))
    .range(colors.concat(d3.scale.category20().range()))
  this.legends = config.legends || {
    y: 'Value',
    x: 'Coordinate',
  }

  this.svgClasses = 'mutneedles'
  this.buffer = 0

  const maxCoord = this.maxCoord

  let buffer = 0
  if (width >= height) {
    buffer = height / 8
  } else {
    buffer = width / 8
  }

  this.buffer = buffer

  // IIMPORT AND CONFIGURE TIPS
  const d3tip = require('d3-tip')
  console.log(d3)

  addd3svg(d3)

  d3tip(d3)


  this.tip = d3tip()
    .attr('class', 'd3-tip d3-tip-needle')
    .offset([-10, 0])
    .html(d => {
      return `<span>${d.value} ${d.category} at coord. ${d.coordString}</span>`
    })

  this.selectionTip = d3tip()
    .attr('class', 'd3-tip d3-tip-selection')
    .offset([-50, 0])
    .html(d => {
      return `<span> Selected coordinates<br/>${Math.round(d.left)} - ${Math.round(d.right)}</span>`
    })
    .direction('n')

    // INIT SVG
  var svg
  let topnode
  if (config.responsive == 'resize') {
    topnode = d3.select(targetElement).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${Math.min(width)} ${Math.min(height)}`)
      .attr('class', 'brush')
    svg = topnode
      .append('g')
      .attr('class', this.svgClasses)
      .attr('transform', 'translate(0,0)')
  } else {
    var svg = d3.select(targetElement).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', `${this.svgClasses} brush`)
    topnode = svg
  }


  svg.call(this.tip)
  svg.call(this.selectionTip)

  // DEFINE SCALES

  const x = d3.scale.linear()
    .domain([this.minCoord, this.maxCoord])
    .range([buffer * 1.5, width - buffer])
    .nice()
  this.x = x

  const y = d3.scale.linear()
    .domain([1, 20])
    .range([height - buffer * 1.5, buffer])
    .nice()
  this.y = y

  // CONFIGURE BRUSH
  self.selector = d3.svg.brush()
    .x(x)
    .on('brush', brushmove)
    .on('brushend', brushend)
  const selector = self.selector

  const selectionRect = topnode
    .call(selector)
    .selectAll('.extent')
    .attr('height', 50)
    .attr('y', height - 50)
    .attr('opacity', 0.2)

  selectionRect.on('mouseenter', () => {
    const selection = selector.extent()
    self.selectionTip.show({ left: selection[0], right: selection[1] }, selectionRect.node())
  })
    .on('mouseout', () => {
      d3.select('.d3-tip-selection')
        .transition()
        .delay(3000)
        .duration(1000)
        .style('opacity', 0)
        .style('pointer-events', 'none')
    })

  function brushmove () {
    const extent = selector.extent()
    var needleHeads = d3.selectAll('.needle-head')
    var selectedNeedles = []
    var categCounts = {}
    for (let key in Object.keys(self.totalCategCounts)) {
      categCounts[key] = 0
    }

    needleHeads.classed('selected', d => {
      var is_brushed = extent[0] <= d.coord && d.coord <= extent[1]
      if (is_brushed) {
        selectedNeedles.push(d)
        categCounts[d.category] = (categCounts[d.category] || 0) + d.value
      }
      return is_brushed
    })

    self.trigger('needleSelectionChange', {
      selected: selectedNeedles,
      categCounts,
      coords: extent,
    })
  }

  function brushend () {
    var get_button = d3.select('.clear-button')
    self.trigger('needleSelectionChangeEnd', {
      selected: selectedNeedles,
      categCounts,
      coords: selector.extent(),
    })
  }

  // / DRAW
  this.drawNeedles(svg, mutationData, regionData)


  self.on('needleSelectionChange', edata => {
    self.categCounts = edata.categCounts
    self.selectedNeedles = edata.selected
    svg.call(verticalLegend)
  })

  self.on('needleSelectionChangeEnd', edata => {
    self.categCounts = edata.categCounts
    self.selectedNeedles = edata.selected
    svg.call(verticalLegend)
  })

  self.on('needleSelectionChange', edata => {
    const selection = edata.coords
    if (selection[1] - selection[0] > 0) {
      self.selectionTip.show({ left: selection[0], right: selection[1] }, selectionRect.node())
      d3.select('.d3-tip-selection')
        .transition()
        .delay(3000)
        .duration(1000)
        .style('opacity', 0)
        .style('pointer-events', 'none')
    } else {
      self.selectionTip.hide()
    }
  })
}

MutsNeedlePlot.prototype.drawLegend = function (svg) {
  // LEGEND
  self = this

  // prepare legend categories (correct order)
  const mutCategories = []
  const categoryColors = []
  const allcategs = Object.keys(self.totalCategCounts) // random order
  const orderedDeclaration = self.colorScale.domain() // wanted order
  for (const idx in orderedDeclaration) {
    c = orderedDeclaration[idx]
    if (allcategs.indexOf(c) > -1) {
      mutCategories.push(c)
      categoryColors.push(self.colorScale(c))
    }
  }

  // create scale with correct order of categories
  const mutsScale = self.colorScale.domain(mutCategories).range(categoryColors)


  const domain = self.x.domain()
  const xplacement = (self.x(domain[1]) - self.x(domain[0])) * 0.75 + self.x(domain[0])


  let sum = 0
  for (var c in self.totalCategCounts) {
    sum += self.totalCategCounts[c]
  }

  const legendLabel = function (categ) {
    const count = (self.categCounts[categ] || (self.selectedNeedles.length == 0 && self.totalCategCounts[categ]) || 0)
    return categ + (count > 0 ? `: ${count} (${Math.round(count / sum * 100)}%)` : '')
  }

  const legendClass = function (categ) {
    const count = (self.categCounts[categ] || (self.selectedNeedles.length == 0 && self.totalCategCounts[categ]) || 0)
    return (count > 0) ? '' : 'nomuts'
  }

  self.noshow = []
  const needleHeads = d3.selectAll('.needle-head')
  const showNoShow = function (categ) {
    if (_.contains(self.noshow, categ)) {
      self.noshow = _.filter(self.noshow, s => { return s != categ })
    } else {
      self.noshow.push(categ)
    }
    needleHeads.classed('noshow', d => {
      return _.contains(self.noshow, d.category)
    })
    const legendCells = d3.selectAll('g.legendCells')
    legendCells.classed('noshow', d => {
      return _.contains(self.noshow, d.stop[0])
    })
  }


  var verticalLegend = d3.svg.legend()
    .labelFormat(legendLabel)
    .labelClass(legendClass)
    .onLegendClick(showNoShow)
    .cellPadding(4)
    .orientation('vertical')
    .units(`${sum} Mutations`)
    .cellWidth(20)
    .cellHeight(12)
    .inputScale(mutsScale)
    .cellStepping(4)
    .place({ x: xplacement, y: 50 })

  svg.call(verticalLegend)
}

MutsNeedlePlot.prototype.drawRegions = function (svg, regionData) {
  const maxCoord = this.maxCoord
  const minCoord = this.minCoord
  const buffer = this.buffer
  const colors = this.colorMap
  const y = this.y
  const x = this.x

  const below = true


  const getRegionStart = function (region) {
    return parseInt(region.split('-')[0])
  }

  const getRegionEnd = function (region) {
    return parseInt(region.split('-')[1])
  }

  const getColor = this.colorScale

  const bg_offset = 0
  const region_offset = bg_offset - 3
  let text_offset = bg_offset + 20
  if (below != true) {
    text_offset = bg_offset + 5
  }

  function draw (regionList) {
    let regionsBG = d3.select('.mutneedles').selectAll()
      .data(['dummy']).enter()
      .insert('g', ':first-child')
      .attr('class', 'regionsBG')
      .append('rect')
      .attr('x', x(minCoord))
      .attr('y', y(0) + bg_offset)
      .attr('width', x(maxCoord) - x(minCoord))
      .attr('height', 10)
      .attr('fill', 'lightgrey')


    d3.select('.extent')
      .attr('y', y(0) + region_offset - 10)


    const regions = regionsBG = d3.select('.mutneedles').selectAll()
      .data(regionList)
      .enter()
      .append('g')
      .attr('class', 'regionGroup')

    regions.append('rect')
      .attr('x', r => {
        return x(r.start)
      })
      .attr('y', y(0) + region_offset)
      .attr('ry', '3')
      .attr('rx', '3')
      .attr('width', r => {
        return x(r.end) - x(r.start)
      })
      .attr('height', 16)
      .style('fill', data => {
        return data.color
      })
      .style('stroke', data => {
        return d3.rgb(data.color).darker()
      })

    regions
      .attr('pointer-events', 'all')
      .attr('cursor', 'pointer')
      .on('click', r => {
        // set custom selection extent
        self.selector.extent([r.start, r.end])
        // call the extent to change with transition
        self.selector(d3.select('.brush').transition())
        // call extent (selection) change listeners
        self.selector.event(d3.select('.brush').transition().delay(300))
      })

    // Place and label location
    const labels = []

    const repeatedRegion = {}
    const getRegionClass = function (region) {
      const c = 'regionName'
      const repeatedClass = `RR_${region.name}`
      // if(_.has(repeatedRegion, region.name)) {
      //     c = "repeatedName noshow " + repeatedClass;
      // }
      repeatedRegion[region.name] = repeatedClass
      return c
    }
    regions.append('text')
      .attr('class', getRegionClass)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .attr('opacity', 0.5)
      .attr('x', r => {
        r.x = x(r.start) + (x(r.end) - x(r.start)) / 2
        return r.x
      })
      .attr('y', r => { r.y = y(0) + text_offset; return r.y })
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('text-decoration', 'bold')
      .text(data => {
        return data.name
      })

    const regionNames = d3.selectAll('.regionName')
    regionNames.each(function (d, i) {
      const interactionLength = this.getBBox().width / 2
      labels.push({ x: d.x, y: d.y, label: d.name, weight: d.name.length, radius: interactionLength })
    })

    const force = d3.layout.force()
      .chargeDistance(5)
      .nodes(labels)
      .charge(-10)
      .gravity(0)

    const minX = x(minCoord)
    const maxX = x(maxCoord)
    const withinBounds = function (x) {
      return d3.min([
        d3.max([
          minX,
          x]),
        maxX,
      ])
    }
    function collide (node) {
      let r = node.radius + 3,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r
      return function (quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          let l = node.x - quad.point.x,
            x = l
          r = node.radius + quad.point.radius
          if (Math.abs(l) < r) {
            l = (l - r) / l * 0.005
            x *= l
            x = (node.x > quad.point.x && x < 0) ? -x : x
            node.x += x
            quad.point.x -= x
          }
        }
        return x1 > nx2
                    || x2 < nx1
                    || y1 > ny2
                    || y2 < ny1
      }
    }
    const moveRepeatedLabels = function (label, x) {
      const name = repeatedRegion[label]
      svg.selectAll(`text.${name}`)
        .attr('x', x)
    }
    force.on('tick', e => {
      var q = d3.geom.quadtree(labels),
        i = 0,
        n = labels.length
      while (++i < n) {
        q.visit(collide(labels[i]))
      }
      // Update the position of the text element
      var i = 0
      svg.selectAll('text.regionName')
        .attr('x', d => {
          const newx = labels[i++].x
          moveRepeatedLabels(d.name, newx)
          return newx
        }
        )
    })
    force.start()
  }

  function formatRegions (regions) {
    for (let key in Object.keys(regions)) {
      regions[key].start = getRegionStart(regions[key].coord)
      regions[key].end = getRegionEnd(regions[key].coord)
      if (regions[key].start == regions[key].end) {
        regions[key].start -= 0.4
        regions[key].end += 0.4
      }
      regions[key].color = getColor(regions[key].name)
      /* regionList.push({
                'name': key,
                'start': getRegionStart(regions[key]),
                'end': getRegionEnd(regions[key]),
                'color': getColor(key)
            }); */
    }
    return regions
  }

  if (typeof regionData === 'string') {
    // assume data is in a file
    d3.json(regionData, (error, regions) => {
      if (error) { return console.debug(error) }
      const regionList = formatRegions(regions)
      draw(regionList)
    })
  } else {
    const regionList = formatRegions(regionData)
    draw(regionList)
  }
}


MutsNeedlePlot.prototype.drawAxes = function (svg) {
  const y = this.y
  const x = this.x

  const xAxis = d3.svg.axis().scale(x).orient('bottom')

  svg.append('svg:g')
    .attr('class', 'x-axis axis')
    .attr('transform', `translate(0,${this.height - this.buffer})`)
    .call(xAxis)

  const yAxis = d3.svg.axis().scale(y).orient('left')


  svg.append('svg:g')
    .attr('class', 'y-axis axis')
    .attr('transform', `translate(${this.buffer * 1.2 + -10},0)`)
    .call(yAxis)

    // appearance for x and y legend
  d3.selectAll('.axis path')
    .attr('fill', 'none')
  d3.selectAll('.domain')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)

  svg.append('text')
    .attr('class', 'y-label')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(${this.buffer / 3},${this.height / 2}), rotate(-90)`)
    .text(this.legends.y)
    .attr('font-weight', 'bold')
    .attr('font-size', 12)

  svg.append('text')
    .attr('class', 'x-label')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(${this.width / 2},${this.height - this.buffer / 3})`)
    .text(this.legends.x)
    .attr('font-weight', 'bold')
    .attr('font-size', 12)
}


MutsNeedlePlot.prototype.drawNeedles = function (svg, mutationData, regionData) {
  const y = this.y
  const x = this.x
  const self = this

  const getYAxis = function () {
    return y
  }

  const formatCoord = function (coord) {
    if (coord.indexOf('-') > -1) {
      const coords = coord.split('-')

      // place neede at middle of affected region
      coord = Math.floor((parseInt(coords[0]) + parseInt(coords[1])) / 2)

      // check for splice sites: "?-9" or "9-?"
      if (isNaN(coord)) {
        if (coords[0] == '?') { coord = parseInt(coords[1]) } else if (coords[1] == '?') { coord = parseInt(coords[0]) }
      }
    } else {
      coord = parseInt(coord)
    }
    return coord
  }

  const tip = this.tip

  // stack needles at same pos
  const needlePoint = {}
  let highest = 0

  const stackNeedle = function (pos, value, pointDict) {
    var stickHeight = 0
    var pos = `p${String(pos)}`
    if (pos in pointDict) {
      var stickHeight = pointDict[pos]
      const newHeight = stickHeight + value
      pointDict[pos] = newHeight
    } else {
      pointDict[pos] = value
    }
    return stickHeight
  }

  function formatMutationEntry (d) {
    const coordString = d.coord
    const numericCoord = formatCoord(d.coord)
    const numericValue = Number(d.value)
    const stickHeight = stackNeedle(numericCoord, numericValue, needlePoint)
    const category = d.category || 'other'

    if (stickHeight + numericValue > highest) {
      // set Y-Axis always to highest available
      highest = stickHeight + numericValue
      getYAxis().domain([0, highest + 2])
    }


    if (numericCoord > 0) {
      // record and count categories
      self.totalCategCounts[category] = (self.totalCategCounts[category] || 0) + numericValue

      return {
        category,
        coordString,
        coord: numericCoord,
        value: numericValue,
        stickHeight,
        color: self.colorScale(category),
      }
    }
    console.debug(`discarding ${d.coord} ${d.category}(${numericCoord})`)
  }

  let muts = []


  if (typeof mutationData === 'string') {
    d3.json(mutationData, (error, unformattedMuts) => {
      console.log(mutationData, unformattedMuts)
      if (error) {
        throw new Error(error)
      }
      const muts = prepareMuts(unformattedMuts)
      paintMuts(muts)
    })
  } else {
    muts = prepareMuts(mutationData)
    paintMuts(muts)
  }

  function prepareMuts (unformattedMuts) {
    for (const key in unformattedMuts) {
      const formatted = formatMutationEntry(unformattedMuts[key])
      if (formatted != undefined) {
        muts.push(formatted)
      }
    }
    return muts
  }


  function paintMuts (muts) {
    const minSize = 4
    const maxSize = 10
    const headSizeScale = d3.scale.log().range([minSize, maxSize]).domain([1, highest / 2])
    const headSize = function (n) {
      return d3.min([d3.max([headSizeScale(n), minSize]), maxSize])
    }


    const needles = d3.select('.mutneedles').selectAll()
      .data(muts).enter()
      .append('line')
      .attr('y1', data => { return y(data.stickHeight + data.value) + headSize(data.value) })
      .attr('y2', data => { return y(data.stickHeight) })
      .attr('x1', data => { return x(data.coord) })
      .attr('x2', data => { return x(data.coord) })
      .attr('class', 'needle-line')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)

    const needleHeads = d3.select('.mutneedles').selectAll()
      .data(muts)
      .enter()
      .append('circle')
      .attr('cy', data => { return y(data.stickHeight + data.value) })
      .attr('cx', data => { return x(data.coord) })
      .attr('r', data => { return headSize(data.value) })
      .attr('class', 'needle-head')
      .style('fill', data => { return data.color })
      .style('stroke', data => { return d3.rgb(data.color).darker() })
      .on('mouseover', function (d) { d3.select(this).moveToFront(); tip.show(d) })
      .on('mouseout', tip.hide)

    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this)
      })
    }

    // adjust y-scale according to highest value an draw the rest
    if (regionData != undefined) {
      self.drawRegions(svg, regionData)
    }
    self.drawLegend(svg)
    self.drawAxes(svg)

    /* Bring needle heads in front of regions */
    needleHeads.each(function () {
      this.parentNode.appendChild(this)
    })
  }
}


function addd3svg (d3) {
  d3.svg.legend = function () {
    const legendValues = [{ color: 'red', stop: [0, 1] }, { color: 'blue', stop: [1, 2] }, { color: 'purple', stop: [2, 3] }, { color: 'yellow', stop: [3, 4] }, { color: 'Aquamarine', stop: [4, 5] }]
    let legendScale
    let cellWidth = 30
    let cellHeight = 20
    const adjustable = false
    let labelFormat = d3.format('.01f')
    let coordinates = { x: 0, y: 0 }
    let labelUnits = 'units'
    const lastValue = 6
    let changeValue = 1
    let orientation = 'horizontal'
    let cellPadding = 0
    let labelClass = function () { return '' }
    let onClick


    function legend (svg) {
      const updateBGSize = function (legend) {
        const margin = 10
        const dim = legend.target.node().getBBox()
        dim.height += margin * 2
        dim.width += margin * 2
        dim.y -= margin
        dim.x -= margin

        legend.parentGroup.select('.mutLegendBG')
          .attr(dim)
          .attr('cursor', 'move')
          .attr('stroke', 'lightgrey')
          .attr('opacity', 0.7)
          .attr('stroke-width', 2)
      }

      const drag = d3.behavior.drag()
        .on('drag', function (d, i) {
          d.x += d3.event.dx
          d.y += d3.event.dy
          d3.select(this).attr('transform', (d, i) => {
            return `translate(${[d.x, d.y]})`
          })
        })
        .on('dragstart', () => {
          d3.event.sourceEvent.stopPropagation() // silence other listeners
        })

      function init () {
        const mutLegendGroup = svg.append('g')
          .attr('class', 'mutLegendGroup')
          .data([coordinates])
          .attr('transform', `translate(${coordinates.x},${coordinates.y})`)
        const target = mutLegendGroup
          .insert('g')
          .attr('class', 'mutLegendGroupText')


        // set legend background
        const mutLegendBG = mutLegendGroup
          .insert('rect', ':first-child')
          .attr('class', 'mutLegendBG')
          .attr('fill', 'white')
          .attr('stroke', 'black')
          .attr('stroke-width', '1px')


        return {
          parentGroup: mutLegendGroup,
          target,
        }
      }


      function cellRange (valuePosition, changeVal) {
        legendValues[valuePosition].stop[0] += changeVal
        legendValues[valuePosition - 1].stop[1] += changeVal
        redraw()
      }

      function redraw () {
        legend.target.selectAll('g.legendCells').data(legendValues).exit().remove()
        legend.target.selectAll('g.legendCells').select('rect').style('fill', d => { return d.color })
        if (orientation == 'vertical') {
          legend.target.selectAll('g.legendCells')
            .select('text.breakLabels')
            .style('display', 'block')
            .style('text-anchor', 'start')
            .attr('font-size', 12)
            .attr('x', cellWidth + cellPadding)
            .attr('y', 5 + (cellHeight / 2))
            .attr('class', d => { return `breakLabels ${labelClass(d.stop[0])}` })
            .text(d => { return labelFormat(d.stop[0]) + (d.stop[1].length > 0 ? ` - ${labelFormat(d.stop[1])}` : '') })
          legend.target.selectAll('g.legendCells')
            .attr('transform', (d, i) => { return `translate(0,${i * (cellHeight + cellPadding)})` })
        } else {
          legend.target.selectAll('g.legendCells').attr('transform', (d, i) => { return `translate(${i * cellWidth},0)` })
          legend.target.selectAll('text.breakLabels').style('text-anchor', 'middle').attr('x', 0).attr('y', -7)
            .style('display', (d, i) => { return i == 0 ? 'none' : 'block' })
            .text(d => { return labelFormat(d.stop[0]) })
        }
      }

      // init
      if (!legend.initDone) {
        const initObj = init()
        legend.target = initObj.target
        legend.parentGroup = initObj.parentGroup
        legend.parentGroup.call(drag)
        legend.initDone = true
      }


      // remove previously painted rect and text
      legend.target.selectAll('g.legendCells').select('text.breakLabels').remove()
      legend.target.selectAll('g.legendCells').select('rect').remove()
      legend.target.selectAll('.legendTitle').remove()


      const cells = legend.target.selectAll('g.legendCells')
        .data(legendValues)
        .enter()
        .append('g')
        .attr('class', 'legendCells')
        .attr('transform', (d, i) => { return `translate(${i * (cellWidth + cellPadding)},0)` })

      const rects = legend.target.selectAll('g.legendCells')
        .append('rect')
        .attr('class', 'breakRect')
        .attr('height', cellHeight)
        .attr('width', cellWidth)
        .style('fill', d => { return d.color })
        .style('stroke', d => { return d3.rgb(d.color).darker() })

      if (legend.onLegendClick != undefined) {
        cells.on('click', d => { onClick(d.stop[0]) })
      }

      legend.target.selectAll('g.legendCells')
        .append('text')
        .attr('class', 'breakLabels')
        .style('pointer-events', 'cross')

      legend.target.append('text')
        .text(labelUnits)
        .attr('y', -7)
        .attr('class', 'legendTitle')

      redraw()
      updateBGSize(legend)
    }

    legend.initDone = false
    legend.target

    legend.inputScale = function (newScale) {
      if (!arguments.length) return scale
      var scale = newScale
      const legendValues = []
      if (scale.invertExtent) {
        // Is a quantile scale
        scale.range().forEach(el => {
          const cellObject = { color: el, stop: scale.invertExtent(el) }
          legendValues.push(cellObject)
        })
      } else {
        scale.domain().forEach(el => {
          const cellObject = { color: scale(el), stop: [el, ''] }
          legendValues.push(cellObject)
        })
      }
      return this
    }

    legend.scale = function (testValue) {
      let foundColor = legendValues[legendValues.length - 1].color
      for (el in legendValues) {
        if (testValue < legendValues[el].stop[1]) {
          foundColor = legendValues[el].color
          break
        }
      }
      return foundColor
    }

    legend.cellWidth = function (newCellSize) {
      if (!arguments.length) return cellWidth
      cellWidth = newCellSize
      return this
    }

    legend.cellHeight = function (newCellSize) {
      if (!arguments.length) return cellHeight
      cellHeight = newCellSize
      return this
    }

    legend.cellPadding = function (newCellPadding) {
      if (!arguments.length) return cellPadding
      cellPadding = newCellPadding
      return this
    }

    legend.cellExtent = function (incColor, newExtent) {
      const selectedStop = legendValues.filter(el => { return el.color == incColor })[0].stop
      if (arguments.length == 1) return selectedStop
      legendValues.filter(el => { return el.color == incColor })[0].stop = newExtent
      return this
    }

    legend.cellStepping = function (incStep) {
      if (!arguments.length) return changeValue
      changeValue = incStep
      return this
    }

    legend.units = function (incUnits) {
      if (!arguments.length) return labelUnits
      labelUnits = incUnits
      return this
    }

    legend.orientation = function (incOrient) {
      if (!arguments.length) return orientation
      orientation = incOrient
      return this
    }

    legend.labelFormat = function (incFormat) {
      if (!arguments.length) return labelFormat
      labelFormat = incFormat
      if (incFormat == 'none') {
        labelFormat = function (inc) { return inc }
      }
      return this
    }

    legend.place = function (incCoordinates) {
      if (!arguments.length) return coordinates
      coordinates = incCoordinates
      return this
    }

    legend.labelClass = function (incClass) {
      if (!arguments.length) return labelClass
      if (typeof incClass !== 'function') {
        incClass = function () { return incClass }
      }
      labelClass = incClass
      return this
    }


    legend.onLegendClick = function (incOnClick) {
      if (!arguments.length) return onClick
      onClick = incOnClick
      return this
    }

    return legend
  }
}


const Events = require('biojs-events')

Events.mixin(MutsNeedlePlot.prototype)

module.exports = MutsNeedlePlot

