"use strict"

var _express = _interopRequireDefault(require("express"))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var app = (0, _express["default"])()
var PORT = process.env.PORT || 5000
console.log("Asdas")
app.get("/", function(req, res) {
  res.send("API Running")
})
app.listen(5000, function() {
  console.log("server listing on " + PORT)
})
