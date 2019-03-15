$(document).ready(function() {

	$('#SESSION_START_BUTTON').on('click', function() {
		stopwatch.reset();
		stopwatch.interval(function() {
			$('#SESSION_TIMER_DISPLAY').text(formatTime(stopwatch.time()));
		});
	});

	$('#SESSION_STOP_BUTTON').on('click', function() {
		stopwatch.clearInterval();
		var time = stopwatch.time();

		database.ref('studySessions').push({
			date: Date.now(),
			duration: time
		});
	});



	database.ref('studySessions').on('child_added', function(snap) {
		var session = snap.val();

		var item = $('<li>');
		item.text(session.date + ' - ');
		item.append($('<b>').text(formatTime(session.duration)));

		$('#STUDY_SESSION_LIST').append(item);


	});

});