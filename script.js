// JavaScript debug messages can be viewed in the browser console.
// Open the browser console with Ctrl+Shift+J (Firefox and Chromium).


// Function to return a date object from the fourth monday of given year and month
function getMeetingOfYearMonth(year, month) {
    var date = new Date(year, month, 1);

    // Find first monday.
    while (date.getDay() !== 1) {
        date.setDate(date.getDate() + 1);
    }

    // Get fourth monday.
    date.setDate(date.getDate() + 3*7);

    // Meeting time is always at 19:00:00:000 local time.
    date.setHours(19);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}


// Function to set the date for the next meeting
function setNextMeeting() {
    var today = new Date();
    console.log('Today is ' + today + '.');

    // Get date of meeting from this month.
    var date = getMeetingOfYearMonth(today.getFullYear(), today.getMonth());
    console.log('Meeting this month is ' + date + '.');

    // If meeting this month is over, take the one from the next month.
    if (date.getTime() < today.getTime()) {
        console.log('Meeting this month is over.');
        date = getMeetingOfYearMonth(today.getFullYear(), today.getMonth() + 1);
    }

    console.log('Next meeting is: ' + date + '.');
    document.getElementById('nextMeeting').innerHTML = date;
}
