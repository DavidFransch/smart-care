pragma solidity ^0.5.0;
contract Patient{
    uint public patientCount= 0;

    struct PatientInfo{
        uint id;
        string name;
        bool added;
    }
    
    mapping(uint => PatientInfo) public patients;

    event PatientCompleted(
        uint id,
        bool added
    );
    
    event PatientAdded(
    uint id,
    string name,
    bool added
    );

    constructor() public{
        addPatient("Name");
    }
    
    function addPatient(string memory _name) public{
        patientCount++;
        patients[patientCount] = PatientInfo(patientCount, _name, false);
        emit PatientAdded(patientCount, _name, false);
    }
    function toggleCompleted(uint _id) public {
        PatientInfo memory _patient = patients[_id];
        _patient.added = !_patient.added;
        patients[_id] = _patient;
        emit PatientCompleted(_id, _patient.added);
  }
}