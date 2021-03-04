- create a file `/config/development.json` by copying the content from `/config/development-sample.json` and update the content accordingly. As the sql dialect is postgres, you will need to have a postgres database connected to use this application.

- run `yarn` to install the dependencies

- then, run `yarn db:migrate:dev`

- then, run `yarn db:seed:dev`

- finally, run `yarn dev` to start the server

## Testing account

email: test@test.com

password: password
