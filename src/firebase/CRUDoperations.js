import { 
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const COLLECTION_NAME = 'products';

// Create a new product
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), productData);
    return { id: docRef.id, ...productData };
  } catch (error) {
    throw new Error('Error adding product: ' + error.message);
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    throw new Error('Error fetching product: ' + error.message);
  }
};

// Update a product
export const updateProduct = async (productId, updatedData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(docRef, updatedData);
    return { id: productId, ...updatedData };
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    await deleteDoc(docRef);
    return productId;
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
};