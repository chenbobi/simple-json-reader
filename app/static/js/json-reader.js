"use strict";
console.log('json-reader.js')  // log to the JavaScript console.

getPatientInformation()

function getPatientInformation() {
    const url = '/patient_info' 

    // Fetch AJAX call to server
    fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((jsonResult) => {
            populateInformation(jsonResult)
        })
        .catch((error) => {
            console.log("An error occured with fetch: ", error)
        })
}

function populateInformation(jsonResult) {
    setPatientName(jsonResult.name)
    setOrganizationName(jsonResult.organization)
    setGender(jsonResult.gender)
    setNumConditions(jsonResult.numOfConditions)
    setConditions(jsonResult.conditions)
}

function setElementHTML(id, content) {
    const elem = document.querySelector(`#${id}`)
    elem.innerHTML = `${content}`
}

function setPatientName(patName) {
    setElementHTML('patientName', patName)
}

function setOrganizationName(orgName) {
    setElementHTML('orgName', orgName)
}

function setGender(gender) {
    setElementHTML('gender', gender)
}

function setNumConditions(num) {
    setElementHTML('numConditions', num)
}

function setConditions(conditions) {
    const list = document.querySelector('#listOfConds')
    conditions.forEach(function(cond) {
        let li = createListItem(cond)
        list.appendChild(li)
    })
}

function createListItem(content) {
    let li = document.createElement('li')
    li.innerHTML = `${content}`
    return li
}
