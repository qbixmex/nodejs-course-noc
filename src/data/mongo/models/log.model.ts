import mongoose from "mongoose";

export interface ILog {
  message: string;
  origin: string;
  level?: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const LogSchema = new mongoose.Schema<ILog>({
  message: {
    type: String,
    required: true,
  },

  origin: {
    type: String,
    default: 'unknown',
  },

  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Log', LogSchema);