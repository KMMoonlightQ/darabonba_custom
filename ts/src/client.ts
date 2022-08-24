// This file is auto-generated, don't edit it
import Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';

export class RuntimeOptions extends $tea.Model {
  autoretry: boolean;
  ignoreSSL: boolean;
  maxAttempts: number;
  static names(): { [key: string]: string } {
    return {
      autoretry: 'autoretry',
      ignoreSSL: 'ignoreSSL',
      maxAttempts: 'maxAttempts',
    };
  }

  static types(): { [key: string]: any } {
    return {
      autoretry: 'boolean',
      ignoreSSL: 'boolean',
      maxAttempts: 'number',
    };
  }

  constructor(map?: { [key: string]: any }) {
    super(map);
  }
}

export class UserRequest extends $tea.Model {
  name: string;
  static names(): { [key: string]: string } {
    return {
      name: 'name',
    };
  }

  static types(): { [key: string]: any } {
    return {
      name: 'string',
    };
  }

  constructor(map?: { [key: string]: any }) {
    super(map);
  }
}

export class UserResponse extends $tea.Model {
  origin: string;
  url: string;
  static names(): { [key: string]: string } {
    return {
      origin: 'origin',
      url: 'url',
    };
  }

  static types(): { [key: string]: any } {
    return {
      origin: 'string',
      url: 'string',
    };
  }

  constructor(map?: { [key: string]: any }) {
    super(map);
  }
}


export default class Client {
  _endpoint: string;
  _protocol: string;

  constructor(endpoint: string, protocol: string) {
    this._endpoint = endpoint;
    this._protocol = protocol;
  }

  async getUser(request: UserRequest, runtime: RuntimeOptions): Promise<UserResponse> {
    let _runtime: { [key: string]: any } = {
      // 描述运行时参数
      timeouted: "retry",
      retry: {
        retryable: runtime.autoretry,
        maxAttempts: runtime.maxAttempts,
      },
      ignoreSSL: runtime.ignoreSSL,
    }

    let _lastRequest = null;
    let _now = Date.now();
    let _retryTimes = 0;
    while ($tea.allowRetry(_runtime['retry'], _retryTimes, _now)) {
      if (_retryTimes > 0) {
        let _backoffTime = $tea.getBackoffTime(_runtime['backoff'], _retryTimes);
        if (_backoffTime > 0) {
          await $tea.sleep(_backoffTime);
        }
      }

      _retryTimes = _retryTimes + 1;
      try {
        let request_ = new $tea.Request();
        // 描述请求相关信息
        request_.protocol = this._protocol;
        request_.method = "GET";
        request_.pathname = `/get`;
        request_.headers = {
          host: this._endpoint,
          'content-type': "application/json",
        };
        request_.query = {
          name: request.name,
        };
        _lastRequest = request_;
        let response_ = await $tea.doAction(request_, _runtime);

        // 描述返回相关信息
        if (!Util.equalNumber(response_.statusCode, 200)) {
          throw $tea.newError({
            message: `Reqeust Failed!`,
            code: `${response_.statusCode}`,
          });
        }

        let result = Util.assertAsMap(await Util.readAsJSON(response_.body));
        return $tea.cast<UserResponse>({
          ...result,
        }, new UserResponse({}));
      } catch (ex) {
        if ($tea.isRetryable(ex)) {
          continue;
        }
        throw ex;
      }
    }

    throw $tea.newUnretryableError(_lastRequest);
  }


}
