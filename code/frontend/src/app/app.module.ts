import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProdUserService, StubUserService, UserService } from './user.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: UserService,
      useFactory: (httpClient: HttpClient) => {
        if (environment.production) {
          return new ProdUserService(httpClient);
        }
        return new StubUserService();
      },
      deps: [HttpClient]
    }
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


