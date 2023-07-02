const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello Every body");
});
app.get("/api/user/me", (req, res) => {
  res.send("Hello Bachir");
});
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
