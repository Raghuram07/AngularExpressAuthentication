import { TokenInterceptorService } from './services/token-interceptor.service';
import { EventService } from './services/event.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegularEventsComponent } from './Events/regular-events/regular-events.component';
import { SpecialEventsComponent } from './Events/special-events/special-events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

//Ngxs
import { NgxsModule } from '@ngxs/store';
//Ngxs logger plugins
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
//Ngxs Dev Tools plugins
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import {SocialAuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,SocialLoginModule
} from 'angularx-social-login';
import { UserDetailComponent } from './Events/user-detail/user-detail.component';
import { RegularEventsState } from './store/state/users.states';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './reusable-components/notification/notification.component';
import { NotificationService } from './services/notification.service';
import { NotesComponent } from './reusable-components/notes/notes.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RegularEventsComponent,
    SpecialEventsComponent,
    UserDetailComponent,
    NotificationComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule, 
    MatSnackBarModule,
    //Ngxs
    NgxsModule.forRoot([RegularEventsState]),
    //Ngxs logger plugins
    NgxsLoggerPluginModule.forRoot(), 
    NgxsReduxDevtoolsPluginModule.forRoot(), BrowserAnimationsModule,
  ],
  providers: [AuthService,EventService,NotificationService,
  {
   provide:HTTP_INTERCEPTORS,useClass: TokenInterceptorService,multi:true
 },
 {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '748490838001-jhij0iprrvpd293fs4rt3pg37hijgj1t.apps.googleusercontent.com'
          )
        }   
      ]
    } as SocialAuthServiceConfig,
 }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
