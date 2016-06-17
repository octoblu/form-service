import React      from 'react'
import superagent from 'superagent'
import url        from 'url'
import {Spinner,ErrorState}  from 'zooid-ui'
import Form  from '../components/Form'

export default class Home extends React.Component {
  static initialState = {
    error: null,
    loadingSchema: null,
    loadingFormSchema: null,
    loadingSubmit: null,
    schema: null,
    formSchema: null,
    postUrl: null,
    bearerToken: null,
  }
  state = {...Home.initialState}

  componentWillMount = () => {
    const {schemaUrl, formSchemaUrl, postUrl, bearerToken} = url.parse(location.href, true).query
    this.postUrl = postUrl
    this.bearerToken = bearerToken
    this.setState({postUrl, bearerToken})
    this.fetchSchema(schemaUrl)
    this.fetchFormSchema(formSchemaUrl)
  }

  fetchFormSchema = (formSchemaUrl) => {
    if(!formSchemaUrl) return

    this.setState({loadingFormSchema: true})

    superagent
      .get(formSchemaUrl)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          return this.setState({...Home.initialState, error})
        }
        this.setState({formSchema: JSON.parse(response.text), loadingFormSchema: false})
      })
  }

  fetchSchema = (schemaUrl) => {
    this.setState({loadingSchema: true})

    superagent
      .get(schemaUrl)
      .set('Accept', 'application/json')
      .end((error, response) => {
        const schema = this.parseResponse(response)
        if (error) return this.setState({...Home.initialState, error})
        if (!schema) return this.setState({...Home.initialState, error: new Error('Could not load the schema')})

        this.setState({schema: schema, loadingSchema: false})
      })
  }

  onSubmit = (model) => {
    this.setState({loadingSubmit: true})
    superagent
      .post(this.state.postUrl)
      .redirects(0)
      .set('Authorization', `Bearer ${this.state.bearerToken}`)
      .send(model)
      .end((error, response) => {
        if (error) return this.setState({...Home.initialState, error})

        if(response.headers.location) return window.location = response.headers.location
        this.setState({loadingSubmit: false})
      })
  }

  parseResponse = (response) => {
    if (!response) return
    try {
      return JSON.parse(response.text)
    } catch (error) {
      return
    }
  }

  render = () => {
    const {formSchema, schema, postUrl, loadingSchema, loadingFormSchema, loadingSubmit, error} = this.state
    const loading = loadingSchema || loadingFormSchema || loadingSubmit

    if (error)  return <ErrorState description={error.message} />
    if (!postUrl) return <ErrorState description="Required GET parameter 'postUrl' is missing." />
    if (loading) return <Spinner />

    return <Form schema={schema} formSchema={formSchema} onSubmit={this.onSubmit} />
  }
}
