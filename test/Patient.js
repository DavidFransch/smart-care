//Test contract
const Patient = artifacts.require('./Patient.sol');

contract('patient', (accounts) =>{
    before(async () =>{
        this.patient= await Patient.deployed()
    })
    //Ensures deployment by validating address
    it ('deploys successfully', async() =>{
        const address = await this.patient.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
    //Check patient struct using default constructor
    it('lists patient details', async() =>{
        const patientCount = await this.patient.patientCount()
        const patient = await this.patient.patients(patientCount)
        assert.equal(patient.id.toNumber(), patientCount.toNumber())
        assert.equal(patient.name, 'Name')
        assert.equal(patient.added, false)
        assert.equal(patientCount.toNumber(), 1)
    })
    //Verify that patient is added
    it('adds patient', async() =>{
        const result = await this.patient.addPatient('name')
        const patientCount = await this.patient.patientCount()
        assert.equal(patientCount, 2)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.name, 'name')
        assert.equal(event.added, false)
    })
    //Verify that consultation has ended
    it('toggles patient completion', async () => {
        const result = await this.patient.toggleCompleted(1)
        const patient = await this.patient.patients(1)
        assert.equal(patient.added, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.added, true)
      })
})