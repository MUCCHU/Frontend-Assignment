import MonacoEditor from '@monaco-editor/react'

const monacoEditorOptions = {
  minimap: {
    enabled: false
  },
  automaticLayout: true
}

function Editor(props) {
  const title = 'JSON Editor'
  const icon = props.valid ? 'ok' : 'remove'
  const cls = props.valid ? 'valid' : 'invalid'
  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log('onValidate:', marker.message))
  }
  return (
    <div className='card'>
      <div className='card-header'>
        <span className={`${cls} glyphicon glyphicon-${icon}`} />
        {' ' + title}
      </div>
      <MonacoEditor
        language='json'
        value={props.schema}
        theme='vs-light'
        onChange={props.onSchemaEdited}
        height={400}
        options={monacoEditorOptions}
        onValidate={handleEditorValidation}
      />
    </div>
  )
}

export default Editor
