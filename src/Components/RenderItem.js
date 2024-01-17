import React from 'react'
import TextInput from './TextInput';
import NumInput from './NumInput';
import Required from './Required';
import info from './info_icon.svg';
import Select from './Select';
import Radio from './Radio';
import Switch from './Switch';
import { useSelector } from 'react-redux';

function RenderItem(props) {
    // Check the ui type of item and render appropriate input fields
    // If its group call recursively to render subcomponents

    const { item } = props;

    const state = useSelector(state => state.data);
    const shouldRender = (item) => {
        console.log("Check if should render", item )

        if(item['uiType'] !== 'Ignore') {
            return true;
        }
        // check all conditions in item.conditions and return only if all conditions are true
        let conditions = item['conditions']
        let should_render = true;
        for(let i=0; i<conditions.length; i++) {
            let condition = conditions[i];
            if(condition['op'] === '==') {
                console.log("Operator ==");
                let level = (conditions[i]['jsonKey'].match(/\./g) || []).length
                if(conditions[i]['value'] !== state[conditions[i].jsonKey.split(".").slice(-1)[0]+"_"+level]) {
                    should_render = false;
                    break;
                }
            }
        }
        if(conditions["action"]!=="enable"){
            should_render = !should_render;
        }
        return should_render;
    }


    if (item.uiType === 'Group') {
        return (
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
    } else if (item.uiType === 'Input') {
        return <TextInput item={item} />
    }
    else if (item.uiType === 'Number') {
        return <NumInput item={item} />
    }
    else if (item.uiType === 'Select') {
        return <Select item={item} />
    }
    else if (item.uiType === 'Radio') {
        return <Radio item={item} />
    } else if (item.uiType === 'Switch') {
        return <Switch item={item} />
    }
    else if (item.uiType === 'Ignore') {
        if(!shouldRender(item)) {
            return null;
        }
        // shouldRender(item)
        return (
            item['subParameters'].map((subItem, index) => {
                return (
                    <RenderItem item={subItem} key={index} />
                )
            })
        )
    }
    return (
        <div>Item Not Defined</div>
    )
}

export default RenderItem