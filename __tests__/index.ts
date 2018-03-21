import { system } from "../src/system";
import { IComponents } from "../src/index";
import { HttpMethods } from "../src/components/http";


describe('http', () => {
    it('fetches', async () => {
        const components:IComponents = await system.start() as IComponents
        const response = await components.http.fetch({method: HttpMethods.get, url: 'www.google.com'})
        console.log(response)
    })
})
