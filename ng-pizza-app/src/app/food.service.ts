import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { FoodElement } from './food_element';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foodElements: FoodElement[];
  
  constructor(private http : HttpClient) {}

  public getFoodElements(): FoodElement[] {
    return this.foodElements;
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
  |'delete', element?: FoodElement | FoodElement[] | '', filter?: string): Observable<any> {
    console.log('request, method: ', method, ' | type: ', type, ' | element: ', element, ' | filer: ', filter);
    // let base;
    // if (method === 'post') {
    //   base = this.http.post(`/${type}`, element);
    // } else if(method === 'get') {
    //   base = this.http.get(`/${type}`, { headers: { filter: filter }});
    // }
    // return base;

    // TODO nur mock-data
    return of({ 'data' : [
      {'foodName': 'Döner','foodType': 'Doener', 'price': 8.5},
      {'foodName': 'Kebab','foodType': 'Doener', 'price': 7.5},
      {'foodName': 'pizza','foodType': 'Pizza', 'price': 13.5},
      {'foodName': 'salat','foodType': 'Vorspeise', 'price': 5.5}
    ]});
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
    return this.request('get', 'getAll', '','').pipe( 
      map( (data) => {
        console.log('pipe(), map(), data.data: ', data.data);
        if(data && data.data) 
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
