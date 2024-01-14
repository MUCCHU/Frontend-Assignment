import React from 'react'

function Radio(props) {
    const item = props.item;
  return (
    <>
        <div className="col-sm-12">
        {item['validate']['options'].map((option) => (
            <>
                <input type="radio" class="btn-check" name={item['jsonKey']} id={option['value']} autocomplete="off" value={option['value']} defaultChecked={option['value']==item['validate']['defaultValue']}  />
                <label class="btn btn-secondary" for={option['value']}>{option['label']}</label>
            </>
        ))}
        </div>
    </>
  )
}

export default Radio