// this global variable is where all the script goes so that
// it doesn't polute the global namespace
var MYAPP = MYAPP || {};
var myScroll = myScroll || {};

MYAPP.run = (function () {
    //enable zoom
    myScroll = new iScroll('main', { zoom: true, zoomMax: 4 });

    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    //setup orientation detector
    window.onorientationchange = function () {
        //Need at least 800 milliseconds
        setTimeout(MYAPP.onorientationchange, 1000);
    };
	// create the Kendo UI Mobile application
    MYAPP.app = new kendo.mobile.Application(document.body, { transition: "slide" }); 
});

// this is called when the intial view shows. it prevents the flash
// of unstyled content (FOUC)
MYAPP.show = (function() {
	$(document.body).show();
});

// this function returns a Kendo UI DataSource
// which reads the top threads off of the programming.reddit
// datasource
MYAPP.reddit = kendo.data.DataSource.create({
  // set the data to a local array of object
  transport: {
    read: "http://www.reddit.com/r/programming.json"
  },
  schema: {
    data: "data.children",
    fields: {
      title: "data.title"
    }
  }
});

MYAPP.onorientationchange = function changeOrientation() {
    switch (window.orientation) {
        case 0: // portrait, home bottom
        case 180: // portrait, home top
            alert("portrait H: " + $(window).height() + " W: " + $(window).width());
            break;
        case -90: // landscape, home left
        case 90: // landscape, home right
            alert("landscape H: " + $(window).height() + " W: " + $(window).width());
            break;
    }
};

// this function runs at startup and attaches to the 'deviceready' event
// which is fired by PhoneGap when the hardware is ready for native API
// calls. It is self invoking and will run immediately when this script file is 
// loaded.
(function() {
    if (navigator.userAgent.indexOf('Browzr') > -1) {
        // blackberry
        setTimeout(MYAPP.run, 250)    
    } else {
        // attach to deviceready event, which is fired when phonegap is all good to go.
        document.addEventListener('deviceready', MYAPP.run, false);
    }
})();