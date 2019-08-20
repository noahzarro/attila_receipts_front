import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'http://127.0.0.1:5000/';
  //API_URL = 'https://https://webhook.site/66ce2c27-59da-4d20-a7ef-9ca40bf27d16.com/Xkg8enKD0LIbobmZl77D/'
  constructor() { }
}
