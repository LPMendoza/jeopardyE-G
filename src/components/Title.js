import React from 'react'

const Title = ({
    title, 
    classColor, 
    readOnly,
    onChangeTitle
    }) => {
    let domTitle = <h1 className={classColor}> {title} </h1>;
    if(readOnly == false) {
        domTitle = <input onChange={onChangeTitle} type="text" maxLength="50" defaultValue={title} readOnly={readOnly} placeholder="Type here the board name" className={"titleBoard col-12 " + classColor}/>;
    }
    return (
        
        <React.Fragment>
            {domTitle}
        </React.Fragment>

    )
}

export default Title;