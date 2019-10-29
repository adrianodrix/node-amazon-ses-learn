// https://medium.com/@kiran_84239/sending-a-pdf-attachment-with-amazon-ses-on-node-js-382a51b50fce
// https://nodemailer.com/extras/mailcomposer/

require("dotenv").config();

const path = require("path");
var ses = require("node-ses");

var mailComposer = require("mailcomposer");

var client = ses.createClient({
  key: process.env.KEY,
  secret: process.env.SECRET
});

mailComposer({
  from: '"EMPRESA & CIA LTDA." <noreply@treeunfe.com.br>',
  sender: {
    name: "EMPRESA & CIA LTDA.",
    address: "adrianodrix@gmail.com"
  },
  replyTo: {
    name: "EMPRESA & CIA LTDA.",
    address: "adrianodrix@gmail.com"
  },
  to: {
    name: "CLIENTE DO CLIENTE",
    address: "noreply@treeunfe.com.br"
  },
  subject: "Subject Line Here",
  // text: "Plain text",
  html: "<h1>HTML Text</h1><p><i>Italic Text</i></p>",
  /*alternatives: [
    {
      contentType: "text/x-web-markdown",
      content: "**Hello world!**"
    }
  ],*/
  attachments: [
    {
      path: path.resolve(
        __dirname,
        "1101103519057463453600010355001000004420199999557501-cce.xml"
      )
    },
    {
      path: path.resolve(__dirname, "Nota-Devolucao-Syma.pdf")
    }
  ]
}).build((err, message) => {
  if (err) {
    console.error(`Email encoding error: ${JSON.stringify(err)}`);
  }

  client.sendRawEmail(
    {
      from: '"EMPRESA & CIA LTDA." <noreply@treeunfe.com.br>',
      rawMessage: message
    },
    function(err, data, res) {
      if (err) console.error(`Email encoding error: ${JSON.stringify(err)}`);
    }
  );
});
