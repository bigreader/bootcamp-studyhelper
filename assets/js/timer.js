var stopwatchStart;

function formatTime(sec) {
	if (sec > 3600) {
		return (Math.floor(sec/3600) + ":" + Math.floor(sec%3600/60).padStart(2, "0") + ":" + (sec%60).padStart(2, "0"));
	} else if (sec > 60) {
		return (Math.floor(sec/60) + ":" + (sec%60).padStart(2, "0"));
	} else if (sec > 3600) {
		return ("0:" + (sec%60).padStart(2, "0"));
	}
}


var stopwatch = {
	running: function() {
		return false;
	},

	time: function() {
		return 0;
	}


}