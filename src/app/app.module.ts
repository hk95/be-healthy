import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import localeJa from '@angular/common/locales/ja';
import { registerLocaleData, DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FullCalendarModule } from '@fullcalendar/angular';

registerLocaleData(localeJa);

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    FullCalendarModule,
  ],
  providers: [
    DatePipe,
    {
      provide: LOCALE_ID,
      useValue: 'ja-JP',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
