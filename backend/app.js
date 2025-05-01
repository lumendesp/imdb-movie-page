const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

require("./db/conn");

const port = 3000;

const commentRoutes = require("./routes");

app.use("/comments", commentRoutes);

app.listen(port, async () => {
  console.log(`O servidor iniciou na porta ${port}`);
});
