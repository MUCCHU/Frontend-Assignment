import React from 'react'
import TextInput from './TextInput';
import NumInput from './NumInput';
import Required from './Required';
import info from './info_icon.svg';
import Select from './Select';
import Radio from './Radio';
import Switch from './Switch';

function RenderItem(props) {
    // Check the ui type of item and render appropriate input fields
    // If its group call recursively to render subcomponents

    const {item} = props;
    if(item.uiType==='Group'){
        return(
            <div className='row mb-3 input_wrapper'>
                    <label htmlFor="staticEmail" className="col-sm-12 col-form-label">
                        {item['label']}
                        {item['validate']['required'] && <Required />}
                        {item['description'] && <span className="d-inline-block ps-2" tabindex="0" data-bs-toggle="tooltip" data-bs-placement="left" title={item['description']}>
                            <img alt='info icon' src={info} />
                        </span>}  
                    </label>
                    <hr />
                    {item['subParameters'].map((subItem, index) => {
                        return (
                            <RenderItem item={subItem} key={index} />
                        )
                    })}
            </div>
        )
    }else if(item.uiType==='Input'){
        return <TextInput item={item} />
    }
    else if(item.uiType==='Number'){
        return <NumInput item={item} />
    }
    else if(item.uiType==='Select'){
        return <Select item={item} />
    }
    else if(item.uiType==='Radio'){
        return <Radio item={item} />
    }else if(item.uiType==='Switch'){
        return <Switch item={item} />
    }
    else if(item.uiType==='Ignore'){

    }
  return (
    <div>Item Not Defined</div>
  )
}

export default RenderItem