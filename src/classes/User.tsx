const uuidv1 = require('uuid/v1');

export class User {
  public id: string = ''
  public name: string = '';
  public status: string ='';
  
  constructor(props: any) {
    this.id = uuidv1();
    this.name = props['name'];
    this.status = props['status'];
  }
}