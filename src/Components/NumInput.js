import React from 'react'
import Required from './Required'
import info from './info_icon.svg'

function NumInput(props) {
    const item = props.item
  return (
    <div className='row mb-3 input_wrapper'>
        <label htmlFor="staticEmail" className="col-sm-5 col-form-label">
                        {item['label']}
                        {item['validate']['required'] && <Required />}
                        {item['description'] && <span className="d-inline-block ps-2" tabindex="0" data-bs-toggle="tooltip" data-bs-placement="left" title={item['description']}>
                            <img src={info} />
                        </span>}  
                    </label>
                    <div className="col-sm-7">
                    <input type="number" name={item['jsonKey']} disabled ={item['validate']['immutable']} pattern={item['validate']['pattern']} className="form-control" id="staticEmail" placeholder={item['placeholder']}/>
                    </div>
    </div>
  )
}

export default NumInput