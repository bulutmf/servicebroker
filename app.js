/*jshint node:true*/

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).

var express = require('express');
var bodyParser = require('body-parser')


// setup middleware
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(app.router);
app.use(express.errorHandler());
app.use(express.static(__dirname + '/public')); //setup static public directory
app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views


// render index page
app.get('/', function(req, res){
	res.render('index');
});

app.get('/v2/catalog', function(req, res){
	var catalog = '' + 
  '{' + 
    '"services": ' + 
    '[' +
      '{' + 
        '"id": "service-guid-here","name": "testservice",' +
        '"description": "A test service that is highly scalable",' +
        '"bindable": true,' +
        '"plans":' + 
        '[' +
          '{' +
            '"id": "plan1-guid-here",' +
            '"name": "small",' +
            '"description": "A small test plan"' +
          '},' +
          '{' +
            '"id": "plan2-guid-here",' +
            '"name": "large",' + 
            '"description": "A large test plan",' +
            '"free": false' +
          '}' +
        ']' +
      '}' +
    ']' +
  '}';
	res.send(catalog);
});


// Provision
app.put('/v2/service_instances/:instance_id', function(req, res) {
  var instance_id = req.params.instance_id;
  console.log("Instance id: " + instance_id); //Use this to identify the resource you will be creating, you'll be using this to bind/unbind etc. later on.

  var service_id = req.body.service_id;
  var plan_id = req.body.plan_id;
  var org_guid = req.body.organization_guid;
  var space_guid = req.body.space_guid;

  console.log("Service id: " + service_id);
  console.log("Plan id: " + plan_id);
  console.log("Org guid: " + org_guid);
  console.log("Space guid: " + space_guid);


  // Implement your logic in here...


  res.send(201, "{}");
});

// Bind
app.put('/v2/service_instances/:instance_id/service_bindings/:binding_id', function(req, res) {
  var instance_id = req.params.instance_id;
  var binding_id = req.params.binding_id;

  console.log("Instance id: " + instance_id);
  console.log("Binding id: " + binding_id); // Use this to later unbind

  var service_id = req.body.service_id;
  var plan_id = req.body.plan_id;
  var app_guid = req.body.app_guid;

  console.log("Service id: " + service_id);
  console.log("Plan id: " + plan_id);
  console.log("App guid: " + app_guid);


  // Implement your logic in here...


  res.send(201, "{}");
});


// Unbind
app.delete('/v2/service_instances/:instance_id/service_bindings/:binding_id', function(req, res) {
  var instance_id = req.params.instance_id;
  var binding_id = req.params.binding_id;

  console.log("Instance id: " + instance_id);
  console.log("Binding id: " + binding_id); 

  var service_id = req.query.service_id;
  var plan_id = req.query.plan_id;

  console.log("Service id: " + service_id);
  console.log("Plan id: " + plan_id);


  // Implement your logic in here...


  res.send(200, "{}");
});


// Deprovision
app.delete('/v2/service_instances/:instance_id', function(req, res) {
  var instance_id = req.params.instance_id;

  console.log("Instance id: " + instance_id); 

  var service_id = req.query.service_id;
  var plan_id = req.query.plan_id;

  console.log("Service id: " + service_id);
  console.log("Plan id: " + plan_id);


  // Implement your logic in here...


  res.send(200, "{}");
});

// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port);
console.log('App started on port ' + port);

