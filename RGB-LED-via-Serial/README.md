* Use Laptop to flash Arduino using RGB-LED-via-Serial.ino, then disconnect from laptop and connect to RaspberryPi.
* Setup two buttons on RaspberryPi. Use GPIO-4 and GPIO-17. Connect RGB LED to RaspberryPi where longest leg is ground (GND) and others use GPIO-18, GPIO-23 & GPIO-24.
* Setup Arduino to an RGB LED. Use ground (GND) for the longest led, then others are digital pins 11, 10 & 9 respectively, where 11 is single pin to the left of the ground.
* Clone this repo to RaspberryPi then use `npm install` in this folder to install node_modules
* Run the program using `node index.js`
* Press buttons individually and also together, then see the two RGB-LED's stay in sync.
