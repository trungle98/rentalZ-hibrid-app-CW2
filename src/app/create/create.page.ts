import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  title : string = "";
  about : string = "";
  address : string = "";
  num_bed_room : number = 0;
  num_kitchen : number = 0;
  num_parking : number = 0;
  price : number = 0;
  price_unit : string = "";
  period : number = 0;
  period_unit : string = "";
  created_date : string = "asdsd";
  last_update : string = "asd";
  user_id : number = 0;

  constructor(
   private crud: CrudService
  ) {
    this.crud.databaseConn(); 
  }

  ngOnInit() { }

  ionViewDidEnter() {  
    this.crud.getAllHouses();
  }
   
  createUser(){
    this.crud.addItem(this.title, this.about, this.address, this.num_bed_room, this.num_kitchen, this.num_parking, this.price, this.price_unit, this.period, this.period_unit, this.user_id);
  }
   
  remove(user) {
    this.crud.deleteHouse(user);
  }
  
}
// import { Component, OnInit } from '@angular/core';
// import { CrudService } from '../crud.service';

// @Component({
//   selector: 'app-create',
//   templateUrl: './create.page.html',
//   styleUrls: ['./create.page.scss'],
// })

// export class CreatePage implements OnInit {

//   nameVal: string = "";
//   emailVal: string = "";

//   constructor(
//    private crud: CrudService
//   ) {
//     this.crud.databaseConn(); 
//   }

//   ngOnInit() { }

//   ionViewDidEnter() {  
//     this.crud.getAllUsers()
//   }
   
//   createUser(){
//     this.crud.addItem(this.nameVal, this.emailVal);
//   }
   
//   remove(user) {
//     this.crud.deleteUser(user);
//   }
  
// }