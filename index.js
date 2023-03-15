// async function button(){

// const dirHandle = await window.showDirectoryPicker();
//   const promises = [];
//   for await (const entry of dirHandle.values()) {
//     if (entry.kind !== 'file') {
//       continue;
//     }
//     promises.push(entry.getFile().then((file) => `${file.name} (${file.size})`));
//   }
//   console.log(await Promise.all(promises));

//   const newFileHandle = await dirHandle.getFileHandle('My Notes.txt', { create: true });


// }

// import { v4 as uuidv4 } from "uuid";
// import CryptoJS from "crypto-js";
// const hashFile = async (file) => {
//   const buffer = await file.arrayBuffer();
//   const hashVal = CryptoJS.SHA1(CryptoJS.lib.WordArray.create(buffer));
//   const hashBase64 = hashVal.toString(CryptoJS.enc.Base64);
//   const uuid = uuidv4();
//   const path = file.webkitRelativePath;
//   const type = file.type;
//   const size = file.size;

//   return { uuid, name: file.name, hash: hashBase64, size, type, path };
// };

// const button = async () => {
//   const handleUpload = await window.showDirectoryPicker();
//   const files=handleUpload.values();
//   const fileData = [];
//   for (const file of files) {
//     if (file.kind !== 'file') {
//       continue;
//     }
    
//     const { uuid, name, hash, size, type, path } = await hashFile(await file.getFile());
//     fileData.push({ uuid, name, hash, size, type, path });
//   }
  
//   console.log(await Promise.all(fileData));
  
//   const newFileHandle = await handleUpload.getFileHandle('asset.xml', { create: true });
// };





//    const [fileHandle]= await window.showDirectoryPicker();
//      let fileData=await window.showDirectoryPicker()({ mode: 'read' })
//      const contents=await fileData.text();
//     console.log(fileData);
//Reads all files


import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const button = async () => {
  const handleUpload = await window.showDirectoryPicker();
  const files = await handleUpload.values(); // add await to handle async iteration

  const fileData = [];
  for await (const file of files) { // use for-await-of to work with async iterator
    if (file.kind !== 'file') {
      continue;
    }
    
    const { uuid, name, hash, size, type, path } = await hashFile(await file.getFile());
    fileData.push({ uuid, name: `${name} (${size})`, hash, size, type, path });
  }
  
  console.log(await Promise.all(fileData));
  
  const newFileHandle = await handleUpload.getFileHandle('asset.xml', { create: true });
};



const hashFile = async (file) => {
  const buffer = await file.arrayBuffer();
  const hashVal = CryptoJS.SHA1(CryptoJS.lib.WordArray.create(buffer));
  const hashBase64 = hashVal.toString(CryptoJS.enc.Base64);
  const uuid = uuidv4();
  const path = file.webkitRelativePath;
  const type = file.type;
  const size = file.size;

  return { uuid, name: file.name, hash: hashBase64, size, type, path };
};
