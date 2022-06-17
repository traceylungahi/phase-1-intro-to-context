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

function createTimeInEvent(objRecord, date) {
    let splitDate = date.split(" ")
    let date = splitDate[0]
    let time = splitDate[1]
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    }
    objRecord.timeInEvents.push(timeInObj)
    return objRecord
}

function createTimeOutEvent(objRecord, date) {
    let splitDate = date.split(" ")
    let date = splitDate[0]
    let time = splitDate[1]
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    }
    objRecord.timeOutEvents.push(timeOutObj)
    return objRecord
}

function hoursWorkedOnDate(objRecord, date) {
    let timeIn = objRecord.timeInEvents
    let hourIn = []
    timeIn.filter((object) => {
        if(object.date === date) {
            hourIn.push(object.hour)
        }
    })
    let timeOut = objRecord.timeOutEvents
    let hourOut = []
    timeOut.filter((object) => {
        if(object.date === date) {
            hourOut.push(object.hour)
        }
    })
    let reducer = (valueOne, valueTwo) => valueOne + valueTwo
    let totalHourIn = hourIn.reduce(reducer)
    let totalHourOut = hourOut.reduce(reducer)
    let total = Math.abs(totalHourIn - totalHourOut)
    if(total < 1000) {
        let string = total.toString().split(0, 1)
        return parseInt(string)
    }
    else if(total > 999) {
        let string = total.toString()
        let totalHour = string.charAt(0) + string.charAt(1)
        return parseInt(totalHour)
    }
}

function wagesEarnedOnDate(objRecord, date) {
    let rateOfPay = objRecord.payPerHour
    let workedHours = workedHoursOnDate(objRecord, date)
    return rateOfPay * workedHours
}

function allWagesFor(objRecord) {
    let theArray = objRecord.timeInEvents
    let fullArray = []
    theArray.map(resp => {
        let theDate = resp.date
        fullArray.push(wagesEarnedOnDate(objRecord, theDate))
    })
    let reducer = (valueOne, valueTwo) => valueOne + valueTwo
    let totalWages = fullArray.reduce(reducer)
    return totalWages
}

function calculatePayroll(arrayOfRecords) {
    let totalPayRollArray = []
    arrayOfRecords.map(oneObj => {
        let recordObj = oneObj
        let totalTimeIn = recordObj.timeInEvents
        totalTimeIn.map(singleTimeIn => {
            let theDate = singleTimeIn.date
            totalPayRollArray.push(wagesEarnedOnDate(recordObj, theDate))
        })
    })
    let reducer = (valueOne, valueTwo) => valueOne + valueTwo
    let fullPayout = totalPayRollArray.reduce(reducer)
    return fullPayout
}
