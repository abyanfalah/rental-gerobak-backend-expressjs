const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.disable("x-powered-by");
app.use(cors());

app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60,
		},
	})
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/user", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/gerobak", require("./routes/gerobak"));
app.use("/customer", require("./routes/customer"));
app.use("/rent", require("./routes/rent"));

module.exports = app;
