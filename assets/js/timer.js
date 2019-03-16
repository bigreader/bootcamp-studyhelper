function formatTime(sec) {
	if (sec > 3600) {
		return ((Math.floor(sec/3600) + "") + ":" + (Math.floor(sec%3600/60) + "").padStart(2, "0") + ":" + (sec%60 + "").padStart(2, "0"));
	} else if (sec > 60) {
		return ((Math.floor(sec/60) + "") + ":" + (sec%60 + "").padStart(2, "0"));
	} else {
		return ("0:" + (sec%60 + "").padStart(2, "0"));
	}
}

var stopwatch = {
	callbackInterval: null,

	time: function() {
		return Math.floor((Date.now()-this.startTime())/1000);
	},

	startTime: function() {
		return localStorage.getItem("stopwatch");
	},

	reset: function() {
		localStorage.setItem("stopwatch", Date.now());
	},

	interval: function(callback) {
		callback();
		callbackInterval = setInterval(callback, 500);
	},

	clearInterval: function() {
		clearInterval(callbackInterval);
	}
}