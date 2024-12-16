import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import app from '../firebase';


const db = getFirestore(app);
const todosCollection = collection(db, 'studentRequests');
const teachersCollection = collection(db, 'teacherRequests');

const mediaCollection = collection(db, 'media');

export async function fetchOnlyMyTodoList(uid: string) {
  const myTodosQuery = query(todosCollection, where('ownerId', '==', uid));
  return await getDocs(myTodosQuery);
}
export async function fetchOnlyMyTodoList2(uid: string) {
  const myTodosQuery = query(teachersCollection, where('ownerId', '==', uid));
  return await getDocs(myTodosQuery);
}
export async function fetchOnLocationStudent(dist: string) {
  const myTodosQuery = query(todosCollection, where('district', '==', dist));
  return await getDocs(myTodosQuery);
}
export async function fetchWholeTodoListStudent() {
  const myTodosQuery = query(todosCollection);
  return await getDocs(myTodosQuery);
}
export async function fetchWholeTodoListTeacher() {
  const myTodosQuery = query(teachersCollection);
  return await getDocs(myTodosQuery);
}

export async function fetchItemsBasedOnType(
  uid: string,
  fileType: 'image' | 'video'
) {
  const myMediaQuery = query(
    mediaCollection,
    where('ownerId', '==', uid),
    where('fileType', '==', fileType)
  );
  return await getDocs(myMediaQuery);
}
