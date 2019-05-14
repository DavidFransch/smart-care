import React, { Component } from "react";
import Web3 from 'web3'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import getWeb3, { getGanacheWeb3 } from "./utils/getWeb3";
import Web3Info from "./components/Web3Info/index.js";
import { Loader } from 'rimble-ui';
import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';
import styles from './App.module.scss';
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
//import Home from "./pages/Home";
import PatientPage from "./pages/PatientPage";
import ProviderPage from "./pages/ProviderPage";
import About from './pages/About';
import Patients from "./components/Patients";
import Providers from "./components/Providers";
import FormComponent from './components/FormComponent'
import uuid from 'uuid';
import axios from 'axios';
import {PATIENT_ABI, PATIENT_ADDRESS} from './config'
//import patient from './patient'

class App extends Component {
  state = {
    /*
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    route: window.location.pathname.replace("/",""),
    */
    account: '',
    patientCount:0,
    patients: [],
    providers:[],
    loading: true
  };
  

  //life-cycle callback
  componentWillMount(){
    this.loadBlockchainData() 
  }

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    //const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const patient = new web3.eth.Contract(PATIENT_ABI, PATIENT_ADDRESS)
    this.setState({patient})
    const patientCount = await patient.methods.patientCount().call()
    this.setState({patientCount})
    for(var i=1; i<=patientCount;i++){
      const patientMethods = await patient.methods.patients(i).call()
      this.setState({
          tasks: [...this.state.patients, patientMethods]//es6
      })
    }
    console.log("Patient:", this.state.patients)
    this.setState({loading: false})
  }
  /*
  refreshValues = (instance, instanceWallet) => {
    if (instance) {
      this.getCount();
    }
    if (instanceWallet) {
      this.updateTokenOwner();
    }
  }

  getCount = async () => {
    const { contract } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCounter().call();
    // Update state with the result.
    this.setState({ count: response });
  };

  updateTokenOwner = async () => {
    try{
      const { wallet, accounts } = this.state;
      // Get the value from the contract to prove it worked.
      const response = await wallet.methods.owner().call();
      // Update state with the result.
      this.setState({ tokenOwner: response.toString() === accounts[0].toString() });
    }catch(e){
      console.log(e)
    }
  };

  //this.addPatient = this.addPatient.bind(this); --app.js eth-react
  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  renderLoader() {
    console.log(this.state.patients)
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }
  
  componentDidMount = async () => {
    //Backend-testing
    axios.get('https://jsonplaceholder.typicode.com/users?_limit=5')
    .then(res=>this.setState({patients: res.data}))

    axios.get('https://jsonplaceholder.typicode.com/users?_limit=5')
    .then(res=>this.setState({providers: res.data}))

    //Connect to smart contracts
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
    let Patient ={}
    try{
      Patient = require("../../contracts/Patient.sol");
    }catch(e){
      console.log(e)
    }
    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts=[];
        try{
          ganacheAccounts = await this.getGanacheAddresses();
        }catch(e){
          console.log("Ganache is not running");
        }
        
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');
        let instance = null;
        let instanceWallet = null;
        let deployedNetwork = null;
        //First contract address + abi
        if(Patient.networks){
          deployedNetwork = Patient.networks[networkId.toString()];
          if(deployedNetwork){
            instanceWallet=new web3.eth.Contract(
              Patient.abi,
              deployedNetwork && deployedNetwork.address,
            );
          }
        }
        if(instance || instanceWallet){
          this.setState({
            web3, ganacheAccounts, accounts, balance, networkId,
            isMetaMask, contract: instance, wallet: instanceWallet
          }, () =>{
            this.refreshValues(instance, instanceWallet);
            setInterval(() =>{
              this.refreshValues(instance, instanceWallet);
            }, 5000);
          });
        }
        else{
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
 
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  */

  //PATIENT funcs

  //Toggle complete
  patientAdded=(id)=>{
    this.setState({patients: this.state.patients.map(patient=>{
      if(patient.id === id){
        patient.added = !patient.added
      }
      return patient;
    }) });
  }

  //Delete patient
  delPatient=(id)=>{
    // ... = spread operator (copy everything in patients)
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res=>this.setState({patients: [...this.state.patients.filter
    (patient => patient.id !== id)]}));
    
  }
  //PROVIDER
    //Toggle complete
    providerAdded=(id)=>{
      this.setState({providers: this.state.providers.map(provider=>{
        if(provider.id === id){
          provider.added = !provider.added
        }
        return provider;
      }) });
    }
  
    //Delete provider
    delProvider=(id)=>{
      // ... = spread operator (copy everything in patients)
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res=>this.setState({providers: [...this.state.providers.filter
      (provider => provider.id !== id)]}));
      
    }

  //Add patient
  addPerson=(name, email, password, type)=>{
    //Add to blockchain
    this.setState({loading:true})
    this.state.patient.methods.addPatient(name).send({from: this.state.account})
    .once('receipt', (receipt) =>{
      this.setState({loading:false})
    })
    //console.log(type)
    if(type === 'patient' || type===''){
        axios.post('https://jsonplaceholder.typicode.com/users',{ 
        name,
        email,
        password,
        type,
        added: false
      })
      .then(res=>this.setState({patients:
        [...this.state.patients, res.data]}));
        //this.setState({patients: [...this.state.patients, newPatient]});
    }else{
      axios.post('https://jsonplaceholder.typicode.com/users',{ 
        name,
        email,
        password,
        type,
        added: false
      })
      .then(res=>this.setState({providers:
        [...this.state.providers, res.data]}));
    }
  }

  render() {
    return (
      <Router>
        <div className={styles.App}>
        <Header/>
          <div className="container">
            <Route exact path="/"  render={props=>(
              <React.Fragment>
                <FormComponent addPerson={this.addPerson}/>
              </React.Fragment>
            )}/>

            <Route path="/patient" render={props=>(
              <React.Fragment>
                <PatientPage/>
                <Patients patients={this.state.patients}
                patientAdded={this.patientAdded}
                delPatient={this.delPatient}/>
              </React.Fragment>
            )}/>

            <Route path="/provider" render={props=>(
              <React.Fragment>
                <ProviderPage/>
                <Providers providers ={this.state.providers}
                providerAdded={this.providerAdded}
                delProvider={this.delProvider}/>
              </React.Fragment>
            )}/>
            <Route path="/about" component={About} />
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
