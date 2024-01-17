import React, {useState, useEffect} from 'react'
import Label from './Label'
import { useDispatch } from 'react-redux'
import { updateState } from '../Redux/slicer';
import genUniqueKey from './genUniqueKey';

function NumInput(props) {
    const item = props.item
    const [value, setValue] = useState(item['validate']['defaultValue'])
    const ukey = genUniqueKey(item);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateState({key:ukey, value:item['validate']['defaultValue']}))
    }, [item['validate']['defaultValue']])
    const onChange = (e) => {
        setValue(e.target.value)
        dispatch(updateState({key:ukey, value:e.target.value}))
    }

    return (
      <div className='row mb-3 input_wrapper'>
          <Label item={item} />
          <div className="col-sm-7">
            <input type="number" name={item['jsonKey']} required={item['validate']['required']} disabled ={item['validate']['immutable']} pattern={item['validate']['pattern']} className="form-control" id="staticEmail" value={value} onChange={onChange} placeholder={item['placeholder']}/>
          </div>
      </div>
    )
}

export default NumInput