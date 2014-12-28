function getMondaysOfMonth(month, year) {
    var currentDate = new Date(),
        mondays = [];
    currentDate.setMonth(month);
    currentDate.setFullYear(year);
    // Start at the first day of a month.
    currentDate.setDate(1);
    // Get the first Monday in the month.
    while (currentDate.getDay() !== 1) {
        currentDate.setDate(currentDate.getDate() + 1);
    }
    // Meeting time is always at 19:00:00:00 locale time.
    currentDate.setHours(19);
    currentDate.setMinutes(00);
    currentDate.setSeconds(00);
    currentDate.setMilliseconds(00);
    // Get all the other Mondays in the month.
    while (currentDate.getMonth() === month) {
        mondays.push(new Date(currentDate.getTime()));
        currentDate.setDate(currentDate.getDate() + 7);
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
    var nextMeeting,
        currentDate,
        nextMeetingMonth,
        nextMeetingYear;
    currentDate = new Date();
    // Test with a fixed date.
    // currentDate = new Date(2015, 0, 26, 19, 01, 00, 00);
    nextMeetingMonth = currentDate.getMonth();
    nextMeetingYear = currentDate.getFullYear();
    nextMeeting = getMondaysOfMonth(nextMeetingMonth, nextMeetingYear)[3];
    if (nextMeeting.getTime() < currentDate.getTime()) {
        if (currentDate.getMonth() < 11) {
            nextMeetingMonth = currentDate.getMonth() + 1;
            nextMeeting = getMondaysOfMonth(nextMeetingMonth, nextMeetingYear)[3];
        }
        else {
            nextMeetingMonth = 0;
            nextMeetingYear = currentDate.getFullYear() + 1;
            nextMeeting = getMondaysOfMonth(nextMeetingMonth, nextMeetingYear)[3];
        }
    }
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

