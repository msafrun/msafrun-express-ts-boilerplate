import { Document, model, Schema, Types } from 'mongoose';
import { MongoCollection } from '../../../constants/collection.constant';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  role: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: Schema.Types.ObjectId,
      ref: MongoCollection.ROLE,
      required: true,
    },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: MongoCollection.USER,
  },
);

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const userObj = this.toObject();

  delete userObj.password;
  delete userObj.__v;
  return userObj;
};

const User = model<IUser>(MongoCollection.USER, userSchema);
export default User;
