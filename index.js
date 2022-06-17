function createEmployeeRecord(recordsArray) {
    let testEmployee = {
        firstName: recordsArray[0],
        familyName: recordsArray[1],
        title: recordsArray[2],
        payPerHour: recordsArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return testEmployee
}

function createEmployeeRecords(recordArray) {
    const recordsArray = []
    recordArray.map(resp => {
        recordsArray.push(createEmployeeRecord(resp))
    })
    return recordsArray
}
