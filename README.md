# Cypress & Zephyr Scale Integration [![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

# Problem Statement :dizzy_face:
I have a project in which the project team wanted to view the test execution of the Cypress test. We also utilise Zephyr as our test case management. I have been searching for ways to integrate these two, Zephyr & Cypress; however, I can't find a proper solution that fits my need

# Solution :bulb: 
I have developed a work-in-progress project to enhance Zephyr Scale integration with Cypress. My goal is to introduce a user-friendly update that adds a test cycle every time a cypress test is performed. This update will ensure that each associated test case is promptly updated with a status of either 'Passed,' 'Failed,' or 'Skipped'. With these improvements, it aims to streamline the testing process and provide clearer insights into the test results.

Will make further enhancements when time permits.

## What does it do? :heavy_check_mark:
- Create a test cycle every time cypress test is executed by utilise Cypress hook ( *before()* & *eachAfter()* )
- Only update the status of associated test cases

## What is it not? :x:
- Does not update the test step
- Does not update beyond these initial setup statuses 'Passed,' 'Failed,' or 'Skipped'
- Does not update the start and end time of each test

# Requirement:
- Valid Zephyr Scale API Access Token
- Valid Zephyr Test Case ID

# How it works:

A valid Zephyr Scale API access token is required for the integration to work. The token can be obtained by clicking on your profile icon in Zephyr

![image](https://github.com/azrimangsor/cypress-zephyr-scale-integration/assets/33415476/f4da06e9-6d0c-4136-89ad-f75cb77019ba)

Click on the **Create access token** button to generate the access token

![image](https://github.com/azrimangsor/cypress-zephyr-scale-integration/assets/33415476/084689e2-2898-44df-91b3-9bec958925fb)

Once the button click, a pop-up will appear with the access token

![image](https://github.com/azrimangsor/cypress-zephyr-scale-integration/assets/33415476/16d6ac24-70c1-4eeb-8b29-e8beeb4d4453)

Copy the token and place it inside the cypress environment file. In this project, I refer to *bearer token* variable

```mermaid
graph LR
A((Test Start)) --> B[Before Hook] --> C{Create Test Cycle} -- Yes --> D(Cypress Test Execute) --> F[After Each Hook] --> G{Status} -- status --> H[Zephyr Test Case]
C -- No --> E[Error Exception]
```

For this integration to work, the test case reference require in each of the Cypress test title. Following are examples of how can you write the title

    tag = 'PROJ-T1'
    it(`${tag} - User Details - Fields Validation`, () => {
        ...
    })

***or***

    it(`PROJ-T1 - User Details - Fields Validation`, () => {
      ...
    })

