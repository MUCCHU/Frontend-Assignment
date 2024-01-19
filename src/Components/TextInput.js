import React, { useState, useEffect } from 'react'
import Label from './Label'
import { useDispatch } from 'react-redux'
import { updateState } from '../Redux/slicer'
import genUniqueKey from './genUniqueKey'

function TextInput(props) {
  const item = props.item
  const [value, setValue] = useState(item['validate']['defaultValue'])

  const ukey = genUniqueKey(item)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateState({ key: ukey, value: item['validate']['defaultValue'] }))
  }, [item, dispatch, ukey])
  const onChange = (e) => {
    setValue(e.target.value)
    dispatch(updateState({ key: ukey, value: e.target.value }))
  }
  if(!props.visible) return null
  return (
    <div className='row mb-3 input_wrapper'>
      <Label item={item} />
      <div className='col-sm-7'>
        <input
          type='text'
          required={item['validate']['required']}
          name={item['jsonKey']}
          disabled={item['validate']['immutable']}
          value={value}
          onChange={onChange}
          pattern={item['validate']['pattern']}
          className='form-control'
          id='staticEmail'
          placeholder={item['placeholder']}
        />
      </div>
    </div>
  )
}

export default TextInput
