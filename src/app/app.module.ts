import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import localeJa from '@angular/common/locales/ja';
import { registerLocaleData, DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainShellComponent } from './main-shell/main-shell.component';
import { OtherShellComponent } from './other-shell/other-shell.component';
import { WelcomeShellComponent } from './welcome-shell/welcome-shell.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RecipeThumbnailComponent } from './dialogs/recipe-thumbnail/recipe-thumbnail.component';
import { RecipeProcessImageComponent } from './dialogs/recipe-process-image/recipe-process-image.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { NgAisModule } from 'angular-instantsearch';
import { ConfirmRecipeComponent } from './dialogs/confirm-recipe/confirm-recipe.component';

registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolbarComponent,
    MainShellComponent,
    OtherShellComponent,
    WelcomeShellComponent,
    RecipeThumbnailComponent,
    RecipeProcessImageComponent,
    DeleteDialogComponent,
    ConfirmRecipeComponent,
  ],
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
    ImageCropperModule,
    MatDialogModule,
    NgAisModule.forRoot(),
  ],
  providers: [
    DatePipe,
    {
      provide: LOCALE_ID,
      useValue: 'ja-JP',
    },
    {
      provide: REGION,
      useValue: 'asia-northeast1',
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RecipeThumbnailComponent,
    RecipeProcessImageComponent,
    DeleteDialogComponent,
    ConfirmRecipeComponent,
  ],
})
export class AppModule {}
