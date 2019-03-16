$(document).ready(function() {

	$('#start').on('click', function() {
		stopwatch.reset();
		stopwatch.interval(function() {
			$('#timer').text(formatTime(stopwatch.time()));
		});
	});

	$('#stop').on('click', function() {
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

		$('#session-list').append(item);


	});

});