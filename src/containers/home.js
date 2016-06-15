import React      from 'react'
import superagent from 'superagent'
import url        from 'url'
import {Spinner,ErrorState}  from 'zooid-ui'
import Form  from '../components/Form'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      loading: true,
      schema: null,
    }
  }

  componentDidMount() {
    this.fetchSchema()
  }

  fetchSchema(){
    const {schemaUrl, postUrl, bearerToken} = url.parse(location.href, true).query
    this.setState({loading: true})
    superagent
      .get(schemaUrl)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          return this.setState({error, schema: null, loading: false})
        }
        this.setState({schema: JSON.parse(response.text), loading: false, postUrl: postUrl})
      })
  }

  onSubmit = (model) => {
    this.setState({loading: true})
    superagent
      .post(this.state.postUrl)
      .redirects(0)
      .set('Authorization', `Bearer ${this.state.bearerToken}`)
      .send(model)
      .end((error, response) => {
        if (error) return this.setState({error, schema: null, loading: false})

        window.location = response.headers.location
      })
  }

  render() {
    const {schema, loading, error} = this.state
    if (error) return <ErrorState description={error.message} />
    if (loading) return <Spinner />
    if (!schema) return <ErrorState description="No schema, but done loading" />
    return <Form schema={schema} onSubmit={this.onSubmit} />
  }
}
