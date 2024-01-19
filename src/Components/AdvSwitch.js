import React from 'react'

function AdvSwitch(props) {
    const handleChange = (event) => {
      props.setShowOptional(event.target.checked)
    }
  return (
    <>
    <div className='form-check form-switch mb-3'>
      <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
        {"Show Advanced fields"}
      </label>
      <input
        className='form-check-input'
        type='checkbox'
        role='switch'
        onChange={handleChange}
        id='flexSwitchCheckDefault'
        checked={props.showOptional}
      />
    </div>
  </>
  )
}

export default AdvSwitch