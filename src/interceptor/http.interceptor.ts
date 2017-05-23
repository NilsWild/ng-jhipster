/*
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://jhipster.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { Observable } from 'rxjs/Observable';
import { Response, RequestOptionsArgs } from '@angular/http';

/**
 * A HTTP interceptor responsibility chain member is a class, which may react on request and response of all requests
 * done by HTTP.
 */
export abstract class HttpInterceptor {
    private _successor: HttpInterceptor = null;

    set successor(successor: HttpInterceptor) {
        this._successor = successor;
    }

    processRequestInterception(options?: RequestOptionsArgs): RequestOptionsArgs {
        return (!this._successor) ? this.requestIntercept(options) :
            this._successor.processRequestInterception(this.requestIntercept(options));
    }

    processResponseInterception(response: Observable<Response>): Observable<Response> {
        return (!this._successor) ? this.responseIntercept(response) :
            this._successor.processResponseInterception(this.responseIntercept(response));
    }

    abstract requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs;

    abstract responseIntercept(observable: Observable<Response>): Observable<Response>;

}
