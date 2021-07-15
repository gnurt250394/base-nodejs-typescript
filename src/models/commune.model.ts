import { BaseFormatter } from './BaseFormatter';

export interface ICommuneModel {
  _id?: string;
  id?: string;
  name?: string;
  id_district?: string;
  id_commune?: string;
  type?: string;
}

export class CommuneFormatter extends BaseFormatter implements ICommuneModel {
  name = undefined;
  id_commune = undefined;
  id_district = undefined;
  type = undefined;
  constructor(args: any) {
    super();
    this.format(args);
  }
}
