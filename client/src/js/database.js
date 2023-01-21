import { openDB } from 'idb';
//Database creating 
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Send Database to post');
  const jateDB = await openDB('jate', 1); //    // Create a connection to the database database and version we want to use.
  const tx = jateDB.transaction('jate', 'readwrite');  // Create a new transaction and specify the database and data privileges.
  const store = tx.objectStore('jate');  // open the object store
  const request = store.put({ id: 1, value: content }); //store and pass in the content.
	const result = await request;  // Get confirmation of the request.
	console.log('Saved to Database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting from the database');
  const jateDb = await openDB('jate', 1);// Create a connection to the database database and version we want to use.
	const tx = jateDb.transaction('jate', 'readonly');  // make new transaction...need to specify the DB we are posting to and the data privileges. 
	const store = tx.objectStore('jate');  // Open up the desired object store.
	const request = store.getAll();  // Using the .getAll() method to get all data in the database.
	const result = await request;  // result: the data was added
	return result?.value;
}

initdb();
