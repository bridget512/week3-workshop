var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use(express.static('./www'));

app.listen(3000, 'localhost', function(){
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server has started listening at: ' + n + ":" + m); 
});


// var http = require('http').Server(app);
// app.use(express.static('./www'));

// let server = http.listen(3000, function () {
//     let host = server.address().address;
//     let port = server.address().port;
//     console.log('My First Nodejs Server!');
//     console.log('Server listening on: ' + host + 'port:' + port);
// }); // server


// ================================
// Routes 
// ================================

// Default Route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

// Account Route
app.get('/account', function (req, res) {
    res.sendFile(__dirname + '/www/account.html');
});

// Credential verification
app.post('/api/login', function(req, res){

    let users = [
        {'userEmail' : 'b'      ,'userPass' : '1'}, 
        {'userEmail' : 'Kira@desunoto.jp'       ,'userPass' : 'Shinigami'}, 
        {'userEmail' : 'monkey@business.club'   ,'userPass' : 'monke'}
    ];

    if (!req.body){
        return res.sendStatus(400)
    }
        var user = {};
        user.userEmail = req.body.userEmail;
        user.userPass  = req.body.userPass;
        user.valid = false;

    // loop through the users list and check the entry to the values in the users object
    for (let i = 0; i < users.length; i++){
        
        if (req.body.userEmail == users[i].userEmail && req.body.userPass == users[i].userPass){
            user.valid = true;
        }

        // else{
        //     user.valid = false; // might not need this as its the default?
        // }
    }   
        res.send(user);
});

