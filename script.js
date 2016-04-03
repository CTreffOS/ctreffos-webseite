// Function to return a date object from the fourth day of the month
function getMeetingOfMonth(year, month) {
    var date = new Date(year, month, 1);

    // Find first monday
    while (date.getDay() !== 1) {
        date.setDate(date.getDate() + 1);
    }

    // Get fourth monday
    date.setDate(date.getDate() + 3*7);

    date.setHours(19);
    return date;
}

// Function to set the date for the next meeting
function setNextMeeting() {
    var today = new Date();
    console.log('Today is ' + today);

    // Get date of meeting from this month
    var date = getMeetingOfMonth(today.getFullYear(), today.getMonth());

    // Meeting is over? Then take the one from the next month
    if (date.getTime() < today.getTime()) {
        date = getMeetingOfMonth(today.getFullYear(), today.getMonth() + 1);
    }

    document.getElementById('nextMeeting').innerHTML = date;
}
