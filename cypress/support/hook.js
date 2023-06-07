before(() => {
    const token = Cypress.env('bearerToken')
    const url = Cypress.env('zephyrBaseURL') + '/testcycles'

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    let dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    cy.request({
      headers: {
          Authorization: `Bearer ${token}`
      },
      url: `${url}`,
      method: 'POST',
      body: {
          projectKey: "ALT",
          name: `ALTO E2E Regression ${dateTime}`
      }
    })
    .then((response) => {
        Cypress.env('testCycle', response.body.key)
    })
})

afterEach(function() {
    console.log(this.currentTest.state);

    const pattern = /ALT-T\d+/
    const match = this.currentTest.title.match(pattern)
  
    console.log(match[0])
  
    const token = Cypress.env('bearerToken')
    const url = Cypress.env('zephyrBaseURL') + '/testexecutions'
    const testCycle = Cypress.env('testCycle')
  
    const requestBody = {
      projectKey: 'ALT',
      testCaseKey: `${match[0]}`,
      testCycleKey: `${testCycle}`,
      statusName: '',
      environmentName: 'QA'
    };
  
    switch (this.currentTest.state) {
      case 'passed':
        requestBody.statusName = 'Pass'
        break
      case 'failed':
        requestBody.statusName = 'Fail'
        break
      case 'skipped':
        requestBody.statusName = 'Not Executed'
        break
      default:
        break
    }
  
    cy.then(() => {
      cy.request({
        headers: {
          Authorization: `Bearer ${token}`
        },
        url: url,
        method: 'POST',
        body: requestBody
      });
    });

})
