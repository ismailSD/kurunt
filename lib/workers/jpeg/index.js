//
// Kurunt JPEG Worker
//
// JPEG binary image 'worker' for Kurunt, processing jpeg data.
// Version: 0.2
// Author: Mark W. B. Ashcroft (mark [at] kurunt [dot] com)
// License: MIT or Apache 2.0.
//
// Copyright (c) 2013-2014 Mark W. B. Ashcroft.
// Copyright (c) 2013-2014 Kurunt.
//


// must export 'work' module.
module.exports.work = function (message, wk, fn, callback) {

  // 'message.message' Format: base64
  //
  // See: http://docs.kurunt.com/JPEG_Worker

  fn.logging.log('jpeg@workers> MESSAGE: ', message);

  // use try catch so can skip over invalid messages.
  try {

    var attributes = [];
    attributes['jpeg_image'] = message.message;

    // return processed message (required) and attributes (optional, set manually within message otherwise) back to kurunt.
    return callback( [ message, attributes ] );
  
  } catch(e) {
    fn.logging.log('jpeg@workers> ERROR: ', e);
    return callback( false );
  }

};


var config = {
	"name": "jpeg",
	"title": "JPEG",	
	"description": "JPEG images, for processing jpeg image data.",
	"icon": "",
	"url": "http://docs.kurunt.com/JPEG_Worker",
	"version": 0.2,	
	"date_mod": "10/22/2013",
	"inputs": [ "tcp", "udp", "http" ],
	"reports": [ "stream" ],
	"encoding": "utf8",
	"stores": [
		{
			"stream": {
				"schema": {
					"jpeg_image": { }
				}
			}
		}		
	]
};
exports.config = config;		// must export the config so kurunt can read it.
