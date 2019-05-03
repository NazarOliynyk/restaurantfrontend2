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

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
  }

  backToAccount() {
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }

  saveAvatar() {

    console.log('this.image.name: ' + this.imageToLoad.name);
    const formData: FormData = new FormData();
    formData.append('file', this.imageToLoad);
    this.restaurantControllerService.saveAvatar(this.restaurant.id, formData, this.headersOption).
    subscribe(data => {this.responseOnSaveAvatar = data.text; },
      error1 => this.responseOnSaveAvatar = 'Failed to save!');
  }

  getListOfAvatars(restaurant: Restaurant) {
    this.showListOfAvatars = true;
    this.restaurant = restaurant;
    this.mainControllerService.getAvatars(this.restaurant, this.headersOption).
      subscribe(avatars => {this.avatars = avatars;
      console.log('this.avatars.length: ' + this.avatars.length); });

    // this.mainControllerService.getImages(this.restaurant, this.headersOption).
    //   subscribe((data: any[] ) => {
    //   for (const d of data) {
    //     const file = this.sanitizer.bypassSecurityTrustUrl(this.imageType + d.content);
    //     this.avatars.push(<File>file);
    //   }
  }

  delete(avatar: Avatar) {
    console.log(avatar.id);
    this.restaurantControllerService.deleteAvatar(avatar.id, this.headersOption).
    subscribe(data => {console.log(data.text);
    this.responseOnDelete = data.text; },
      error1 => {console.log(error1);
    this.responseOnDelete = 'Failed to delete'; });
  }

  handleFileInput(files: FileList) {
    this.imageToLoad = files.item(0);
  }
}
