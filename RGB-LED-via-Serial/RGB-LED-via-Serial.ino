int redpin =11;
int greenpin = 10;
int bluepin =9;
String incomingCommand = "";

void setup() {
  pinMode(redpin, OUTPUT);
  pinMode(greenpin, OUTPUT);
  pinMode(bluepin, OUTPUT);
  
  Serial.begin(115200);
}

void loop() 
{
  if( Serial.available() > 0 ) {
    incomingCommand = Serial.readStringUntil('\n');
    if( incomingCommand == "RED" ) {
      analogWrite(redpin, 128);  
      analogWrite(greenpin, 0);
      analogWrite(bluepin, 0);
    } else if( incomingCommand == "BLUE" ) {
      analogWrite(redpin, 0);
      analogWrite(bluepin, 128);
      analogWrite(greenpin, 0);
    } else if( incomingCommand == "YELLOW" ){
      analogWrite(redpin, 128);
      analogWrite(bluepin, 0);
      analogWrite(greenpin, 128);
    } else if( incomingCommand == "GREEN" ) {
      analogWrite(redpin, 0);
      analogWrite(bluepin, 0);
      analogWrite(greenpin, 128);
    } else if( incomingCommand == "WHITE") {
      analogWrite(redpin, 128);
      analogWrite(bluepin, 128);
      analogWrite(greenpin, 128);
    } else if( incomingCommand == "OFF" ) {
      analogWrite(redpin, 0);
      analogWrite(bluepin, 0);
      analogWrite(greenpin, 0);
    } 
  }
}
