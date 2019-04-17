import {EnumValue} from '@angular/compiler-cli/src/ngtsc/metadata';

export class User {
  constructor(
    public id: number = 0,
    public username: string = '',
    public password: string = '',
    public email: string = '',
    // public role: Role = Role.ROLE_USER
  ) {}
}
