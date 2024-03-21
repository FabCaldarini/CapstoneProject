import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderVerticalComponent } from './components/header-vertical/header-vertical.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderVerticalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient() // Abilita fetch per HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

