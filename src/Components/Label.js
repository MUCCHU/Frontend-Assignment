import React from 'react'
import Required from './Required'
import info from './info_icon.svg'

function Label(props) {
    const item = props.item
  return (
    <>
        <label htmlFor="staticEmail" className="col-sm-5 col-form-label">
                {item['label']}
                {item['validate']['required'] && <Required />}
                {item['description'] && <span className="d-inline-block ps-2" tabindex="0" data-bs-toggle="tooltip" data-bs-placement="left" title={item['description']}>
                    <img src={info} />
                </span>}  
            </label>
    </>
  )
}

export default Label