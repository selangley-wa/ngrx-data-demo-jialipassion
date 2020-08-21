import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EntityDataModule, DefaultDataServiceConfig, HttpUrlGenerator, EntityDataService, PersistenceResultHandler, EntityCollectionReducerMethodsFactory } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { ContainerInMemDataService } from './mock-web-api';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CustomizeHttpUrlGenerator, CustomizeDataService, PagePersistenceResultHandler, EntityCollectionPageReducerMethodsFactory } from './customize-data';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ContainersComponent } from './containers/containers.component';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'api',
  timeout: 3000, // request timeout
}

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig), HttpClientInMemoryWebApiModule.forRoot(ContainerInMemDataService, { delay: 1000 }), StoreDevtoolsModule.instrument() ],
  providers: [
    { 
      provide: DefaultDataServiceConfig, 
      useValue: defaultDataServiceConfig
    },
    {
      provide: HttpUrlGenerator,
      useClass: CustomizeHttpUrlGenerator
    },
    { provide: PersistenceResultHandler, useClass: PagePersistenceResultHandler },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: EntityCollectionPageReducerMethodsFactory
    },
    CustomizeDataService
  ],
  declarations: [ AppComponent, HelloComponent, ContainersComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
  constructor(
    entityDataService: EntityDataService,
    private customizeDataService: CustomizeDataService
    ) {
    entityDataService.registerService('Container', customizeDataService);
  }
}
