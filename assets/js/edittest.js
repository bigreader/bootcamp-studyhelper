$(document).ready(function() {
	
	$('#test-form').on('submit', function(event) {
		event.preventDefault();

		database.ref("test/").set({
			name: $('#test-name').val(),
			subject: $('#test-subject').val(),
			date: $('#test-date').val()
		});

	});

});