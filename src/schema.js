import mongoose from 'mongoose';

const AppSchema = new mongoose.Schema(
  {
    isSuccess: Boolean,
    response: mongoose.Schema.Types.Mixed,
    userName: String,
    routeName: String,
    env: String,
  },
  {
    timestamps: true,
  }
);

const AppModel = mongoose.model('AppModel', AppSchema);

export default AppModel;
