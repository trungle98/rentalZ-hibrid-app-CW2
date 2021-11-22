import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  id: any;
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
  created_date : string = "";
  last_update : string = "";
  user_id : number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crud: CrudService
  ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.crud.getUser(this.id).then((res) => {
      this.title = res['title'];
      this.about = res['about']; 
      this.address = res['address'];
      this.num_bed_room = res['num_bed_room']; 
      this.num_kitchen = res['num_kitchen'];
      this.num_parking = res['num_parking']; 
      this.price = res['price'];
      this.price_unit = res['price_unit']; 
      this.period = res['period'];
      this.period_unit = res['period_unit']; 
    })
  }

  ngOnInit() { }

  onUpdate() {
     this.crud.updateHouse(this.id,this.title, this.about, this.address, this.num_bed_room, this.num_kitchen, this.num_parking, this.price, this.price_unit, this.period, this.period_unit).then(() => {
        this.router.navigate(['/create']);
     })
  }

}