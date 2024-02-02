import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule, IMAGE_CONFIG, NgOptimizedImage} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";
import {RandomImgGenComponent} from "./random-img-gen/random-img-gen.component";


@Component({

  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgOptimizedImage,
    NavbarComponent,
    RandomImgGenComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = "routing-app";

  ngOnInit() {

  }
}
