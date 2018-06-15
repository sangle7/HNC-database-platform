import React from 'react'

const Document = props => {
  const { item, del, h1 } = props
  return (
    <div className="markdown-body">
      {Object.entries(item).filter(e => e[1] && e[0] !== del).map(elem => (
        [elem[0] === h1 ? <h1>{elem[0]}</h1> : <h2>{elem[0]}</h2>,
          <p>{elem[1]}</p>]
      ))}
    </div>
  )
}

export default Document
