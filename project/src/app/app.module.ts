import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import {HttpModule} from "@angular/http";
import { websocketComponent } from './web-socket/web-socket.component';
import {websocketService} from "./share/websocket.service";


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    websocketComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [websocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
