import { registerDecorator, ValidationOptions } from 'class-validator';
import moment from 'moment';
export function IsOnlyDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: ` must be a valid date (Required format: YYYY-MM-DD)`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          if (typeof value === 'string') {
            return /^[1-9]\d*-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value) && moment(value, 'YYYY-MM-DD').isValid();
          }
          return false;
        },
      },
    });
  };
}
