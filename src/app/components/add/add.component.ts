import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  collectionData,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Category, SubCategory } from '../../interfaces/category.interface';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent implements OnInit {
  categoryForm: FormGroup;
  subcategoryForm: FormGroup;
  categories$: Observable<Category[]>;
  selectedFile: File | null = null;
  selectedSubcategoryFile: File | null = null;
  selectedImages: File[] = [];
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
    });

    this.subcategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.isAuthenticated$ = authState(this.auth).pipe(map((user) => !!user));

    const categoriesCollection = collection(this.firestore, 'categories');
    this.categories$ = collectionData(categoriesCollection, {
      idField: 'id',
    }) as Observable<Category[]>;
  }

  ngOnInit(): void {}

  onFileSelected(event: any, type: 'category' | 'subcategory' | 'images') {
    switch (type) {
      case 'category':
        this.selectedFile = event.target.files[0];
        break;
      case 'subcategory':
        this.selectedSubcategoryFile = event.target.files[0];
        break;
      case 'images':
        this.selectedImages = Array.from(event.target.files);
        break;
    }
  }

  async uploadImage(file: File, path: string): Promise<string> {
    const filePath = `${path}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);

    try {
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  async uploadMultipleImages(files: File[], path: string): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, path));
    return Promise.all(uploadPromises);
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
        createdAt: new Date(),
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
      const coverImageUrl = await this.uploadImage(
        this.selectedSubcategoryFile,
        `categories/${categoryId}/subcategories`
      );

      const newSubcategory: SubCategory = {
        id: Date.now().toString(),
        name: this.subcategoryForm.get('name')?.value,
        imageUrl: coverImageUrl,
        description: this.subcategoryForm.get('description')?.value || '',
        images: [],
      };

      const categoryRef = doc(this.firestore, 'categories', categoryId);
      await updateDoc(categoryRef, {
        subcategories: arrayUnion(newSubcategory),
      });

      this.subcategoryForm.reset();
      this.selectedSubcategoryFile = null;
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  }

  async deleteSubcategory(category: Category, subcategory: SubCategory) {
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
        subcategories: arrayRemove(subcategory),
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

  async addImagesToSubcategory(
    category: Category,
    subcategory: SubCategory,
    event: any
  ) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      const newImages = await this.uploadMultipleImages(
        Array.from(files),
        `subcategories/${category.id}/images`
      );

      // Find the subcategory index
      const subcategoryIndex =
        category.subcategories?.findIndex((sub) => sub.id === subcategory.id) ??
        -1;
      if (subcategoryIndex === -1) return;

      // Update the subcategory with new images
      const updatedSubcategories = [...(category.subcategories || [])];
      updatedSubcategories[subcategoryIndex] = {
        ...subcategory,
        images: [...subcategory.images, ...newImages],
      };

      // Update the category document
      const categoryRef = doc(this.firestore, 'categories', category.id!);
      await updateDoc(categoryRef, {
        subcategories: updatedSubcategories,
      });
    } catch (error) {
      console.error('Error adding images to subcategory:', error);
    }
  }

  async deleteImageFromSubcategory(
    category: Category,
    subcategory: SubCategory,
    imageUrl: string
  ) {
    if (!category.id || !subcategory.id) return;

    try {
      // Delete the image from Storage
      const storageRef = ref(this.storage, imageUrl);
      await deleteObject(storageRef);

      // Find and update the subcategory
      const subcategoryIndex =
        category.subcategories?.findIndex((sub) => sub.id === subcategory.id) ??
        -1;
      if (subcategoryIndex === -1) return;

      // Create updated subcategories array with the image removed
      const updatedSubcategories = [...(category.subcategories || [])];
      updatedSubcategories[subcategoryIndex] = {
        ...subcategory,
        images: subcategory.images.filter((img) => img !== imageUrl),
      };

      // Update the category document
      const categoryRef = doc(this.firestore, 'categories', category.id);
      await updateDoc(categoryRef, {
        subcategories: updatedSubcategories,
      });
    } catch (error) {
      console.error('Error deleting image from subcategory:', error);
    }
  }
}
