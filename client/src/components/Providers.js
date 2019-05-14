import React, { Component } from 'react'
import ProviderItem from './ProviderItem'
import PropTypes from 'prop-types'
//import FormComponent from './FormComponent'

export class Providers extends Component {
    
    render() {
    return this.props.providers.map((provider)=>(
        <ProviderItem key={provider.id} provider={provider} 
        providerAdded={this.props.providerAdded}
        delProvider={this.props.delProvider}/>
    ));
    }
}

//PropTypes
Providers.propTypes ={
    provider: PropTypes.array.isRequired,
    providerAdded: PropTypes.func.isRequired,
    delProvider: PropTypes.func.isRequired
}

export default Providers