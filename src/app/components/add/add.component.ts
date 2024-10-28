import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Firestore, collection, addDoc, deleteDoc, doc, collectionData, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface Subcategory {
  name: string;
  imageUrl?: string;
}

interface Category {
  id?: string;
  name: string;
  subcategories?: Subcategory[];
  imageUrl?: string;
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  categoryForm: FormGroup;
  subcategoryForm: FormGroup;
  categories$: Observable<Category[]>;
  selectedFile: File | null = null;
  selectedSubcategoryFile: File | null = null;
  isLoading = false;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      subcategory: [''],
    });

    this.subcategoryForm = this.fb.group({
      name: ['', Validators.required]
    });

    // Check authentication status
    this.isAuthenticated$ = authState(this.auth).pipe(
      map(user => !!user)
    );

    // Get realtime updates of categories
    const categoriesCollection = collection(this.firestore, 'categories');
    this.categories$ = collectionData(categoriesCollection, { idField: 'id' }) as Observable<Category[]>;
  }

  ngOnInit(): void {}

  onFileSelected(event: any, isSubcategory = false) {
    if (isSubcategory) {
      this.selectedSubcategoryFile = event.target.files[0];
    } else {
      this.selectedFile = event.target.files[0];
    }
  }

  async uploadImage(file: File, path: string): Promise<string> {
    const filePath = `${path}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async addCategory() {
    if (!this.categoryForm.valid || !this.selectedFile) return;
    
    this.isLoading = true;
    try {
      const imageUrl = await this.uploadImage(this.selectedFile, 'categories');
      
      const categoriesRef = collection(this.firestore, 'categories');
      await addDoc(categoriesRef, {
        name: this.categoryForm.get('name')?.value,
        subcategories: [],
        imageUrl: imageUrl,
        createdAt: new Date()
      });

      this.categoryForm.reset();
      this.selectedFile = null;
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async addSubcategory(categoryId: string) {
    if (!this.subcategoryForm.valid || !this.selectedSubcategoryFile) return;

    try {
      const imageUrl = await this.uploadImage(this.selectedSubcategoryFile, `subcategories/${categoryId}`);
      
      const categoryRef = doc(this.firestore, 'categories', categoryId);
      const newSubcategory: Subcategory = {
        name: this.subcategoryForm.get('name')?.value,
        imageUrl: imageUrl
      };

      await updateDoc(categoryRef, {
        subcategories: arrayUnion(newSubcategory)
      });

      this.subcategoryForm.reset();
      this.selectedSubcategoryFile = null;
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  }

  async deleteSubcategory(category: Category, subcategory: Subcategory) {
    if (!category.id) return;

    try {
      // Delete subcategory image if it exists
      if (subcategory.imageUrl) {
        const storageRef = ref(this.storage, subcategory.imageUrl);
        await deleteObject(storageRef);
      }

      // Remove subcategory from array
      const categoryRef = doc(this.firestore, 'categories', category.id);
      await updateDoc(categoryRef, {
        subcategories: arrayRemove(subcategory)
      });
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  }

  async deleteCategory(category: Category) {
    if (!category.id) return;

    try {
      // Delete main category image
      if (category.imageUrl) {
        const storageRef = ref(this.storage, category.imageUrl);
        await deleteObject(storageRef);
      }

      // Delete all subcategory images
      if (category.subcategories) {
        for (const sub of category.subcategories) {
          if (sub.imageUrl) {
            const subStorageRef = ref(this.storage, sub.imageUrl);
            await deleteObject(subStorageRef);
          }
        }
      }

      // Delete category document
      const categoryRef = doc(this.firestore, 'categories', category.id);
      await deleteDoc(categoryRef);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
