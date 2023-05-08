var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const saltRounds = 10
var jwt = require('jsonwebtoken');
const secret = 'Login-kabiixoo'

app.use(cors())
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'kabiixoo'
});

app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.mem_password, saltRounds, function(err, hash) {
        con.execute(
            'INSERT INTO members (mem_username,mem_email,mem_password,mem_name,mem_surname,mem_phoneNumber,mem_role) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [req.body.mem_username,
                req.body.mem_email,
                hash,
                req.body.mem_name,
                req.body.mem_surname,
                req.body.mem_phoneNumber,
                req.body.mem_role],
                function(err, results, fields) {
                if ( err) {
                    res.json ({status: 'error', message: err})
                    return
                }
                res.json({status: 'ok'})
            }
        );
    });
})

app.post('/login', jsonParser, function (req, res, next) {
    con.execute(
        'SELECT * FROM members WHERE mem_email=?',
        [req.body.mem_email],
            function(err, members, fields) {
            if ( err ) {
                res.json ({status: 'error', message: err});
                return
            }if (members.length == 0) {
                res.json({status: 'error', message: 'no users found'});
                return
            }
            bcrypt.compare(req.body.mem_password, members[0].mem_password, function(err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ email: members[0].mem_email }, secret, { expiresIn: '1h' });
                    res.json({status: 'ok', message:'login success', token})
                }else{
                    res.json({status: 'error', message:'login failed'})
                }
            });
        }
    );
})

app.post('/authen', jsonParser, function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status: 'ok', decoded})
    } catch(err){
        res.json({status: 'error', message: err.message})
    }
})

app.listen(3333, function () {
    console.log('CORS-enabled web server listening on port 3333')
})