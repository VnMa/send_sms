const express = require("express");
const app = express();
const server = app.listen(2000);

const bodyParser = require("body-parser");
const ejs = require("ejs");

app.set("views", __dirname + "/../views");
app.set("view engine", "html");
app.engine("html", ejs.renderFile);
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Nexmo = require("nexmo");

const nexmo = new Nexmo(
  {
    apiKey: "94aab59e",
    apiSecret: "nWRCkmy1b4nurSDQ"
  },
  { debug: true }
);
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.send(req.body);
  console.log(req.body);
  let toNumber = req.body.number;
  let text = req.body.text;
  //   let text = "Hello from Nexmo";
  // Sending SMS via Nexmo

  const from = "Nexmo";

  nexmo.message.sendSms(
    from,
    toNumber,
    text,
    { type: "unicode" },
    (err, resp) => {
      if (err) {
        console.log("Err: ", err);
      } else {
        console.log("response: ", resp);
      }
    }
  );
});
