import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateState } from '../Redux/slicer'
import genUniqueKey from './genUniqueKey'

function Radio(props) {
  const item = props.item
  const [value, setValue] = useState(item['validate']['defaultValue'])
  const dispatch = useDispatch()
  const ukey = genUniqueKey(item)
  useEffect(() => {
    dispatch(updateState({ key: ukey, value: item['validate']['defaultValue'] }))
  }, [item, dispatch, ukey])
  const onChange = (e) => {
    setValue(e.target.value)
    dispatch(updateState({ key: ukey, value: e.target.value }))
  }
  if(!props.visible) return null
  return (
    <>
      <div className='col-sm-12 radio_wrapper'>
        {item['validate']['options'].map((option, index) => (
          <div key={index} className='radio_button'>
            <input
              type='radio'
              className='btn-check'
              name={item['jsonKey']}
              id={option['value']}
              autoComplete='off'
              value={option['value']}
              defaultChecked={option['value'] === value}
              onClick={onChange}
            />
            <label className='btn btn-secondary' htmlFor={option['value']}>
              {option['label']}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}

export default Radio
