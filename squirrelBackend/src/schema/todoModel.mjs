import mongoose from 'mongoose';
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// JSON schema for 
var TodoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: 'Kindly enter the title',
  },
  detail: {
    type: String,
    required: 'Kindly enter the detail'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Todo', TodoSchema);