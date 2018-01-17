import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class websocketService {
  ws: WebSocket;
  constructor() {}
  createObservableWebsocket(url:string):Observable<any>{  // 返回一个可观测的流
    this.ws = new WebSocket(url);  // 连接到服务器
    return new Observable(observer => {  // 做三件事，流 成功，失败，结束
      this.ws.onmessage = event => observer.next(event.data);
      this.ws.onerror = event => observer.error(event);
      this.ws.close = event => observer.complete();
    })
  }

  sendMessageServer(message:string){
    this.ws.send(message);
  }
}
