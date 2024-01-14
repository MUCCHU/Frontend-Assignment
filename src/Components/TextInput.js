import React from 'react'
import Label from './Label'


function TextInput(props) {
    const item = props.item
  return (
    <div className='row mb-3 input_wrapper'>
                    <Label item={item} />
                    <div className="col-sm-7">
                    <input type="text" required={item['validate']['required']} name={item['jsonKey']} disabled ={item['validate']['immutable']} pattern={item['validate']['pattern']} className="form-control" id="staticEmail" placeholder={item['placeholder']}/>
                    </div>
    </div>
  )
}

export default TextInput