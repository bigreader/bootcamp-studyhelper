$(document).ready(function() {

	database.ref('studySessions').orderByChild('date').on('child_added', function(snap) {
		var session = snap.val();
		var sessionList = $('#sessions-list');

		console.log(session);

		sessionList.append($('<div>', { class: 'w-100' }));
		sessionList.append($('<div>', { class: 'col', text: formatTime(session.duration) }));
		sessionList.append($('<div>', { class: 'col', text: moment(parseInt(session.date)).fromNow() }));
	});

});