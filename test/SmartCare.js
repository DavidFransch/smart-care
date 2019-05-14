const SmartCare = artifacts.require('./SmartCare.sol');

contract('SmartCare', (accounts) =>{
    before(async () =>{
        this.smartCare= await SmartCare.deployed()
    })
    //Ensures deployment by validating address
    it ('deploys successfully', async() =>{
        const address = await this.smartCare.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
    //Check patient struct using default constructor
    it('lists patient details', async() =>{
        const patientCount = await this.smartCare.patientCount()
        const patient = await this.smartCare.patients(patientCount)
        assert.equal(patient.id.toNumber(), patientCount.toNumber())
        assert.equal(patient.name, 'patient')
        assert.equal(patient.added, false)
        assert.equal(patientCount.toNumber(), 1)
    })
    //Check provider struct using default constructor
    it('lists provider details', async() =>{
        const providerCount = await this.smartCare.providerCount()
        const provider = await this.smartCare.providers(providerCount)
        assert.equal(provider.id.toNumber(), providerCount.toNumber())
        assert.equal(provider.name, 'provider')
        assert.equal(provider.added, false)
        assert.equal(providerCount.toNumber(), 1)
    })
    //Verify that patient is added
    it('adds patient', async() =>{
        const result = await this.smartCare.addPatient('name')
        const patientCount = await this.smartCare.patientCount()
        assert.equal(patientCount, 2)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.name, 'name')
        assert.equal(event.added, false)
    })
    //Verify that provider is added
    it('adds provider', async() =>{
        const result = await this.smartCare.addProvider('name')
        const providerCount = await this.smartCare.providerCount()
        assert.equal(providerCount, 2)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.name, 'name')
        assert.equal(event.added, false)
    })
    //Verify that consultation has ended for patient
    it('toggles patient completion', async () => {
        const result = await this.smartCare.toggleCompletedPat(1)
        const patient = await this.smartCare.patients(1)
        assert.equal(patient.completed, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
    })

    //Verify that consultation has ended for provider
    it('toggles provider completion', async () => {
        const result = await this.smartCare.toggleCompletedProv(1)
        const provider = await this.smartCare.providers(1)
        assert.equal(provider.completed, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
      })
})