import React, {useState, useEffect} from 'react'
import Label from './Label'
import { useDispatch } from 'react-redux'
import { updateState } from '../Redux/slicer';
import genUniqueKey from './genUniqueKey';

function Select(props) {
    const item = props.item;
    const dispatch = useDispatch()
    const [value, setValue] = useState(item['validate']['defaultValue'])
    const ukey = genUniqueKey(item);
    useEffect(() => {
        dispatch(updateState({key:ukey, value:item['validate']['defaultValue']}))
    }, [item['validate']['defaultValue']])
    const onChange = (e) => {
        setValue(e.target.value)
        dispatch(updateState({key:ukey, value:e.target.value}))
    }

  return (
    <>
        <div className='row mb-3 input_wrapper'>
            <Label item={item} />
            <div className="col-sm-7">
            <select className="form-select" onChange={onChange} required={item['validate']['required']} disabled ={item['validate']['immutable']} name={item['jsonKey']} aria-label="Default select example">
                {item['validate']['options'].map((option) => (
                    <option value={option['value']} selected={option['value'] === value}>{option['label']}</option>
                ))}
            </select>
            </div>
        </div>
    </>
  )
}

export default Select