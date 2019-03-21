$(document).ready(function() {

	var sessionList = $('#session-table tbody');
	sessionList.empty();

	var sessionIndex = 0;

	database.ref('studySessions').orderByChild('date').on('child_added', function(snap) {
		var session = snap.val();
		sessionIndex++;
		console.log(session);

		var row = $('<tr>', { 'data-session': snap.key });
		row.append($('<th>', { scope: 'row', text: sessionIndex }));
		row.append($('<td>', { text: formatTime(session.duration) }));
		row.append($('<td>', { text: moment(parseInt(session.date)).format('ddd, MMM Do [at] h:mm a') }));

		var deleteButton = $('<button>', {
			type: 'button',
			class: 'btn btn-secondary btn-sm',
			'data-session': snap.key,
			text: 'Delete'
		});
		row.append($('<td>').append(deleteButton));

		sessionList.append(row);

	});

	database.ref('studySessions').on('child_removed', function(snap) {
		var session = snap.val();
		console.log(session);

		$('tr[data-session=' + snap.key + ']').remove();

	});


	$('#session-table').on('click', 'button', function() {
		var ident = $(this).attr('data-session');

		database.ref('studySessions').child(ident).remove();

	});

});