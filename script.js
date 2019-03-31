// JavaScript debug messages can be viewed in the browser console.
// Open the browser console with Ctrl+Shift+J (Firefox and Chromium).


// Function to return a date object from the first thursday of a given year and month
function getMeetingOfYearMonth(year, month) {
    var date = new Date(year, month, 1);
    var today = new Date();
   
    // Find first thursday
    while (date.getDay() !== 4) {
        date.setDate(date.getDate() + 1);
    }
    
    // When on day or before meeting, return the date
    if (today <= date) {
        return setTime(date);
    }

    // Or get the third Thursday
    date.setDate(date.getDate() + 2 * 7);
    if (today <= date) {
        return setTime(date);
    }
    // If third Thursday has passed, get the next month
    else {
        // Check if we are in december, then choose next year
        if (today.getMonth() == 11) {
            return getMeetingOfYearMonth(today.getFullYear() + 1, 0);
	}
        else {
            return getMeetingOfYearMonth(today.getFullYear(), today.getMonth() + 1);
	}
    }
}

// Function to set the time of our next meeting to 19:00 local time
function setTime(date) {
    date.setHours(19);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}

// Function to get the location
function getLocation(date) {
    var today = new Date();

    // Since we meet on thursdays the first meeting is before the 7th every month
    if (date.getDate() < 7) {
        // We are before next meeting this or previous month
        if (today.getDate() <= date.getDate() || today.getMonth() +1 == date.getMonth()) {
            // js-Date is funny. January = 0, February = 1... So (% 2 == 1) gets even months
            if (date.getMonth() % 2 == 1) {
                return "Zauber von OS";
            }
        }
    }
    return "Bridge Club Osnabrück e.V."
}

// Script entry point: Function to set the date and the location for the next meeting
function setNextMeeting() {
    var today = new Date();

    // Get date of next meeting this month
    var date = getMeetingOfYearMonth(today.getFullYear(), today.getMonth());
    // Get location of next meeting
    var meetingLocation = getLocation(date);
    // Get HTML element where to place the date of the next meeting
    document.getElementById('nextMeeting').innerHTML = date;
    // Get HTML element where to place the location of the next meeting
    document.getElementById('nextMeetingLocation').innerHTML = meetingLocation;
}

