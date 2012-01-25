/**
 * Copyright (c) 2012 Joshua Perez, http://joshua-perez.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * @author Joshua Perez (http://joshua-perez.com)
 * @version 1.0
 */
var Sphere = function() {
	
	// Constants
	var FRAMES = 60;

	// Properties
	var canvas = null,
		context = null,
		width = window.innerWidth,
		height = window.innerHeight,
		time = 0,
		cos = Math.cos,
		sin = Math.sin;

	// Callbacks
	var callbacks = {
		onWindowResize: function(event) {
			width = window.innerWidth;
			height = window.innerHeight;

			canvas.width = width;
			canvas.height = height;
		},
		onDocumentSelectStart: function(event) {
			event.preventDefault();
			return false;
		}
	};

	/**
	 * Initializes the sphere experiment
	 */
	function initialize() {
		canvas = document.body.appendChild(document.createElement('canvas'));

		if (canvas && canvas.getContext) {
			canvas.width = width;
			canvas.height = height;

			context = canvas.getContext('2d');

			window.addEventListener('resize', callbacks.onWindowResize, false);
			document.addEventListener('selectstart', callbacks.onDocumentSelectStart, false);

			animationLoop();
		}
	}
	
	/**
	 * The main animation loop
	 */
	function animationLoop() {
		// Clear the canvas of old pixel data
		context.clearRect(0, 0, width, height);

		// Increment the time
		time += .02;

		// Time to create some particle magic!
		var i = 5000,
			m = 0,
			x = 0,
			y = 0,
			cx = width * 0.5,
			cy = height * 0.5;

		while (i--) {
			// Simple magic formula
			m = 300 * sin(1 + 1 * i * sin(time * .0001));

			// Update the particles positions
			x = cx + sin(i) * m;
			y = cy + cos(i) * m;

			// Draw the particles
			context.fillStyle = 'rgba(0, 204, 255, 1)';
			context.fillRect(x, y, 1, 1);
		}

		setTimeout(animationLoop, 1000 / FRAMES);
	}

	// Expose methods publicly
	return {
		initialize: initialize	
	};

}();

Sphere.initialize();
