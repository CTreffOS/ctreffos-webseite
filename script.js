function getMondays() {
    var d = new Date(),
        month = d.getMonth(),
        mondays = [];

    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    return mondays;
}

function setMeeting() {
	var meeting = getMondays()[3];
	meeting = ('' + meeting).split(' ');
	meeting =  meeting[0] + ' ' + meeting[1] + ' ' + meeting[2] + ' ' + meeting[3];
	var node = document.getElementById('nextmeeting');
	node.innerHTML = meeting + node.innerHTML;
}
