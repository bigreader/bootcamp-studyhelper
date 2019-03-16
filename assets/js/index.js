$(document).ready(function() {

	$('#start').on('click', function() {
		stopwatch.reset();
		stopwatch.interval(function() {
			$('#timer').text(formatTime(stopwatch.time()));
		});
	});

	$('#reset').on('click', function() {
		stopwatch.clearInterval();
		$('#timer').text(formatTime(0));
	});

	$('#stop').on('click', function() {
		stopwatch.clearInterval();
		var time = stopwatch.time();
		// save the time right now, so firebase lag doesn't matter

		database.ref('studySessions').push({
			date: stopwatch.startTime(),
			duration: time
		});
	});



	database.ref('studySessions').orderByChild('date').on('child_added', function(snap) {
		var session = snap.val();

		var item = $('<li>');
		item.text(session.date + ' - ');
		item.append($('<b>').text(formatTime(session.duration)));

		$('#timeLog').append(item);


	});

});