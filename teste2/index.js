// https://github.com/milly-chuang/aws-ses-mail

require("dotenv").config();

var awsSesMail = require("aws-ses-mail");

var sesMail = new awsSesMail();
var sesConfig = {
  accessKeyId: process.env.KEY,
  secretAccessKey: process.env.SECRET,
  region: "us-east-1"
};
sesMail.setConfig(sesConfig);

var options = {
  from: "Sender <noreply@treeunfe.com.br>",
  to: "noreply@treeunfe.com.br",
  replyToAddresses: "adrianodrix@gmail.com",
  charset: "utf-8",
  subject: "Hello world",
  content:
    "<html><head></head><body><div><p>Hello world!</p></div></body></html>"
};

sesMail.sendEmail(options, function(err, data) {
  if (err) {
    console.log("---- err ----");
    console.log(JSON.stringify(err));
  } else {
    console.log("---- success ----");
    console.log(JSON.stringify(data));
  }
});
