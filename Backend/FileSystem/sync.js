import fs from 'node:fs'

/* Reading */
// fs.writeFileSync('text.txt', 'hi this is testing bot')

/* write */
// const data = fs.readFileSync('text.txt', 'utf-8')

// console.log(data)

/** appending */
// fs.appendFileSync('text.txt', '\nhi this is version 2')

/**creating folder */
// fs.mkdirSync('new folder')

/** Creating nested folder */
// fs.mkdirSync('new folder/inner folder') //if outer folder(new folder) is present


/**if outer folder is not present */

// fs.mkdirSync('new folder/inner folder', {recursive : true}) 

/** deleting the file */
// fs.unlinkSync('text.txt');


/** Renaming file system */

// fs.renameSync('text.txt', 'testing.txt')

/** To copy content of one file into another file */
fs.cpSync('testing.txt', 'test.txt', {recursive : true})

/**deleting folder  */

fs.rmdirSync('new folder', {recursive : true});

//npm run dev
