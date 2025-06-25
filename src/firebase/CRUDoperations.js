import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,

} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const COLLECTION_NAME = 'products';

export const addProduct = async (productData) => {
  try {
    if (!productData.name || !productData.price || !productData.userId) {
      throw new Error('Product must have a name, price, and userId');
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      name: productData.name,
      category: productData.category || '',
      description: productData.description || '',
      price: productData.price,
      images: productData.images || [],
      userId: productData.userId
    });

    return { id: docRef.id, ...productData };

  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Error adding product: ' + error.message);
  }
};

export const getAllProducts = async (userId) => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products: ' + error.message);
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(docRef, {
      name: updatedData.name,
      category: updatedData.category || '',
      description: updatedData.description || '',
      price: updatedData.price,
      images: updatedData.images || []
    });
    return { id: productId, ...updatedData };
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product: ' + error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    await deleteDoc(docRef);
    return productId;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product: ' + error.message);
  }
};
