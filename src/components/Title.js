import React from 'react'

const Title = ({title, classColor}) => (
    <React.Fragment>
        <h1 className={classColor}> {title} </h1>
    </React.Fragment>
)

export default Title;