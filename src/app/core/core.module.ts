import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "../app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AuthService } from "../auth/auth.service";
import { RecipesService } from "../recipes/recipes.service";
import { DataStorageBackendService } from "../shared/data-storage-backend.service";
import { httpInterceptorProviders } from "../shared/http-interceptors/providers";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    RecipesService,
    DataStorageBackendService,
    AuthService,
    httpInterceptorProviders
  ]
})
export class CoreModule {}
