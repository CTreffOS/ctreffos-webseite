function getMondaysOfMonth(month) {
    var d = new Date(),
        mondays = [];
    d.setMonth(month);
    // Set day = 1 of d, e.g. of current date.
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

function toRFC2822String(dateString) {
    // Convert date to RFC2822 conform string, like:
    // Mon, 22 Sep 2014 19:00:00 +0200
    var rfc2822Date,
        timezone;
    dateString = ('' + dateString).split(' ');
    timezone = dateString[5].split('T')[1];
    rfc2822String = dateString[0]
                    + ', ' + dateString[2]
                    + ' ' + dateString[1]
                    + ' ' + dateString[3]
                    + ' ' + dateString[4]
                    + ' ' + timezone;
    return rfc2822String;
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
    nextMeeting = nextMeeting.toString();
    nextMeeting = toRFC2822String(nextMeeting);
    return nextMeeting;
}

function setMeeting() {
    document.getElementById('nextMeeting').innerHTML = getNextMeeting();
}

