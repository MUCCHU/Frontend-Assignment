import React, {useState} from 'react'
import TextInput from './TextInput'
import NumInput from './NumInput'
import Required from './Required'
import info from './info_icon.svg'
import Select from './Select'
import Radio from './Radio'
import Switch from './Switch'
import AdvSwitch from './AdvSwitch'
import { useSelector } from 'react-redux'

function RenderItem(props) {
  const { item } = props

  const [showOpt, setShowOpt] = useState(false)
  const state = useSelector((state) => state.data)
  const shouldRender = (item) => {
    if (item['uiType'] !== 'Ignore') {
      return true
    }
    let conditions = item['conditions']
    let should_render = true
    for (let i = 0; i < conditions.length; i++) {
      let condition = conditions[i]
      if (condition['op'] === '==') {
        let level = (conditions[i]['jsonKey'].match(/\./g) || []).length
        let temp = (conditions[i]['value'] === state[conditions[i].jsonKey.split('.').slice(-1)[0] + '_' + level])
        if(condition['action']!=='enable') temp = !temp
        should_render = (should_render && temp)
      }
    }
    return should_render
  }


  if (item.uiType === 'Group') {
    if(!(item['validate']['required'] || props.showOpt)) return null
    return (
      <div className='row mb-3 input_wrapper'>
        <label htmlFor='staticEmail' className='col-sm-12 col-form-label'>
          {item['label']}
          {item['validate']['required'] && <Required />}
          {item['description'] && (
            <span
              className='d-inline-block ps-2'
              tabIndex='0'
              data-bs-toggle='tooltip'
              data-bs-placement='left'
              title={item['description']}
            >
              <img alt='info icon' src={info} />
            </span>
          )}
        </label>
        <hr />
        {item['subParameters'].map((subItem, index) => {
          return <RenderItem showOpt={showOpt} setShowOpt={setShowOpt} item={subItem} key={index} />
        })}
      </div>
    )
  } else if (item.uiType === 'Input') {
    return ((<TextInput visible={(item['validate']['required'] || props.showOpt)} item={item} />))
  } else if (item.uiType === 'Number') {
    return (<NumInput visible={(item['validate']['required'] || props.showOpt)} item={item} />)
  } else if (item.uiType === 'Select') {
    return (<Select visible={(item['validate']['required'] || props.showOpt)} item={item} />)
  } else if (item.uiType === 'Radio') {
    return (<Radio visible={(item['validate']['required'] || props.showOpt)} item={item} />)
  } else if (item.uiType === 'Switch') {
    return (<Switch visible={(item['validate']['required'] || props.showOpt)} item={item} />)
  } else if (item.uiType === 'Ignore') {
    if (!shouldRender(item)) {
      return null
    }
    // shouldRender(item)
    return item['subParameters'].map((subItem, index) => {
      return <RenderItem item={subItem} key={index} />
    })
  }else if(item.uiType === 'AdvSwitch'){
    return <AdvSwitch showOptional={props.showOpt} setShowOptional={props.setShowOpt}/>
  }
  return <div>Item Not Defined</div>
}

export default RenderItem
