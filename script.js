//
// JavaScript debug messages can be viewed in the error console of
// Firefox >= 20.0.x. Shortcut to open error console is
// Ctrl+Shfit+J or F12.
//
// TO BE DONE:
// Currently algorithm fails for meetings in February for unknown
// reason.
// 


function getMondaysOfMonth(month, year) {
    var currentDate = new Date();
    var mondays = [];
    console.log('Inside function getMondaysOfMonth.');
    currentDate.setMonth(month);
    currentDate.setFullYear(year);
    // Start at the first day of a month.
    currentDate.setDate(1);
    console.log('First day of month that is checked for next meeting:');
    console.log(currentDate);
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
    console.log('Leaving function getMondaysOfMonth.');
    return mondays;
}


function toRFC2822String(dateString) {
    // Convert date to RFC2822 conform string, like:
    // Mon, 22 Sep 2014 19:00:00 +0200
    var timezone;
    console.log('Inside function toRFC2822String.');
    if (dateString === undefined) {
        rfc2822String = 'ERROR: Cannot convert empty date string.';
    }
    else {
        dateString = ('' + dateString).split(' ');
        timezone = dateString[5].split('T')[1];
        rfc2822String = dateString[0]
                        + ', ' + dateString[2]
                        + ' ' + dateString[1]
                        + ' ' + dateString[3]
                        + ' ' + dateString[4]
                        + ' ' + timezone;
    }
    console.log('Leaving function toRFC2822String.');
    return rfc2822String;
}


function toISO8601String(dateString) {
    // Convert date to ISO8601 conform string in local timezone, like:
    // 2014-09-22T19:00:00+0200
    var timezone;
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                  "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month;
    console.log('Inside function toISO8601String.');
    if (dateString === undefined) {
        iso8601String = 'ERROR: Cannot convert empty date string.';
    }
    else {
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
    }
    console.log('Leaving function toISO8601String.');
    return iso8601String;
}


function getNextMeeting() {
    var nextMeeting;
    var currentDate = new Date();
    var nextMeetingMonth;
    var nextMeetingYear;
    // Test with a fixed date.
    // currentDate = new Date(2015, 0, 19, 19, 01, 00, 00);
    console.log('Inside function getNextMeeting.');
    console.log('Current date:');
    console.log(currentDate);
    nextMeetingMonth = currentDate.getMonth();
    nextMeetingYear = currentDate.getFullYear();
    nextMeeting = getMondaysOfMonth(nextMeetingMonth, nextMeetingYear)[3];
    console.log('Next meeting found.');
    console.log(nextMeeting);
    console.log('Checking, if found meeting of this month is already over.');
    console.log(nextMeeting.getTime());
    console.log(currentDate.getTime());
    if (nextMeeting.getTime() < currentDate.getTime()) {
        console.log('Meeting this month is over.');
        if (currentDate.getMonth() < 11) {
            console.log('Current month < 11.');
            nextMeetingMonth = currentDate.getMonth() + 1;
            nextMeeting = getMondaysOfMonth(nextMeetingMonth, nextMeetingYear)[3];
            console.log('Next meeting of next month.');
            console.log(nextMeeting);
        }
        else if (currentDate.getMonth() === 11) {
            console.log('Current month = 11.');
            nextMeetingMonth = 0;
            nextMeetingYear = currentDate.getFullYear() + 1;
            nextMeeting = getMondaysOfMonth(nextMeetingMonth, nextMeetingYear)[3];
            console.log('Next meeting of first month of next year.');
            console.log(nextMeeting);
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
    console.log('Final value of next meeting:');
    console.log(nextMeeting);
    console.log('Leaving function getNextMeeting.');
    return nextMeeting;
}


function setNextMeeting() {
    console.log('Inside function setNextMeeting.');
    document.getElementById('nextMeeting').innerHTML = getNextMeeting();
    console.log('Leaving function setNextMeeting.');
}

