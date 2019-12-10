import express from 'express';
import mongoose from 'mongoose';
import parseFilter from 'mongoose-jsonapi-filter';
import AppModel from './schema';

const app = express();

app.use(express.json());

const connectDb = () =>
  mongoose.connect('mongodb://localhost:27017/kapal-debugger', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

connectDb().then(() => {
  app.listen(3600, () => {
    console.log('server is running in port 3600');
  });

  app.post('/post-item', async (req, res) => {
    const { body } = req;
    const item = await AppModel.create(body);
    res.json({
      message: 'success',
      data: item,
    });
  });

  app.get('/getItem', async (req, res) => {
    const { filter } = req.query;
    const parsedFilter = parseFilter(filter);
    const items = await AppModel.find(parsedFilter).limit(150);
    res.json({
      message: 'success',
      data: items,
    });
  });

  app.get('/getRouteList', async (req, res) => {
    const routeList = await AppModel.distinct('routeName');
    res.json({
      message: 'success',
      data: routeList,
    });
  });
});
