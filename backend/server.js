const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const {
  sequelize,
  User,
  Owner,
  Property,
  Markup,
  Contract,
  File,
  LoginLink,
} = require("./models");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});



const app = express();
const upload = multer();

app.use(bodyParser.json());

// Синхронизация моделей с базой данных
sequelize.sync().then(() => {
  console.log("Database synced");
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (user) {
    const link = await LoginLink.create({
      user_id: user.id,
      token: Math.random().toString(36).substring(7),
    });

    const mailOptions = {
      from: '"Агенство недвижимости" <no-reply@estateagency.com>',
      to: user.email,
      subject: "Ссылка для входа",
      text: `Кликните на ссылку для входа: ${process.env.APP_URL}/login-link?link=${link.token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(mailOptions)
      if (error) {
        console.log(process.env.SMTP_USER)
        console.log(process.env.SMTP_PASS)
        // link.destroy();
        console.log(error)
        return res.status(500).json({ error: "Failed to send email" });
      }
      res.json({ message: "Login link sent to your email" });
    });
  } else {
    res.status(401).json({ error: "Invalid login or password" });
  }
});

app.get("/api/login/:link", async (req, res) => {
  const link = await LoginLink.findOne({
    where: { token: req.params.link },
  });
  if (link) {
    const user = await User.findByPk(link.user_id);
    await link.destroy();
    res.json(user);
  } else {
    res.status(401).json({ error: "Invalid login link" });
  }
});

// Роуты для User
app.get("/api/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

app.post("/api/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put("/api/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.update(req.body);
  res.json(user);
});

app.delete("/api/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json(user);
});

// Роуты для Owner
app.get("/api/owners", async (req, res) => {
  const owners = await Owner.findAll();
  res.json(owners);
});

app.get("/api/owners/:id", async (req, res) => {
  const owner = await Owner.findByPk(req.params.id);
  res.json(owner);
});

app.post("/api/owners", async (req, res) => {
  const owner = await Owner.create(req.body);
  res.json(owner);
});

// Роуты для Property
app.get("/api/properties", async (req, res) => {
  const properties = await Property.findAll();
  res.json(properties);
});

app.get("/api/properties/:id", async (req, res) => {
  const property = await Property.findByPk(req.params.id);
  res.json(property);
});

app.get("/api/properties/:id/photos", async (req, res) => {
  const property = await Property.findByPk(req.params.id);
  const photos = [];
  for (let id of property.photos) photos.push(await File.findByPk(id));
  res.json(photos);
});

app.post("/api/properties", upload.array("photos", 12), async (req, res) => {
  const property = await Property.create({
    ...req.body,
  });
  property.photos = [];
  for (let photo of req.files)
    property.photos = [
      ...property.photos,
      (await File.create({ data: photo.buffer, mime: photo.mimetype })).id,
    ];
  await property.save();
  res.json(property);
});

app.put("/api/properties/:id", async (req, res) => {
  const property = await Property.findByPk(req.params.id);
  await property.update(req.body);
  res.json(property);
});

// Роуты для Mark
app.get("/api/markups", async (req, res) => {
  const marks = await Markup.findAll();
  res.json(marks);
});

app.post("/api/markups", async (req, res) => {
  const mark = await Markup.create(req.body);
  res.json(mark);
});

// Роуты для Contract
app.get("/api/contracts", async (req, res) => {
  const contracts = await Contract.findAll();
  res.json(contracts);
});

app.post("/api/contracts", upload.single("file"), async (req, res) => {
  const contract = await Contract.create({
    property_id: req.body.property_id,
    staff_id: req.body.staff_id,
    file: req.file.buffer,
  });
  res.json(contract);
});

// Overview

app.get("/api/overview", async (req, res) => {
  const totalObjects = await Property.count();
  const totalUsers = await User.count();
  const totalSalaryResponce = await Property.findAll();
  const totalSalary = totalSalaryResponce.reduce((prev, item)=> prev = prev + item.price, 0)
  console.log(totalSalary)
  res.json({ totalObjects, totalUsers, totalSalary });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
