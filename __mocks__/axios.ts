interface Axios { (): any; post: any; }

const axios = <Axios>function ({ url, method, data, headers }) {
  if (url !== 'https://payments/stubPath') {
    console.log(url)
    throw new Error('Invalid token')
  }
  if (headers.Authorization !== 'mockToken') {
    throw new Error('Invalid token')
  }
  return {
    catch: (_) => {}
  }
}

axios.post = (_, __) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        'token/jwt': 'mockToken'
      }
    })
  })
}

export default axios
