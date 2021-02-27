import config from 'config';

import app from './src/app';
import connectDatabase from './src/db/connect';

const port: string = config.get('port');

main();

async function main() {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`server started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
