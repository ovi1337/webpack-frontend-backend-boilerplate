import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { SymbolService } from './service/symbol.service';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
    ],
    declarations: [],
    providers: [
      SymbolService,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [
        MaterialModule,
    ],
})
export class SharedModule { }