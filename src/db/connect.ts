import { Sequelize, Options } from 'sequelize';
import config from 'config';

const databaseConfig = config.get('database') as Options;

const sequelize = new Sequelize(databaseConfig);

export default sequelize;
