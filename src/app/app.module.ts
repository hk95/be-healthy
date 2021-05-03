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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import localeJa from '@angular/common/locales/ja';
import { registerLocaleData, DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainShellComponent } from './main-shell/main-shell.component';
import { OtherShellComponent } from './other-shell/other-shell.component';
import { WelcomeShellComponent } from './welcome-shell/welcome-shell.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RecipeThumbnailComponent } from './dialogs/recipe-thumbnail/recipe-thumbnail.component';
import { RecipeProcessImageComponent } from './dialogs/recipe-process-image/recipe-process-image.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
// import { NgAisModule } from 'angular-instantsearch';
import { ConfirmRecipeComponent } from './dialogs/confirm-recipe/confirm-recipe.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CreditCardComponent } from './dialogs/credit-card/credit-card.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { AvatarComponent } from './dialogs/avatar/avatar.component';
import { TutorialComponent } from './dialogs/tutorial/tutorial.component';
import { MealInputComponent } from './bottom-sheet/meal-input/meal-input.component';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeJa);
FullCalendarModule.registerPlugins([dayGridPlugin]);
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
    NotFoundComponent,
    CreditCardComponent,
    ConfirmDialogComponent,
    AvatarComponent,
    TutorialComponent,
    MealInputComponent,
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
    MatSidenavModule,
    MatMenuModule,
    FullCalendarModule,
    ImageCropperModule,
    MatDialogModule,
    // NgAisModule.forRoot(),
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    SharedModule,
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
