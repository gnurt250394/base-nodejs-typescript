import { BaseFormatter } from './BaseFormatter';

export interface IProvinceModel {
  _id?: string;
  id?: string;
  name?: string;
  id_city?: string;
  type?: string;
}

export class ProvinceFormatter extends BaseFormatter implements IProvinceModel {
  name = undefined;
  id_city = undefined;
  type = undefined;
  constructor(args: any) {
    super();
    this.format(args);
  }
}
