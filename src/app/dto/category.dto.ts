import { Data } from './data.dto';

export interface Category {
    categoryId: number;
    name: string;
    excerpt: string;
    value1: string;
    value2: string;
    value3: string;
    value4: string;
    value5: string;
    value6: string;
    value7: string;
    data: Data[];
  }