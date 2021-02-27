import { Sequelize, Options } from 'sequelize';
import config from 'config';

const databaseConfig = config.get('database') as Options;

export default new Sequelize(databaseConfig);
