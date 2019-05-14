import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ProviderItem extends Component {
    getStyle =()=>{
        return{
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textdeclaration: this.props.provider.added ?
            'line-through' : 'none'
        }
    }

    // markAdded = (e)=>{
    //     console.log(this.props)
    // }

    render() {
        //extract variables
        const {id, name} = this.props.provider;
        return (
            <div style={this.getStyle()}>
                <p>
                <input type ="checkbox" onChange={this.props.providerAdded.bind
                (this, id)}/> {' '}
                {name}
                <button onClick={this.props.delProvider.bind(this, id)} style={btnStyle}>x</button>
                </p>
            </div>
    )
  }
}
//PropTypes
ProviderItem.propTypes ={
    provider: PropTypes.object.isRequired,
    providerAdded: PropTypes.func.isRequired,
    delProvider: PropTypes.func.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default ProviderItem
