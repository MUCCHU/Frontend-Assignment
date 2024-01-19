import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateState } from '../Redux/slicer'
import genUniqueKey from './genUniqueKey'
import Required from './Required'

function Switch(props) {
  const item = props.item
  const [checked, setChecked] = useState(item['validate']['defaultValue'])
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
  const dispatch = useDispatch()
  const ukey = genUniqueKey(item)

  useEffect(() => {
    dispatch(updateState({ key: ukey, value: checked }))
  }, [checked, ukey, dispatch])
  return (
    <>
      <div className='form-check form-switch'>
        <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
          {item['label']} {item['validate']['required'] && <Required />}
        </label>
        <input
          className='form-check-input'
          type='checkbox'
          role='switch'
          onChange={handleChange}
          id='flexSwitchCheckDefault'
          checked={checked}
        />
      </div>
    </>
  )
}

export default Switch
