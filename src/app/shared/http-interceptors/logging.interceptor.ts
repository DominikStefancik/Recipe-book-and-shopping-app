import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from  "rxjs/Observable";
import "rxjs/add/operator/do";

export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // we don't want to 'consume' the observable, we just want to sent a new observable
    // with the content of the previous observable
    return next.handle(request).do((event: HttpEvent<any>) => {
      // we log any event the request gives us back
      console.log("LOG: ", event);
    });
  }
}
