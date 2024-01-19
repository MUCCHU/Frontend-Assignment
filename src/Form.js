import React, {useState} from 'react'
import RenderItem from './Components/RenderItem'
import Modal from './Components/Modal'
import { useSelector } from 'react-redux'
import genUniqueKey from './Components/genUniqueKey'


let advField = {
    "sort": 10000,
    "label": "Show advanced fields",
    "description": "",
    "validate": {
      "required": true,
      "defaultValue": false,
      "immutable": false
    },
    "jsonKey": "adv_fields",
    "uiType": "AdvSwitch",
    "icon": "",
    "level": 2,
    "placeholder": ""
  }

function sortSchemas(schema){
  
    schema.sort(function(a, b){return a['sort'] - b['sort']})
    let contains_optional = false
    let contains_adv = false
    let level = 0

    for (let i = 0; i < schema.length; i++) {
        if (schema[i].uiType === 'Group' || schema[i].uiType === 'Ignore') {
            schema[i].subParameters = sortSchemas(schema[i].subParameters)
        }

        if(!schema[i]['validate']['required']){
            contains_optional = true
            level = schema[i]['level']
        }
        if(schema[i]['jsonKey']==='adv_fields'){
            contains_adv = true
        }
    }
    if(contains_optional && !contains_adv){
        console.log("Addiing adv switch to level ", level)
        advField['level'] = level
        schema.push(advField)
    }
    return schema;
}

function Form(props) {
    let schema = Array.from((props.schema ? props.schema : []))
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState({
        "goo": "bar"
    })
    const [showOpt, setShowOpt] = useState(false)
    const state = useSelector(state => state.data)
    let sorted_schema = sortSchemas(schema)
    console.log("sorted arr ",sorted_schema)


    const shouldRender = (item) => {
        if (item['uiType'] !== 'Ignore') {
          return true
        }
        // check all conditions in item.conditions and return only if all conditions are true
        let conditions = item['conditions']
        let should_render = true
        for (let i = 0; i < conditions.length; i++) {
          let condition = conditions[i]
          if (condition['op'] === '==') {
            let level = (conditions[i]['jsonKey'].match(/\./g) || []).length
            let temp = (conditions[i]['value'] !== state[conditions[i].jsonKey.split('.').slice(-1)[0] + '_' + level])
            if(condition['action']==='enable') temp = !temp
            should_render = (should_render && temp)
          }
        }
        return should_render
      }


    const makeObj = (item) =>{
        let obj = {}
        if((item.uiType === 'Group' ||  item.uiType === 'Ignore') && shouldRender(item)){
            let grp = {}
                for(let i=0;i<item.subParameters.length;i++){
                    let temp = makeObj(item.subParameters[i])
                    grp = {...grp, ...temp}
                }
                obj[item.jsonKey] = grp
            
        }
        else{
            obj[item.jsonKey] = state[genUniqueKey(item)]
        }
        return obj;
    }
    let final_obj = {}
    const generateState = () => {
        for(let i=0;i<sorted_schema.length;i++){
            let obj = makeObj(sorted_schema[i])
            final_obj = {...final_obj, ...obj}
        }
        return final_obj;
    }
      
    const handleSubmit = (event) => {
        event.preventDefault();
        setData(generateState());
        setShowModal(true);
    }
    const handleClose = () => setShowModal(false);


    return (
    <div>
        {showModal && <Modal title={"Json Data"} data={data} close = {handleClose} />}
        <form className='my_form' style={{padding: '20px', border: '2px solid black', borderRadius: '12px'}} onSubmit={handleSubmit}>
        <h2>Form</h2>
        {sorted_schema.map((item, index) => {
            return (
                <RenderItem visible={true} showOpt={showOpt} setShowOpt={setShowOpt} item={item} key={index} />
            )
        })}
            <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
    </div>
  )
}

export default Form