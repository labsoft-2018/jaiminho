import * as express from 'express'

export const newService = async (routes, {
  config,
}) => {
  const app = express();

  app.use((req, res, next) => {
    req.components = {
      config,
    }
    next()
  })

  app.use('/', routes);

  return new Promise((resolve, reject) => {
    console.log(`new service`)
    const server = app.listen(config.service.port, (err) => {
      if (err) {
        console.log('ERROR:')
        console.error(err)
        reject(err)
        return
      }
      console.log(`Server is running on http://localhost:${config.service.port}/graphql`)
      resolve(server)
    });
  })
}
