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
 */
var Sphere = (function() {

    // Constants
    var FRAMERATE   = 1000 / 60,

    // Variables
        canvas      = null,
        context     = null,
        time        = 0;

    /**
     * Initializes the experiment and kicks everything off. Yay!
     */
    function initialize() {
        canvas = document.body.appendChild(document.createElement('canvas'));

        // Make sure the canvas and its 2D context are available
        if (canvas && canvas.getContext) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Store the reference to the 2D context
            context = canvas.getContext('2d');

            // Register event listeners
            window.addEventListener('resize', onWindowResize, false);
            window.addEventListener('selectstart', onWindowSelectStart, false);

            animate();
        }
    }

    /**
     * Called on every frame to update properties
     * and render the current state to the canvas
     */
    function animate() {
        // Clear the canvas of old pixel data
        context.clearRect(0, 0, canvas.width, canvas.height);

        // All shapes overlap and the color is
        // determined by adding the color values
        context.globalCompositeOperation = 'lighter';

        // Increment the time
        time += .05;

        // Time to create some particle magic!
        var i  = 5000,
            m  = 0,
            x  = 0,
            y  = 0,
            cx = canvas.width * 0.5,
            cy = canvas.height * 0.5;

        while (i--) {
            // Simple magic formula
            m = 300 * Math.sin(1 + 1 * i * Math.sin(time * .0001));

            // Update the particles positions
            x = cx + Math.sin(i) * m;
            y = cy + Math.cos(i) * m;

            // Draw the particles
            context.fillStyle = 'rgba(0, 204, 255, 1)';
            context.fillRect(x, y, 1, 1);
        }

        // Set up the next frame
        setTimeout(animate, FRAMERATE);
    }

    /**
     * Handler for the window "resize" event
     */
    function onWindowResize(event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    /**
     * Handler for the window "selectstart" event. Ensures
     * the window doesn't receive the text cursor on selection
     */
    function onWindowSelectStart(event) {
        event.preventDefault();
        return false;
    }

    // Define the public API
    return {
        initialize: initialize
    };

})();

Sphere.initialize();
