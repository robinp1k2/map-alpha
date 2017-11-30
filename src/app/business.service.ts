import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { CMember } from './cMember';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class BusinessService {
  constructor(private http: HttpClient){}

  private directoryUrl = 'api/businesses'; 

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      //need to add message service:
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** GET businesses from the server */
  getBusinesses(): Observable<CMember[]> {
    return this.http.get<CMember[]>(this.directoryUrl)
      .pipe(
        //need to add message service:  
        //tap(bizRecords => this.log(`Fetched ` + Object.keys(bizRecords).length + ` businesses from `+ this.directoryUrl)),
        catchError(this.handleError('getBusinesses', []))
      );
  }

  /** GET business by id. Will 404 if id not found */
  getOneBusiness(id: number): Observable<CMember> {
  const url = `${this.directoryUrl}/${id}`;
  return this.http.get<CMember>(url).pipe(
    //need messages service
    //tap(_ => this.log(`fetched business id=${id}`)),
    catchError(this.handleError<CMember>(`getOneBusiness id=${id}`))
  );
}
}
