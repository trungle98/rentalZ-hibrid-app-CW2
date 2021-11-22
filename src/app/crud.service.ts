import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  
  private dbInstance: SQLiteObject;
  readonly db_name: string = "rentalx.db";
  readonly db_table: string = "house";
  USERS: Array <any> ;

  constructor(
    private platform: Platform,
    private sqlite: SQLite    
  ) { 
    this.platform.ready().then(() => {
      this.databaseConn();
    });
   
  }

    // Create SQLite database 
    databaseConn() {
        this.platform.ready().then(() => {
          this.sqlite.create({
              name: this.db_name,
              location: 'default'
            }).then((sqLite: SQLiteObject) => {
              this.dbInstance = sqLite;
              sqLite.executeSql(`
                  CREATE TABLE IF NOT EXISTS ${this.db_table} (
                    house_id INTEGER PRIMARY KEY, 
                    title varchar(255),
                    name varchar(255) not null,
                    about varchar(255),
                    address varchar(255) not null,
                    type varchar(255) not null,
                    furniture_types varchar(255),
                    num_bed_room INTEGER not null,
                    num_kitchen INTEGER,
                    num_parking INTEGER,
                    price INTEGER,
                    price_unit varchar(255),
                    period INTEGER,
                    period_unit varchar(255),
                    created_date varchar(255) not null,
                    last_update varchar(255),
                    note varchar(255),
                    user_id INTEGER
                  )`, [])
                .then((res) => {
                  // alert(JSON.stringify(res));
                })
                .catch((error) => alert(JSON.stringify(error)));
            })
            .catch((error) => alert(JSON.stringify(error)));
        });   
    }

    // Crud
    public addItem(title, about, address, num_bed_room, num_kitchen, num_parking, price, price_unit, period, period_unit, user_id) {
      // validation
      if (!title.length || !about.length) { 
        alert('You have to provide all fields');
        return;
      }
      this.platform.ready().then(() => {
      this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (title, about, address, num_bed_room, num_kitchen, num_parking, price, price_unit, period, period_unit, user_id) VALUES ('${title}', '${about}', '${address}', '${num_bed_room}', '${num_kitchen}', '${num_parking}', '${price}', '${price_unit}', '${period}', '${period_unit}', '${user_id}')`, [])
        .then(() => {
          alert("Success");
          this.getAllHouses();
        }, (e) => {
          alert(JSON.stringify(e.err));
        });
      }
      )};


    getAllHouses() {
      this.platform.ready().then(() => {
      return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
        this.USERS = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.USERS.push(res.rows.item(i));
          }
          console.log(this.USERS);
          
          return this.USERS;
        }
      },(e) => {
        alert(JSON.stringify(e));
      });
      
    });
  }

    // Get user
    getUser(id): Promise<any> {
      return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE house_id = ?`, [id])
      .then((res) => { 
        return {
          house_id: res.rows.item(0).house_id,
          title: res.rows.item(0).title,  
          address: res.rows.item(0).about,
          num_bed_room: res.rows.item(0).num_bed_room,  
          num_kitchen: res.rows.item(0).num_kitchen,
          num_parking: res.rows.item(0).num_parking,  
          price: res.rows.item(0).price,
          price_unit: res.rows.item(0).price_unit,  
          period: res.rows.item(0).period,
          period_unit: res.rows.item(0).period_unit
        }
      });
    }

    // Update
    updateHouse(id, title, about, address, num_bed_room, num_kitchen, num_parking, price, price_unit, period, period_unit) {
      let data = [title, about, address, num_bed_room, num_kitchen, num_parking, price, price_unit, period, period_unit];
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET title = ?,  about = ?,  address = ?,  num_bed_room = ?,  num_kitchen = ?,  num_parking = ?,  price = ?,  price_unit = ?,  period = ?,  period_unit =? WHERE house_id = ${id}`, data)
    }  

    // Delete
    deleteHouse(house_id) {
      this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE house_id = ${house_id}`, [])
        .then(() => {
          alert("House deleted!");
          this.getAllHouses();
        })
        .catch(e => {
          alert(JSON.stringify(e))
        });
    }

}
// @Injectable({
//   providedIn: 'root'
// })

// export class CrudService {
  
//   private dbInstance: SQLiteObject;
//   readonly db_name: string = "remotestack.db";
//   readonly db_table: string = "userTable";
//   USERS: Array <any> ;

//   constructor(
//     private platform: Platform,
//     private sqlite: SQLite    
//   ) { 
//     this.databaseConn();
//   }

//     // Create SQLite database 
//     databaseConn() {
//         this.platform.ready().then(() => {
//           this.sqlite.create({
//               name: this.db_name,
//               location: 'default'
//             }).then((sqLite: SQLiteObject) => {
//               this.dbInstance = sqLite;
//               sqLite.executeSql(`
//                   CREATE TABLE IF NOT EXISTS ${this.db_table} (
//                     user_id INTEGER PRIMARY KEY, 
//                     name varchar(255),
//                     email varchar(255)
//                   )`, [])
//                 .then((res) => {
//                   // alert(JSON.stringify(res));
//                 })
//                 .catch((error) => alert(JSON.stringify(error)));
//             })
//             .catch((error) => alert(JSON.stringify(error)));
//         });   
//     }

//     // Crud
//     public addItem(n, e) {
//       // validation
//       if (!n.length || !e.length) { 
//         alert('Provide both email & name');
//         return;
//       }
//       this.dbInstance.executeSql(`
//       INSERT INTO ${this.db_table} (name, email) VALUES ('${n}', '${e}')`, [])
//         .then(() => {
//           alert("Success");
//           this.getAllUsers();
//         }, (e) => {
//           alert(JSON.stringify(e.err));
//         });
//     }

//     getAllUsers() {
//       return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
//         this.USERS = [];
//         if (res.rows.length > 0) {
//           for (var i = 0; i < res.rows.length; i++) {
//             this.USERS.push(res.rows.item(i));
//           }
//           return this.USERS;
//         }
//       },(e) => {
//         alert(JSON.stringify(e));
//       });
//     }

//     // Get user
//     getUser(id): Promise<any> {
//       return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE user_id = ?`, [id])
//       .then((res) => { 
//         return {
//           user_id: res.rows.item(0).user_id,
//           name: res.rows.item(0).name,  
//           email: res.rows.item(0).email
//         }
//       });
//     }

//     // Update
//     updateUser(id, name, email) {
//       let data = [name, email];
//       return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET name = ?, email = ? WHERE user_id = ${id}`, data)
//     }  

//     // Delete
//     deleteUser(user) {
//       this.dbInstance.executeSql(`
//       DELETE FROM ${this.db_table} WHERE user_id = ${user}`, [])
//         .then(() => {
//           alert("User deleted!");
//           this.getAllUsers();
//         })
//         .catch(e => {
//           alert(JSON.stringify(e))
//         });
//     }

// }