const express = require('express');
const server =express();

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get('/sendemail', function(req, res){

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    const msg = {
        to: 'runroj@gmail.com',
        from: 'mailerdaemon@rojrun.com',
        subject: 'received a message at ' + (new Date()).toLocaleString(),
        reply_to: req.query.contactemail,
        text: `
            Email: ${req.query.contactemail}
            Subject: ${req.query.subject}
            Message: ${req.query.message}
            `,
        html: `
            <div>Email: ${req.query.contactemail}</div>
            <div>Subject: ${req.query.subject}</div>
            <div>Message: ${req.query.message}</div>
            `,
    };
    sgMail.send(msg).then(function(){
        console.log(arguments);
        res.send('done');
    });
});

server.listen(4444, function(){
    console.log('server is up and running');
});


