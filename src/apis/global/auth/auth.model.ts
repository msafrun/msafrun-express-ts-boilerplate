import { Document, model, Schema } from 'mongoose';
import { MongoCollection } from '../../../constants/collection.constant';
import { RoleName } from '../../../constants/role.constant';

export interface IRole extends Document {
  name: string;
  permissions: string[];
  created_at: Date;
  deleted_at: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: RoleName.USER,
    },
    permissions: [{ type: String, required: true }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: MongoCollection.ROLE,
  },
);

const Role = model<IRole>(MongoCollection.ROLE, roleSchema);
export default Role;
