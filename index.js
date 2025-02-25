const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/db.config");
const categoryRouter = require("./routers/categoryRoutes");
const postRouter = require("./routers/postRoutes");
const adminRouter = require("./routers/adminRoutes");
const Admin = require("./models/Admin");
const path = require("path");
const MVRouter = require("./routers/mostViewedRoutes");
const termsRouter = require("./routers/termRoutes");
const contactRouter = require("./routers/contactRoutes");
const aboutRouter = require("./routers/aboutRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { swaggerUi, swaggerSpec } = require("./utils/swagger");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

connectDB();
app.use(errorHandler);
app.use(categoryRouter);
app.use(postRouter);
app.use(adminRouter);
app.use(MVRouter);
app.use(termsRouter);
app.use(contactRouter);
app.use(aboutRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Serverga xush kelibsiz!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}`);
});
