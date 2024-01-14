import React from 'react'
import RenderItem from './Components/RenderItem'

function sortSchemas(schema) {
    schema.sort(function(a, b){return a['sort'] - b['sort']})
    for (let i = 0; i < schema.length; i++) {
        if (schema[i].uiType === 'Group') {
            schema[i].subParameters = sortSchemas(schema[i].subParameters)
        }
    }
    return schema;
}



function Form(props) {
    let schema = Array.from((props.schema ? props.schema : []))
    let sorted_schema = sortSchemas(schema)
    console.log("sorted arr ",sorted_schema)
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Form submitted');
    }

    // iterate over items of array:
    // Check if the item is a group or a ui item, if ui item render it, and check for subitem

    // uiType: Input, Number, Group, Select, Switch etc
    return (
    <div>
        <h2>Form</h2>
        <form>
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