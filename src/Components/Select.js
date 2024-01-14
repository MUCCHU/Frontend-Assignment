import React from 'react'
import Label from './Label'

function Select(props) {
    const item = props.item;
  return (
    <>
        <div className='row mb-3 input_wrapper'>
            <Label item={item} />
            <div className="col-sm-7">
            <select className="form-select" required={item['validate']['required']} disabled ={item['validate']['immutable']} name={item['jsonKey']} aria-label="Default select example">
                {item['validate']['options'].map((option) => (
                    <option value={option['value']} selected={option['value'] == item['defaultValue']}>{option['label']}</option>
                ))}
            </select>
            </div>
        </div>
    </>
  )
}

export default Select