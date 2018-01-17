import {Component, OnInit} from '@angular/core';
import {websocketService} from "../share/websocket.service";


@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class websocketComponent implements OnInit {
  private random: number;

  constructor(private wsServer: websocketService) {
  }

  ngOnInit() {
    this.wsServer.createObservableWebsocket("ws://localhost:8900")
      .subscribe(
        data => this.random = data,
        err => console.log(err),
        () => console.log('流已经结束')
      )
  }

  sendServerMes() {
    this.wsServer.sendMessageServer('hello client');
  }
}
