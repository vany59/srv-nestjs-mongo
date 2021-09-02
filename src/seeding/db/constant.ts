import * as mongoose from 'mongoose';

const Privilege = [
  {
    _id: mongoose.Types.ObjectId('6130d0a536a03a14b0f46684'),
    type: 'PRIVILEGE',
    name: {
      vi: 'Xóa',
      en: 'Delete',
    },
  },
  {
    _id: mongoose.Types.ObjectId('6130d0a536a03a14b0f46683'),
    type: 'PRIVILEGE',
    name: {
      vi: 'Xem',
      en: 'View',
    },
  },
  {
    _id: mongoose.Types.ObjectId('6130d0a536a03a14b0f46682'),
    type: 'PRIVILEGE',
    name: {
      vi: 'Sửa',
      en: 'Update',
    },
  },
  {
    _id: mongoose.Types.ObjectId('6130d0a536a03a14b0f46681'),
    type: 'PRIVILEGE',
    name: {
      vi: 'Thêm',
      en: 'Create',
    },
  },
];

const Mission = [
  {
    _id: mongoose.Types.ObjectId('6130d0a536a03a14b0f46680'),
    type: 'MISSION',
    name: {
      vi: 'Vai trò',
      en: 'Role',
    },
  },
];

export const Constant = [...Privilege, ...Mission];
