$(document).ready(function() {

	
	//get the year from the html
	var getYear = document.getElementById("year_start");
	getYear.addEventListener('change', theYear);

	function theYear () {
	var y = $("#year_start option:selected").text();
//	console.log(y);
	 return  y;
	};

// get the month from the html
	var getMonth = document.getElementById("month_start"); 
	getMonth.addEventListener('change', theMonth); 
	
	function theMonth () {
	var m = $("#month_start option:selected").text();
	//console.log(m);	
	return m; 
    };

// get the day from the html
	var getDay = document.getElementById("day_start");
	getDay.addEventListener('change', theDay); 
 
	function theDay () {
	var d = $("#day_start option:selected").text();
//	console.log(d);
	return d;
    };


$("#month_start, #day_start, #year_start").change(countdown);  //IMPORTANT--when the user changes  the date the countdown function will be called!


 
// the callme function below calculates the exam day....by taking in the paramaters from the HTML and using them....
function callme (year,month,date) {
	
	var combine = year + "" + month + "" + date; 
	// shows the value the user is inputing from the html file console.log(combine);
	
	var differenceindays = moment().diff(moment(combine), 'days'); 
	var daysleft = Math.abs(differenceindays);  //WARNING need to change this part because the function still calcutes the time even when 'go back in time' to the past
    $('.days').html(daysleft);

	// calculations for hours, minutes and seconds remaining
	var hour = moment().format('HH'); 
	var hoursleft = 24-hour;
	$('.hours').html(hoursleft);
	
	var minutes = moment().format('mm'); 
	var minutesleft = 60-minutes; 
	$('.minutes').html(minutesleft);

	var seconds = moment().format('ss');	 
	var secondsleft = 60-seconds;
	$('.seconds').html(secondsleft);	
	
	//console.log(daysleft + " days " + hoursleft + " hours " + minutesleft + " minutes " + secondsleft  + ' seconds until the exam');


	database.ref("/Exam").set({
		Countdown: {
		Days: daysleft, 
		Hours: hoursleft, 
		Minutes: minutesleft, 
		Seconds: secondsleft
		}
		}); 


	}

	// the counddown function calls callme function and 
	function countdown () {
		var p = setInterval(function() { callme(theYear(),theMonth(), theDay())}, 1000);
	  }

	  
//getting the values from  firebase and displaying onto HTML
 function firebasevalue () {
 database.ref("/Exam").orderByChild("Countdown").on("child_added", function(snapshot) {
 //console.log(snapshot.val().Days);
 //console.log(snapshot.val().Hours);
 //console.log(snapshot.val().Minutes);
 //console.log(snapshot.val().Seconds);
 
 $('#whateverId').text(snapshot.val().Days + " days " +  snapshot.val().Hours + " hours " + snapshot.val().Minutes +  " minutes " +  snapshot.val().Seconds  + " seconds remain until the exam!");
 });  
 }
 setInterval(firebasevalue, 50);
	 



});