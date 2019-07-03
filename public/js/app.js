var numberField = document.querySelector("input[name=number]");
var textField = document.querySelector("input[name=text]");
var button = document.querySelector("input[type=button]");
var msg = document.querySelector(".response");

textField.addEventListener(
  "keyup",
  function(e) {
    if ((e.keyCode || e.charCode) === 13) send();
  },
  false
); // when a user presses a Return key

button.addEventListener("click", send, false); // when a user click the "Send" button

function send() {
  var number = numberField.value.replace(/\D/g, ""); // Remove all non-numeric chars
  var text = textField.value;

  // ... will send the form using fetch here
  if (!self.fetch) {
    alert("Bummer, your browser doesn't support Fetch API!");
    return;
    // Ideally, use XHR as the fallback for fetch.
  }

  fetch("/", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      number: number,
      text: text
    })
  })
    .then(function(res) {
      document.getElementById("response").innerHTML = "Gửi thành công!";
    })
    .catch(function(error) {
      document.getElementById("response").innerHTML = "Gửi thất bại!";
    });
}
