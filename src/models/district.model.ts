import { BaseFormatter } from './BaseFormatter';

export interface IDistrictModel {
  _id?: string;
  id?: string;
  name?: string;
  id_district?: string;
  id_city?: string;
  type?: string;
}

export class DistrictFormatter extends BaseFormatter implements IDistrictModel {
  name = undefined;
  id_city = undefined;
  id_district = undefined;
  type = undefined;
  constructor(args: any) {
    super();
    this.format(args);
  }
}
