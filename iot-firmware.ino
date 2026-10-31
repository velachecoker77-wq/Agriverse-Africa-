// Agriverse IoT Node — ESP32 + DHT22 + MQ135 + IR Egg Counter + SIM800L
// Push to Sherbro Node 001 via MQTT
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#define DHTPIN 4
#define DHTTYPE DHT22
#define MQ135PIN 34
#define EGG_IR_PIN 5

DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);

const char* ssid="SierraAkker-WiFi";
const char* mqtt_server="sherbro.agriverse.africa"; // Local Node IP 192.168.1.100

int eggCount=0;
void setup(){
 Serial.begin(115200);
 dht.begin();
 pinMode(EGG_IR_PIN, INPUT_PULLUP);
 WiFi.begin(ssid,"password");
 client.setServer(mqtt_server,1883);
 attachInterrupt(digitalPinToInterrupt(EGG_IR_PIN), countEgg, FALLING);
}
void countEgg(){ eggCount++; }

void loop(){
 float t=dht.readTemperature();
 float h=dht.readHumidity();
 int ammonia=analogRead(MQ135PIN);
 String payload="{\"farm_id\":\"AG-POULTRY-001\",\"node\":\"Sherbro-Node-001\",\"temp\":"+String(t)+",\"humidity\":"+String(h)+",\"ammonia\":"+String(ammonia)+",\"eggs_today\":"+String(eggCount)+",\"gps\":\"8.3821,-13.2122\",\"timestamp\":"+String(millis())+"}";
 client.publish("agriverse/poultry/SL-SA-001", payload.c_str());
 // Alert logic for record low post-harvest loss
 if(t>32 || h>80 || ammonia>400){
   client.publish("agriverse/alerts","High risk - ventilate to reduce loss");
 }
 delay(10000);
}
