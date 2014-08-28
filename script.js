function getMondaysOfMonth(month) {
    var d = new Date(),
        mondays = [];
    d.setMonth(month);
    // Set day = 1 of d, e.g. of current time.
    d.setDate(1);
    // Get the first Monday in the month.
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }
    // Get all the other Mondays in the month.
    while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }
    return mondays;
}

function getNextMeeting() {
    var nextMeeting = getMondaysOfMonth(new Date().getMonth())[3];
    if (nextMeeting.getTime() <= new Date().getTime()) {
      nextMeeting = getMondaysOfMonth(new Date().getMonth() + 1)[3];
    }
    // Meeting time is always at 19:00:00:00 locale time.
    nextMeeting.setHours(19);
    nextMeeting.setMinutes(00);
    nextMeeting.setSeconds(00);
    nextMeeting.setMilliseconds(00);
    // Return next meeting as a string, using locale conventions.
    nextMeeting = nextMeeting.toLocaleString();
    return nextMeeting;
}

function setMeeting() {
    var nextMeeting = getNextMeeting();
    var node = document.getElementById('nextMeeting');
    node.innerHTML = nextMeeting + node.innerHTML;
}

