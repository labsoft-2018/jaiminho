import { newConfig, ENV } from './config';
import { newService } from './service';
import { routes } from './routes';

const main = async () => {
  const config = newConfig(ENV.dev)
  const service = await newService(routes, { config })
}

main()
.catch((err) => {
  console.log(`error:`)
  console.log(err)
})
