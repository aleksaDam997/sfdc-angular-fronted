import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { TrainNeuralNetworkComponent } from './train-neural-network/train-neural-network.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", component: BodyComponent},
  {path: "train/:catId", component: TrainNeuralNetworkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
