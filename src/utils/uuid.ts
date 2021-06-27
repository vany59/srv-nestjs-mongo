import { v4 } from 'uuid';

export const uuid = () => {
  const id = v4();
  return id.toString().split('-').join('');
};
