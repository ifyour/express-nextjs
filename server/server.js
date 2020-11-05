const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');

const app = express();
dotenv.config();

const port = Number(process.env.PORT || 5000);
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use(`/api/v1/users`, userRouter);
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint not found');
  next(err);
})

app.use(express.static(path.join(__dirname, '../client/public')))
app.use('/_next', express.static(path.join(__dirname, '../client/out/_next')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/out/index.html'));
});

app.use(errorMiddleware);
app.listen(port, () => console.log(`🚀 Server running at port ${port}`));

module.exports = app;
