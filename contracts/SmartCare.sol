pragma solidity ^0.5.0;

contract SmartCare{
    uint public patientCount=0;
    uint public providerCount=0;

    constructor() public{
        addPatient("patient");
        addProvider("provider");
    }
    
    struct Patient{
        uint id;
        string name;
        bool added;
        bool completed;
    }
    
    struct Provider{
        uint id;
        string name;
        bool added;
        bool completed;
    }
    
    mapping(uint => Patient) public patients;
    mapping(uint => Provider) public providers;

    //Test smart contracts in SC.js
    event PatientAdded(
        uint id,
        string name,
        bool added
    );

    event ProviderAdded(
        uint id,
        string name,
        bool added
    );

    event PatientCompleted(
        uint id,
        bool completed
    );

    event ProviderCompleted(
        uint id,
        bool completed
    );
    
    function addPatient(string memory _name) public{
        patientCount++;
        patients[patientCount] = Patient(patientCount, _name, false, false);
        emit PatientAdded(patientCount,_name, false);
    }
    
    function addProvider(string memory _name) public{
        providerCount++;
        providers[providerCount] = Provider(providerCount, _name, false, false);
        emit ProviderAdded(patientCount,_name, false);
    }
    
    function toggleCompletedPat(uint _id) public {
        Patient memory _patient = patients[_id];
        _patient.completed = !_patient.completed;
        patients[_id] = _patient;
        emit PatientCompleted(_id, _patient.completed);
  }
  
      function toggleCompletedProv(uint _id) public {
        Provider memory _provider = providers[_id];
        _provider.completed = !_provider.completed;
        providers[_id] = _provider;
        emit ProviderCompleted(_id, _provider.completed);
  }
}