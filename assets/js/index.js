var sessionRunning = false;

$(document).ready(function() {

	$('#start').on('click', function() {
		//only start a session if we haven't started one already
		if (sessionRunning) return;
		sessionRunning = true;

		stopwatch.reset();
		stopwatch.interval(function() {
			$('#timer-display').text(formatTime(stopwatch.time()));
		});
	});

	$('#reset').on('click', function() {
		// we don't really care whether a session is running
		sessionRunning = false;

		stopwatch.clearInterval();

		$('#timer-display').text(formatTime(0));
	});

	$('#stop').on('click', function() {
		//only stop a session if we have one running
		if (!sessionRunning) return;
		sessionRunning = false;

		stopwatch.clearInterval();
		var time = stopwatch.time();
		// save the time right now, so firebase lag doesn't matter

		database.ref('studySessions').push({
			date: stopwatch.startTime(),
			duration: time
		});
	});



	database.ref('studySessions').orderByChild('date').limitToLast(5).on('child_added', function(snap) {
		var session = snap.val();

		var item = $('<li>');
		item.text(session.date + ' - ');
		item.append($('<b>').text(formatTime(session.duration)));
		item.attr('id', 'session-' + session.date);

		$('#timeLog').prepend(item);
	});

	database.ref('studySessions').orderByChild('date').limitToLast(5).on('child_removed', function(snap) {
		var session = snap.val();

		$('#session-' + session.date).remove();
	});

});