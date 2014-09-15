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
    var timezone;
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

function toISO8601String(dateString) {
    // Convert date to ISO8601 conform string in local timezone, like:
    // 2014-09-22T19:00:00+0200
    var timezone,
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                  "Aug", "Sep", "Oct", "Nov", "Dec"],
        month;
    dateString = ('' + dateString).split(' ');
    month = '' + (months.indexOf(dateString[1]) + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    timezone = dateString[5].split('T')[1];
    iso8601String = dateString[3]
                    + '-' + month
                    + '-' + dateString[2]
                    + 'T' + dateString[4]
                    + timezone;
    return iso8601String;
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
    // Convert to string, like:
    // Mon Sep 22 2014 19:00:00 GMT+0200 (CEST)
    // nextMeeting = nextMeeting.toString();
    nextMeeting = toRFC2822String(nextMeeting);
    // nextMeeting = toISO8601String(nextMeeting);
    // ISO8601 string in UTC timezone, like:
    // 2014-09-22T17:00:00.000Z
    // nextMeeting = nextMeeting.toISOString();
    return nextMeeting;
}

function setMeeting() {
    document.getElementById('nextMeeting').innerHTML = getNextMeeting();
}

