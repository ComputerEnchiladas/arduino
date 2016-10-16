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

function turnOnRed(){
  arduino.write('RED\n');
  redLED.writeSync(1);
  greenLED.writeSync(0);
  blueLED.writeSync(0);
}
function turnOnGreen(){
  arduino.write('GREEN\n');
  redLED.writeSync(0);
  greenLED.writeSync(1);
  blueLED.writeSync(0);

}
function turnOnBlue(){
  arduino.write('BLUE\n');
  redLED.writeSync(0);
  greenLED.writeSync(0);
  blueLED.writeSync(1);
}
function turnOnWhite(){
  arduino.write('WHITE\n');
  redLED.writeSync(1);
  greenLED.writeSync(1);
  blueLED.writeSync(1);
}
function turnOff(){
  arduino.write('OFF\n');
  redLED.writeSync(0);
  greenLED.writeSync(0);
  blueLED.writeSync(0);
}

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
      turnOnGreen();
    } else {
      turnOnRed();
    }
    redOn = true;
  } else {
    if( blueOn ) {
      turnOnBlue();
    } else {
      turnOff();
    }
    redOn = false;
  }
});

blue.setActiveLow( true );
blue.watch(function(err, value) {
  if( value ) {
    if( redOn ) {
      turnOnGreen();
     } else if( value ) {
      turnOnBlue();
    } 
    blueOn = true;
  } else {
    if( redOn ) {
      turnOnRed();
    } else {
      turnOff();
    }
    blueOn = false;
  }
});

var http = require('http')
  , server = http.createServer( handler )
  , io = require('socket.io')( server );

function handler( request, reply ) {
  reply.writeHead(200);
  reply.end('Running!');
}

io.on('connection', function( socket ) {
  socket.on('event:led:red', function(){
    turnOnRed();
  });
  socket.on('event:led:green', function(){
    turnOnGreen();
  });
  socket.on('event:led:blue', function(){
    turnOnGreen();
  });
  socket.on('event:led:white', function(){
    turnOnWhite();
  });
  socket.on('event:leds:off', function(){
    turnOff();
  });
});

server.listen( 8000, '192.168.0.6' );

process.on('SIGINT', function(){
  red.unexport();
  blue.unexport();
  redLED.unexport();
  blueLED.unexport();
  greenLED.unexport();
  process.exit();
});
