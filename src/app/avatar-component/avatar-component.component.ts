import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../Models/Restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {RestaurantControllerService} from '../ControllerServices/restaurant-controller.service';
import {HttpHeaders} from '@angular/common/http';
import {Avatar} from '../Models/Avatar';



// @ts-ignore
@Component({
  selector: 'app-avatar-component',
  templateUrl: './avatar-component.component.html',
  styleUrls: ['./avatar-component.component.css']
})

export class AvatarComponentComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private router: Router) { }

  restaurant: Restaurant = new Restaurant();
  images: File [] = [];
  headersOption: HttpHeaders;
  avatars: Avatar [] = [];
  imageToLoad: File = null;
  responseOnSaveAvatar = '';
  showListOfAvatars = false;
  showFormAddAvatar = true;
  responseOnDelete = '';


//   htmlTemplate = `
// <h1>Angular Tutorials on Roufid.com</h1>
// <strong><a href="javascript:alert('safe html')">Hello world !</a></strong>`;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
  }

  backToAccount() {
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }

  saveAvatar() {

    console.log('this.image.name: ' + this.imageToLoad.name);
    const formData: FormData = new FormData();
    formData.append('file', this.imageToLoad);
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.restaurantControllerService.saveAvatar(this.restaurant.id, formData, this.headersOption).
    subscribe(data => {this.responseOnSaveAvatar = data.text; },
      error1 => this.responseOnSaveAvatar = 'Failed to save!');
  }

  getListOfAvatars(restaurant: Restaurant) {
    this.showListOfAvatars = true;
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});

    // this.mainControllerService.getFiles(this.restaurant, this.headersOption).
    // subscribe(images  => {this.images = images; },
    //   error1 => {console.log('Failed to load avatar-list');
    //   });

    this.mainControllerService.getAvatars(this.restaurant, this.headersOption).
      subscribe(avatars => this.avatars = avatars);

    // this.mainControllerService.getImages(this.restaurant, this.headersOption).
    //   subscribe((data: any[] ) => {
    //   for (const d of data) {
    //     const file = this.sanitizer.bypassSecurityTrustUrl(this.imageType + d.content);
    //     this.avatars.push(<File>file);
    //   }
  }

  delete(avatar: Avatar) {
    console.log(avatar.id);
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.restaurantControllerService.deleteAvatar(avatar.id, this.headersOption).
    subscribe(data => {console.log(data); },
      error1 => {console.log(error1); });
  }

  handleFileInput(files: FileList) {
    this.imageToLoad = files.item(0);
  }
}
