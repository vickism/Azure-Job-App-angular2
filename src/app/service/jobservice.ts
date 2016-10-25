import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JobService {
    private url: string = '/data/alljobs.txt';
    constructor(private http:Http) {
    }

    getJobs(): Observable<Object> {
        return this.http.get(this.url).map(this.extractData).catch(this.handleError);
      
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}