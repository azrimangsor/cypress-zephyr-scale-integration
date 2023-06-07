# Cypress & Zephyr Scale Integration [![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

# Problem Statement: 
I have a project in which the project team wanted to view the test execution of the Cypress test. We also utilise Zephyr as our test case management. I have been searching for ways to integrate these two, Zephyr & Cypress; however, I can't find a proper solution that fits my need

# Solution: 
I have developed a work-in-progress project to enhance Zephyr Scale integration with Cypress. My goal is to introduce a user-friendly update that adds a test cycle every time a cypress test is performed. This update will ensure that each associated test case is promptly updated with a status of either 'Passed,' 'Failed,' or 'Skipped'. With these improvements, it aims to streamline the testing process and provide clearer insights into the test results.

Will make futher ecnhancement when time permit.

## What it do?
- Create test cycle everytime cypress test executed by utilise Cypress hook (before() & eachAfter())
- Only update status of associated test cases

## What it not ?
- Does not update the test step
- Does not update beyond these initial setup status 'Passed,' 'Failed,' or 'Skipped'
- Does not update start and end time of each test

# How it work:

```mermaid
graph LR
A((Test Start)) --> B[Before Hook] --> C{Create Test Cycle} -- Yes --> D(Cypress Test Execute) --> F[After Each Hook] --> G{Status} -- status --> H[Zephyr Test Case]
C -- No --> E[Error Exception]
```

For this integration to work, the test case reference require in each of the cypress test title. Following are example how can you write the title

    tag = 'PROJ-T1'
    it(`${tag} - User Details - Fields Validation`, () => {
        ...
    })

***or***

    it(`PROJ-T1 - User Details - Fields Validation`, () => {
      ...
    })
