var serial = require('serialport')
  , arduino = new serial('/dev/ttyACM0', {
      baudRate: 115200
    })
  , Gpio = require('onoff').Gpio
  , red = new Gpio(17, 'in', 'both')
  , blue = new Gpio(4, 'in', 'both')
  , redLED = new Gpio(18, 'out')
  , greenLED = new Gpio(23, 'out')
  , blueLED = new Gpio(24, 'out')
  , redOn = false
  , blueOn = false;

arduino.on('open', function(){
  console.log('PORT OPEN');
});

arduino.on('data', function(data){
  console.log( data );
});

red.setActiveLow( true );
red.watch(function(err, value) {
  if( value ) {
    if( blueOn ) {
      arduino.write('GREEN\n');
      redLED.writeSync(0);
      blueLED.writeSync(0);
      greenLED.writeSync(1);
    } else {
      arduino.write('RED\n');
      redLED.writeSync(1);
      blueLED.writeSync(0);
      greenLED.writeSync(0);
    }
    redOn = true;
  } else {
    if( blueOn ) {
      redLED.writeSync(0);
      greenLED.writeSync(0);
      blueLED.write(1);
      arduino.write('BLUE\n');
    } else {
      arduino.write('OFF\n');
      greenLED.writeSync(0);
      redLED.writeSync(0);
      blueLED.writeSync(0);
    }
    redOn = false;
  }
});

blue.setActiveLow( true );
blue.watch(function(err, value) {
  if( value ) {
    if( redOn ) {
      greenLED.writeSync(1);
      arduino.write('GREEN\n');
      redLED.writeSync(0);
      blueLED.writeSync(0);

     } else if( value ) {
      redLED.writeSync(0);
      greenLED.writeSync(0);
      blueLED.write(1);
      arduino.write('BLUE\n');
    } 
    blueOn = true;
  } else {
    if( redOn ) {
      arduino.write('RED\n');
      redLED.writeSync(1);
      blueLED.writeSync(0);
      greenLED.writeSync(0);
    } else {
      blueLED.writeSync(0);
      greenLED.writeSync(0);
      redLED.writeSync(0);
      arduino.write('OFF\n');
    }
    blueOn = false;
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
