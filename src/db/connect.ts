import { Sequelize } from 'sequelize/types';

import './associations';
import sequelize from './sequelize';

async function connectDatabase(): Promise<Sequelize> {
  return sequelize.sync();
}

export default connectDatabase;
