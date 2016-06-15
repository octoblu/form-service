import React from 'react'
import JsonSchemaEditor from 'zooid-ui-json-schema-editor'
import styles from './Form.css'

const Form = ({schema, onSubmit}) => {
  return (
    <div className={styles.Form}>
      <JsonSchemaEditor schema={schema} onSubmit={onSubmit} />
    </div>
  )
};

Form.propTypes = {
  schema: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
}

export default Form;
