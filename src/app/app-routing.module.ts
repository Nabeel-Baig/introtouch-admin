import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { LayoutComponent } from "./layouts/layout.component";
import { Page404Component } from "./extrapages/page404/page404.component";
import { LoginGuard } from "./core/guards/login.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canActivate: [LoginGuard],
  },
  // tslint:disable-next-line: max-line-length
  {
    path: "",
    component: LayoutComponent,
    loadChildren: () =>
      import("./platform/pages.module").then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./extrapages/extrapages.module").then((m) => m.ExtrapagesModule),
    canActivate: [AuthGuard],
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
