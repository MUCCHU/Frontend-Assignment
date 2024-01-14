import React from 'react'
import Label from './Label'

function NumInput(props) {
    const item = props.item
  return (
    <div className='row mb-3 input_wrapper'>
        <Label item={item} />
        <div className="col-sm-7">
          <input type="number" name={item['jsonKey']} required={item['validate']['required']} disabled ={item['validate']['immutable']} pattern={item['validate']['pattern']} className="form-control" id="staticEmail" placeholder={item['placeholder']}/>
        </div>
    </div>
  )
}

export default NumInput