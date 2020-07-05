import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {TooltipDirective} from './directives/tooltip.directive';
import {RouterModule, Routes} from '@angular/router';
import {DemoComponentComponent} from './demo-component/demo-component.component';

const appRoutes: Routes = [
  {path: '', component: DemoComponentComponent},
  {path: '**', component: DemoComponentComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    DemoComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
