const express = require("express");
const { DBConnect } = require("./config/DBConnect");
PORT = process.env.PORT || 7000;
const app = express();

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

DBConnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const employeeRoutes = require("./routes/employee");

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/employee", employeeRoutes);
