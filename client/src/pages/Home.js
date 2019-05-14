import React, { Component } from "react"
//import styles from '../App.module.scss';
import FormComponent from "../components/FormComponent";

class Home extends Component {

  render() {
     // const {firstName} = this.state
     return (
       <FormComponent/>
    )
  }
  
}

const btnStyle ={
  background: '#008CBA',
  color: 'white',
  border: 'none',
  padding: '10px 24px',
  //borderRadius: '50%',
  cursor: 'pointer',
  float: 'center',
 // align: 'center'
}


export default Home;