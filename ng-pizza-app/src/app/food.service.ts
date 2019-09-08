import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscriber, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FoodElement } from './food_element';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  public foodTypes : string[] = ['vorspeise', 'pizza', 'doener','dueruem', 'pide', 'lahmacun', 'hauptspeise', 'dessert',
  'getraenk', 'teigwaren', 'antipasti'];

  public countries : string[] = ['turkey','italy'];

  public foodElements: FoodElement[] = [];

  private foodElemetExample: FoodElement;

  private foodProperties: string[] = [];

  constructor(private http : HttpClient) {
    this.foodElemetExample = new FoodElement(this.foodTypes[0], this.countries[0]);

    for(let property in this.foodElemetExample) {
      this.foodProperties.push(property);
    }
    console.log('FoodService::constructor(): properties: ', this.foodProperties);
  }

  public setFoodElement(index: number, foodElement: FoodElement): boolean {
    if(index < this.foodElements.length) {
      this.foodElements[index] = foodElement;
      return true;
    } else {
      return false;
    }
  }

  public getKeys(): string[] {
    if(this.foodElements.length > 0) {
      // console.log('this.foodElements: ', this.foodElements);
      return Object.keys(this.foodElements[0]);
    } else {
      return [];
    }
  }

  private request(method: 'post'|'get'|'put'|'delete', type: 'insert'|'update'|'updateAll'|'get'|'getAll'
  |'delete', element?: FoodElement | FoodElement[] | '', filter?: any): Observable<any> {
     // Mock-Data
    return of({ 'data' : [
      { 'alcohol': 0, 'vegetarian': 1, 'description': '', 'foodName': 'Döner','foodType': 'Doener', 'price': 8.5 },
      { 'alcohol': 0, 'vegetarian': 1, 'description': '', 'foodName': 'Dürüm','foodType': 'Doener', 'price': 8.5 },
      { 'alcohol': 0, 'vegetarian': 1, 'description': '', 'foodName': 'Salat','foodType': 'Doener', 'price': 4.5 },
      { 'alcohol': 0, 'vegetarian': 1, 'description': '', 'foodName': 'Pizza','foodType': 'Doener', 'price': 13.50 },
    ]});
  }

  private request2(method: 'post'|'get'|'put'|'delete', type: 'insert'|'update'|'updateAll'|'get'|'getAll'
  |'delete', element?: FoodElement | FoodElement[] | '', filter?: any): Observable<any> {

    let base;
    if (method === 'post') {
      base = this.http.post(`/${type}`, element);
    } else if(method === 'get') {
      console.log('request, method: ', method);
      console.log('type: ', type);
      console.log('filter: ', filter);

      const params = new  HttpParams().set('_page', "1").set('_limit', "1");
      const httpHeaders = new HttpHeaders( { 'name': 'Hi Welt!!!'} );
      httpHeaders.set('Content-Type', 'application/json');
      const options = { headers: httpHeaders};

      base = this.http.get(`/${type}`, options);

    }
    return base;
  }

  public insert(element) : Observable<any> {
    return this.request('post','insert', element);
  }

  public update(element : FoodElement) {
    return this.request('put', 'update', element, '');
  }

  public updateAll(elements : FoodElement[], filter) {
    return this.request('put', 'updateAll', elements, filter);
  }

  public load(filter: string) {

  }

  public loadAll() : Observable<FoodElement[]> {
    let filter = {'fields': ''};
    let firtst = true;
    for(let property of this.foodProperties) {
      if(firtst) {
        firtst = false;
      } else {
        filter['fields'] += ' ';
      }
      filter['fields'] += property;
    }

    return this.request('get', 'getAll', '', filter).pipe(
      map( (data) => {
        console.log('pipe(), map(), data.data: ', data.data);
        if(data && data.data) {
          for(let i in data.data) {
            this.foodElements.push(new FoodElement(this.foodTypes[0], this.countries[0]));
            this.foodElements[i] = data.data[i];
            console.log('for-Schleife: this.foodElements[' + i +  '] : ', data.data[i]);
          }
        }
        this.foodElements = data.data;
        return data.data;
      })
    );
  }

  public deleteFoodElement(index: number) {
    if(index < this.foodElements.length) {
      this.foodElements.splice(index, 1);
    }
    // return this.http.delete('/delete', { headers: { filter: filter } });
  }
}
