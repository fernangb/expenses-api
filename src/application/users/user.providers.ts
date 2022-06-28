import { TypeormUserModel } from 'src/infra/repositories/users/typeorm/typeorm-user.model';
import { Connection } from 'typeorm';

export const userProviders = [
  {
    inject: ['POSTGRES'],
    provide: ['USERS'],
    useFactory: async (connection: Connection) => {
      connection.getCustomRepository(TypeormUserModel);
    },
  },
];
