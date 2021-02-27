import app from './src/app';
import sequelize from './src/db/connect';

main();

async function main() {
  try {
    await sequelize.sync();

    app.listen('3001', () => {
      console.log('server started on port 3001');
    });
  } catch (err) {
    console.log(err);
  }
}
