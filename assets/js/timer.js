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
	callbackInterval: null;

	time: function() {
		var startTime = localStorage.getItem("stopwatch");
		return Math.floor((Date.now()-startTime)/1000);
	},

	reset: function() {
		localStorage.setItem("stopwatch", Date.now());
	},

	interval: function(callback) {
		callbackInterval = setInterval(callback, 100);
	},

	clearInterval: function() {
		clearInterval(callbackInterval);
	}
}