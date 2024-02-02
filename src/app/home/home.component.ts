import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {FeelingsComponent} from "../feelings/feelings.component";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalService} from "../local.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FeelingsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  feelingForm = new FormControl('')
  selectedImageUrl: string[] = new Array(4)


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStore: LocalService
  ) {
  }

  ngOnInit() {

    const selectedImageUrl = this.localStore.getData('selectedImageUrl')
    if (selectedImageUrl) {
      this.selectedImageUrl = JSON.parse(selectedImageUrl)
    }

    this.route.queryParams.subscribe(params => {
      const newSelectedImageUrl = params['selectedImageUrl'];
      if (newSelectedImageUrl && !this.selectedImageUrl.includes(newSelectedImageUrl)) {
        this.selectedImageUrl.unshift(params['selectedImageUrl'])
        this.selectedImageUrl = this.selectedImageUrl.slice(0, 4)
        this.localStore.saveData("selectedImageUrl", JSON.stringify(this.selectedImageUrl))
      }
    })

  }

  onClick() {
    if (this.feelingForm.value) {
      this.router.navigate(['/feelings', this.feelingForm.value]);
    }
  }

  protected readonly window = window;
}
