import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalService} from "../local.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-random-img-gen',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './random-img-gen.component.html',
  styleUrl: './random-img-gen.component.css'
})




export class RandomImgGenComponent implements OnInit{
  topic = "";
  url = ""
  topicImg = new FormControl('')
  resolution = new FormControl('')

  savedImageUrls: string[] = new Array(3)


  ngOnInit(): void {

    // this.localStore.clearData()
    const savedUrls = this.localStore.getData('savedImageUrls')
    if (savedUrls) {
      this.savedImageUrls = JSON.parse(savedUrls)
    }
    console.log(savedUrls)
  }

  constructor(private httpClient: HttpClient, private localStore: LocalService) {
    console.log(this.url)
    this.newImg()
  }


  newImg() {
    let windowSize = window.innerWidth + "x" + (window.innerHeight - 90)
    windowSize = "1920x1080"
    const resValue = this.resolution.value;
    if (resValue && /^\d+x\d+$/.test(resValue)) {
      windowSize = resValue
    }
    const randomUrl = "https://source.unsplash.com/random/" + windowSize + '?' + this.topic

    this.httpClient.get(randomUrl).subscribe(
      {
        next: (result) => console.log(result),
        error: (result) => {
          this.url = result.url
          console.log(result)
          this.savedImageUrls.unshift(this.url)
          this.savedImageUrls = this.savedImageUrls.slice(0, 4)
          this.localStore.saveData("savedImageUrls", JSON.stringify(this.savedImageUrls))
        }
      }
    )
  }
  newTopic() {
    const topicValue = this.topicImg.value;
    if (topicValue !== null) {
      this.topic = topicValue
    }
  }

  protected readonly window = window;
}
