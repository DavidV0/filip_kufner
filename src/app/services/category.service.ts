import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories$: Observable<Category[]>;

  constructor(private firestore: Firestore) {
    const categoriesCollection = collection(this.firestore, 'categories');
    this.categories$ = collectionData(categoriesCollection, {
      idField: 'id',
    }) as Observable<Category[]>;
    this.categories$.subscribe((categories) => {
      // Handle categories as needed, currently no action taken
    });
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return this.categories$.pipe(
      map((categories) => categories.find((category) => category.id === id))
    );
  }
}
