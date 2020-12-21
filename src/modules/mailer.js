const path = require('path')
const nodemailer = require('nodemailer');

const hbs = require('nodemailer-express-handlebars');

/*var transport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "danielcsouza97@gmail.com",
    pass: "RVrxcswhypqNCJvS"
  }
  
});*/

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f8d6e871634e2c",
      pass: "dd77bebfee606e"
    }
  });

transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
  }));

module.exports = transport;