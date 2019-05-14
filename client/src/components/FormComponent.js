import React, { Component } from "react"
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import Validate from './Validate';
import styles from '../App.module.scss';
//import TextArea from './TextArea'; --used for Address
import Email from './Email';
import Password from './Password';
import Select from './Select';

class FormComponent extends Component {

  constructor(){
    super();

    this.state ={
        formIsValid: false,//use to track overall form validity
        
        formControls:{
        name:{
            value: '',
            placeholder: 'Please enter your name',
            valid: false,
            validationRules: {
            minLength: 3,
            isRequired: true
            },
            touched: false
        },
               
        email:{
            value: '',
            placeholder: 'Please enter email',
            valid: false,
            validationRules: {
            isRequired: true,
            isEmail: true 
            },
            touched: false
        },
 
        password:{
            value: '',
            placeholder: 'Please enter password',
            valid: false,
            validationRules: {
            minLength: 5,
            isRequired: true 
        },
        touched: false
      },

      type: {
        value: '',
        placeholder: 'Please type type',
        valid: false,
        touched: false,
        validationRules: {
          isRequired: true,
        },
        options: [
          { value: 'patient', displayValue: 'Patient' },
          { value: 'provider', displayValue: 'Provider'}
        ]
      }
    }
  }
}

  handleSubmit=(e)=>{
    e.preventDefault();
    //const data = this.state
    //console.log("Final data is", this.state.formControls);
    this.props.addPerson(
       this.state.formControls.name.value,
       this.state.formControls.email.value,
       this.state.formControls.password.value,
       this.state.formControls.type.value);
       /* Not working to set inputs to ""
       this.setState({name: ''});
       this.setState({email: ''});
       this.setState({password: ''});
       */
      // this.setState({ [e.target.name]: e.target.value});


  }

  handleInputChange=(e)=>{
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    const updatedControls = {
        ...this.state.formControls
        };
        const updatedFormElement = {
        ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = Validate(value, updatedFormElement.validationRules);
    
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
          formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
    
        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
  }

  handleButtonClick= (e)=>{
    this.inputnameRef.current.focus()

  }
  //<FormComponent form={this.state.formControls}/> console.log(this.props.form)
  render() {
    
    return (
        <div className={styles.wrapper}>
        <p>Please enter your details</p> 
        <TextInput name="name" 
            placeholder={this.state.formControls.name.placeholder}
            value={this.state.formControls.name.value}
            onChange={this.handleInputChange}
            touched={this.state.formControls.name.touched}
            valid={this.state.formControls.name.valid}
        />
        <Email name="email" 
            placeholder={this.state.formControls.email.placeholder}
            value={this.state.formControls.email.value}
            onChange={this.handleInputChange}
            touched={this.state.formControls.email.touched}
            valid={this.state.formControls.email.valid}
        />
        <Password name="password" 
            placeholder={this.state.formControls.password.placeholder}
            value={this.state.formControls.password.value}
            onChange={this.handleInputChange}
            touched={this.state.formControls.password.touched}
            valid={this.state.formControls.password.valid}
        />
        <Select name="type" 
            value={this.state.formControls.type.value}
            onChange={this.handleInputChange}
            options={this.state.formControls.type.options}
            touched={this.state.formControls.type.touched}
            valid={this.state.formControls.type.valid}
        />
        

        <button onClick={this.handleSubmit}
        disabled={!this.state.formControls.name.valid} //NOTE: Add e-msg
        > Submit </button> 
        </div>      
    );
  }
}

//prop types
FormComponent.propTypes ={
  patient: PropTypes.func.isRequired,
}

export default FormComponent;