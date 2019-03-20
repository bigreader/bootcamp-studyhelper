var sessionRunning = false;

$(document).ready(function() {
	

	// SESSION TIMER

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
			date: parseInt(stopwatch.startTime()),
			duration: time
		});
	});


	// RECENT SESSIONS

	database.ref('studySessions').orderByChild('date').limitToLast(5).on('child_added', function(snap) {
		var session = snap.val();

		var item = $('<li>');
		item.append($('<b>').text(formatTime(session.duration)));
		item.append(' - ');
		item.append($('<i>').text(moment(parseInt(session.date)).fromNow()));

		$('#timeLog').prepend(item);
	});

	database.ref('studySessions').orderByChild('date').limitToLast(5).on('child_removed', function(snap) {
		var session = snap.val();

		$('#session-' + session.date).remove();
	});


	// QUOTE API

	$.ajax({
		url: 'https://cors-anywhere.herokuapp.com/http://quotes.rest/qod.json?category=students',
		method: 'GET'
	}).then(response => {
		console.log(response);
		var quote = response.contents.quotes[0]

		$('#quote-body').text(quote.quote);
		$('#quote-footer').text(quote.author);

	});


});
