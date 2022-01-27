import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamName } from '../erros/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest?.body?.name) {
      return {
        statusCode: 400,
        body: new MissingParamName('name')
      }
    }

    if (!httpRequest?.body?.email) {
      return {
        statusCode: 400,
        body: new MissingParamName('email')
      }
    }
  }
}
