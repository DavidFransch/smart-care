import React, { Component } from 'react'
import PatientItem from './PatientItem'
import PropTypes from 'prop-types'
//import FormComponent from './FormComponent'

export class Patients extends Component {
    
    render() {
    return this.props.patients.map((patient)=>(
        <PatientItem key={patient.id} patient={patient} 
        patientAdded={this.props.patientAdded}
        delPatient={this.props.delPatient}/>
    ));
    }
}

//PropTypes
Patients.propTypes ={
    patient: PropTypes.array.isRequired,
    patientAdded: PropTypes.func.isRequired,
    delPatient: PropTypes.func.isRequired
}

export default Patients
