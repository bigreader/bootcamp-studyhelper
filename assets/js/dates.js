$(document).ready(function() {

	database.ref('exam').on('value', function(snap) {
		exam = snap.val();
		moment(exam.date);
	});




	$('#numbers .days').text();

});