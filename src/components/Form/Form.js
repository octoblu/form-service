import React            from 'react'
import JsonSchemaEditor from 'zooid-ui-json-schema-editor'
import styles           from './Form.css'

const Form = ({schema, onSubmit}) => {
  const model = {}
  const defaultForm = ["*"]

  return (
    <div className={styles.Form}>
      <h2>{schema.title || "Form"}</h2>
      <JsonSchemaEditor schema={schema} form={defaultForm} onSubmit={onSubmit} model={model}/>
    </div>
  )
};

Form.propTypes = {
  schema: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
}

export default Form;
