import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  @ViewChild("f") signupForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(): void {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.authService.signupUser(email, password);
  }

}
