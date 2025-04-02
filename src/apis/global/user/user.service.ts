import { Request } from 'express';
import { CreateUserSchema, DeleteUserSchema } from './user.dto';
import Role from '../auth/auth.model';
import { httpError, httpStatus } from '../../../utils/http.util';
import User, { IUser } from './user.model';
import { IResponse, responseJson } from '../../../utils/response.util';
import { MongoCollection } from '../../../constants/collection.constant';

const createUser = async (req: Request): Promise<IResponse> => {
  const body: CreateUserSchema = req.body;

  const getRole = await Role.findOne({
    name: body.role,
  });

  if (!getRole) throw httpError.NotFound('Role not found!');

  const generatePayload = {
    ...body,
    role: getRole.id,
  };

  const createUser = new User(generatePayload);
  const createdUser = await createUser.save();

  return responseJson(createdUser, httpStatus.CREATED);
};

const getDetailUser = async (req: Request): Promise<IResponse> => {
  const { user_id } = req.params;

  const getUser = await User.findById(user_id).populate('role');

  if (!getUser) throw httpError.NotFound('User not found!');

  return responseJson(getUser);
};

const getListUser = async (req: Request): Promise<IResponse> => {
  const { offset = 0, limit = 10, search = null, sort = 'desc' } = req.query;

  const offsetNumber = Number(offset);
  const limitNumber = Number(limit);

  let obj: any = {};

  if (search)
    obj.$or = [
      { fullname: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];

  const aggregation: any[] = [
    { $match: obj },
    {
      $lookup: {
        from: MongoCollection.ROLE,
        localField: 'role',
        foreignField: '_id',
        as: 'role_detail',
      },
    },
    {
      $unwind: { path: '$role_detail', preserveNullAndEmptyArrays: true },
    },
    {
      $sort: { created_at: sort === 'asc' ? 1 : -1 },
    },
    {
      $skip: offsetNumber,
    },
    {
      $limit: limitNumber,
    },
    {
      $facet: {
        data: [
          { $match: obj },
          { $skip: offsetNumber },
          { $limit: limitNumber },
          {
            $lookup: {
              from: MongoCollection.ROLE,
              localField: 'role',
              foreignField: '_id',
              as: 'role_detail',
            },
          },
          {
            $unwind: { path: '$role_detail', preserveNullAndEmptyArrays: true },
          },
        ],
        totalCount: [{ $match: obj }, { $count: 'total' }],
      },
    },
  ];

  const result = await User.aggregate(aggregation);

  const listUser = result[0]?.data || [];
  const totalCount = result[0]?.totalCount[0]?.total || 0;

  return responseJson(listUser, undefined, undefined, {
    limit: limitNumber,
    offset: offsetNumber,
    total_data: totalCount,
  });
};

const updateUser = async (req: Request): Promise<IResponse> => {
  const { user_id } = req.params;
  const body = req.body;

  const getUser = await User.findById(user_id);

  if (!getUser) throw httpError.NotFound('User not found!');

  const user = getUser as IUser;

  Object.keys(body).forEach((key) => {
    if (key in user) {
      (user as any)[key] = body[key];
    }
  });

  const updatedUserData = await user.save();
  return responseJson(updatedUserData);
};

const deleteUser = async (req: Request): Promise<IResponse> => {
  const { user_id } = req.params;
  const body: DeleteUserSchema = req.body;

  const getUser = await User.findById(user_id);

  if (!getUser) throw httpError.NotFound('User not found!');

  if (body.soft_delete) {
    await getUser.updateOne({ deleted_at: new Date() });
  } else {
    await getUser.deleteOne();
  }

  return responseJson({ id: getUser.id });
};

export { createUser, getDetailUser, getListUser, updateUser, deleteUser };
