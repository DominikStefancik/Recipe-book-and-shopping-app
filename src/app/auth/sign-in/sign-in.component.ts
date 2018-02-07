import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  @ViewChild("f") signinForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(): void {
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;

    this.authService.signinUser(email, password);
  }
}
