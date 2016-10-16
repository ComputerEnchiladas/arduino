var serial = require('serialport');

var port = new serial('/dev/ttyACM0', {
  baudRate: 115200
});

port.on('open', function(){
  console.log('PORT OPEN');
});

port.on('data', function(data){
  console.log( data );
});

var Gpio = require('onoff').Gpio,	//onoff module (use npm install onoff)
  blue = new Gpio(4, 'in', 'both'),
  red = new Gpio(17, 'in', 'both'),
  redOn = false,
  blueOn = false,
  redLED = new Gpio(18, 'out'),
  greenLED = new Gpio(23, 'out'),
  blueLED = new Gpio(24, 'out');

blue.setActiveLow( true );
red.setActiveLow( true );


red.watch(function(err, value) {
  if( value ) {
    if( blueOn ) {
      port.write('GREEN\n');
      redLED.writeSync(0);
      blueLED.writeSync(0);
      greenLED.writeSync(1);
    } else {
     port.write('RED\n');
     redLED.writeSync(1);
    }
    redOn = true;
  } else {
    redOn = false;
    port.write('OFF\n');
    greenLED.writeSync(0);
    redLED.writeSync(0);
    blueLED.writeSync(0);
  }
});
blue.watch(function(err, value) {
  if( value ) {
    if( redOn ) {
      greenLED.writeSync(1);
      port.write('GREEN\n');
      redLED.writeSync(0);
      blueLED.writeSync(0);

     } else if( value ) {
      blueLED.write(1);
      port.write('BLUE\n');
    } 
    blueOn = true;
  } else {
    blueLED.writeSync(0);
    greenLED.writeSync(0);
    redLED.writeSync(0);
    blueOn = false;
    port.write('OFF\n');
  }
});

process.on('SIGINT', function(){
  red.unexport();
  blue.unexport();
  redLED.unexport();
  blueLED.unexport();
  greenLED.unexport();
  process.exit();
});
