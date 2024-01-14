import React from 'react'
import { useState } from 'react';

function Switch(props) {
    const item = props.item;
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
  return (
    <>
        <div class="form-check form-switch">
        <label class="form-check-label" for="flexSwitchCheckDefault">{item['label']}</label>
        <input class="form-check-input" type="checkbox" role="switch" onChange={handleChange} id="flexSwitchCheckDefault"/>
        </div>
    </>
  )
}

export default Switch