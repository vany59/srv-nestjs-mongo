import {
  PAGE,
  LIMIT,
  DESC,
  ASC,
  NE,
  LT,
  LTE,
  EQ,
  GT,
  GTE,
  LIKE,
  IN,
  NIN,
  RANGE_DATE,
  RANGE_NUMBER,
} from './enum';

interface KeyValue {
  key: string;
  value: any;
  operator?: string;
}

interface FilterParams {
  data?: Object;
  language?: string;
  page?: number;
  limit?: number;
  sorts?: KeyValue[];
  filters?: KeyValue[];
}

export const filter = ({
  data = {},
  page = PAGE,
  limit = LIMIT,
  sorts = [],
  filters = [],
}: FilterParams) => {
  const body = {
    data,
    page,
    limit,
    sorts,
    filters,
    skip: null,
    sort: null,
    query: null,
  };
  body.data = { ...body.data };
  body.skip = (body.page - 1) * body.limit;
  body.sort = {};
  for (const i in body.sorts) {
    const { key, value = DESC } = { ...body.sorts[i] };
    body.sort[key] =
      [ASC, '1'].indexOf(value.toString().toUpperCase()) >= 0 ? 1 : -1;
  }
  body.sort = body.sort.createdAt ? body.sort : { ...body.sort, createdAt: -1 };
  body.query = { $and: [{ isDeleted: { $ne: true } }] };
  for (const i in body.filters) {
    const { key, value, operator = EQ } = { ...body.filters[i] };
    if (key == 'search') {
      body.query.$and.push({ $text: { $search: value } });
      continue;
    }
    switch (operator.toString().toLowerCase()) {
      case NE:
        body.query.$and.push({ [key]: { $ne: value } });
        break;
      case LT:
        body.query.$and.push({ [key]: { $lt: value } });
        break;
      case GT:
        body.query.$and.push({ [key]: { $gt: value } });
        break;
      case LTE:
        body.query.$and.push({ [key]: { $lte: value } });
        break;
      case GTE:
        body.query.$and.push({ [key]: { $gte: value } });
        break;
      case LIKE:
        body.query.$and.push({ [key]: new RegExp(value, 'i') });
        break;
      case IN:
        body.query.$and.push({
          [key]: {
            $in: Array.isArray(value) ? value : value ? value.split(',') : [],
          },
        });
        break;
      case NIN:
        body.query.$and.push({
          [key]: {
            $nin: Array.isArray(value) ? value : value ? value.split(',') : [],
          },
        });
        break;
      case RANGE_NUMBER:
        body.query.$and.push({
          [key]: { $gte: Number(value[0]), $lte: Number(value[1]) },
        });
        break;
      case RANGE_DATE:
        body.query.$and.push({
          [key]: {
            $gte: new Date(Number(value[0])),
            $lte: new Date(Number(value[1])),
          },
        });
        break;
      default:
        body.query.$and.push({ [key]: value });
    }
  }
  delete body.sorts;
  delete body.filters;
  return body;
};
