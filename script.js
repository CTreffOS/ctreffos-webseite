// JavaScript debug messages can be viewed in the browser console.
// Open the browser console with Ctrl+Shift+J (Firefox and Chromium).


// Function to return a date object from the fourth monday of given year and month
function getMeetingOfYearMonth(year, month) {
    var date = new Date(year, month, 1);
    var today = new Date();
   
    // find first thursday
    while (date.getDay() !== 4) {
        date.setDate(date.getDate() + 1);
    }
    
    // When on day or before meeting, return the date
    if (today.getDate() <= date.getDate()) {
    	return setTime(date);
    }

    // Or get the third Thursday
    date.setDate(date.getDate() + 2*7);
    if (today.getDate() <= date.getDate()) {
        return setTime(date);
    } else { // If third Thursday has passed, get the next month
	// check if we are in december, then choose next year
	if (today.getMonth() == 11) {
	    return getMeetingOfYearMonth(today.getYear() + 1, 0);
	} else {
            return getMeetingOfYearMonth(today.getYear(), today.getMonth()+1);
	}
    }
}

// Function to set the time to 19:00 local time
function setTime(date) {
    date.setHours(19);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}

// Function to set the date for the next meeting
function setNextMeeting() {
    var today = new Date();

    // Get date of meeting from this month.
    var date = getMeetingOfYearMonth(today.getFullYear(), today.getMonth());

    var meetingLocation = getLocation(date);

    document.getElementById('nextMeeting').innerHTML = date;
    document.getElementById('nextMeetingLocation').innerHTML = meetingLocation;
}

// Function to get the location
function getLocation(date) {
    var today = new Date();
    // Since we meet on thursdays the first meeting must happen before the 10th every
    // month
    if (date.getDate() <= 10) {
        if (today.getDate() <= date.getDate()) {
	        // js-Date is funny. January = 0, February = 1... So (% 2 == 1) gets even months
	        if (date.getMonth() % 2 == 1) {
	            return "Zauber von OS";
	        }
	    }
    }
    return "Bridgeclub Osnabrück"
}

