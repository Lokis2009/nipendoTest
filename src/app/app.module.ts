import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';


import { AppComponent } from './app.component';
import { TooltipDirective } from './directives/tooltip.directive';


@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
