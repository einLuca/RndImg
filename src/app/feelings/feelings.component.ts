import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-feelings',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './feelings.component.html',
  styleUrl: './feelings.component.css'
})
export class FeelingsComponent implements OnInit {
  @Input() feeling!: string;
  imageUrls: string[] = []



  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.feeling = params['id'];
      console.log(this.feeling)
    });
    let windowSize = "1920x1080"
    const randomUrl = "https://source.unsplash.com/random/" + windowSize + '?' + this.feeling

    for (let i = this.imageUrls.length; i < (this.imageUrls.length+28); i++) {
      this.httpClient.get(randomUrl).subscribe(
        {
          next: (result: any) => console.log(result),
          error: (result: { url: string; }) => {
            this.imageUrls[i] = result.url

          }
        }
      )
    }
  }

  newImg() {
    let windowSize = "1920x1080"
    const randomUrl = "https://source.unsplash.com/random/" + windowSize + '?' + this.feeling

    for (let i = this.imageUrls.length; i < (this.imageUrls.length+8); i++) {
      this.httpClient.get(randomUrl).subscribe(
        {
          next: (result: any) => console.log(result),
          error: (result: { url: string; }) => {
            this.imageUrls[i] = result.url

          }
        }
      )
    }
  }

  onClick(selectedImageUrl: string) {
    window.open(selectedImageUrl, "_blank");
//    this.router.navigate(['/'], { queryParams: { selectedImageUrl } });
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Check if the user has scrolled to the bottom of the window
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.scrollY;

    if (windowBottom >= docHeight) {
      // You have scrolled to the bottom
      this.newImg();
    }
  }

  protected readonly window = window;
}

