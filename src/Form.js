import React, {useState} from 'react'
import RenderItem from './Components/RenderItem'
import Modal from './Components/Modal'
import { useSelector } from 'react-redux'
import genUniqueKey from './Components/genUniqueKey'

function sortSchemas(schema){
  
    schema.sort(function(a, b){return a['sort'] - b['sort']})
    for (let i = 0; i < schema.length; i++) {
        if (schema[i].uiType === 'Group') {
            schema[i].subParameters = sortSchemas(schema[i].subParameters)
        }
    }
    return schema;
}

// function getKey(str) {
//     return str.replace(/_(\d+)$/, '');
//    }


function Form(props) {
    let schema = Array.from((props.schema ? props.schema : []))
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState({
        "goo": "bar"
    })
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
            if (conditions[i]['value'] !== state[conditions[i].jsonKey.split('.').slice(-1)[0] + '_' + level]) {
              should_render = false
              break
            }
          }
        }
        if (conditions['action'] !== 'enable') {
          should_render = !should_render
        }
        return should_render
      }


    const makeObj = (item) =>{
        let obj = {}
        console.log("In makeobj item = ", item)
        if(item.uiType === 'Group'){
            let grp = {}
                for(let i=0;i<item.subParameters.length;i++){
                    let temp = makeObj(item.subParameters[i])
                    grp = {...grp, ...temp}
                }
                obj[item.jsonKey] = grp
            
        }else if( item.uiType === 'Ignore' && !shouldRender(item)){
            let grp = {}
            for(let i=0;i<item.subParameters.length;i++){
                let temp = makeObj(item.subParameters[i])
                grp = {...grp, ...temp}
            }
            obj[item.jsonKey] = grp
        }
        else{
            console.log("item.jsonKey = ", item.jsonKey)
            obj[item.jsonKey] = state[genUniqueKey(item)]
            console.log("obj = ", obj)
            console.log("state = ", state)
            console.log("genUniqueKey(item.jsonKey) = ", genUniqueKey(item))
        }
        console.log("Outside else obj = ", obj)
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
                <RenderItem item={item} key={index} />
            )
        })}
            <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
    </div>
  )
}

export default Form