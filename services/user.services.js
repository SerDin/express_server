const fs = require('fs')

class UsersService {

	async readData(){
		//  const allUsers = 
		//  await fs.readFile('data.json', "utf8", (err, data) => {
		// 	if (err) throw err
		//  const dataParse = JSON.parse(data)
		//  return dataParse

		//  })		 
		// //  return await allUsers
	// return await	fs.readFile('../data.json', 'utf8', (err, data) => {
	// 		console.log('Асинхронное чтение файла');
	// 		if (err) throw err
	// 		console.log('typeof data',typeof data)
	// 		const obj = JSON.parse(data)
	// 		console.log('obj',data)
	// 		console.log('typeof obj',typeof data)
	// 		return obj.users
	// 	})
		 const data = await fs.readFileSync('./data.json', "utf8")		 
		 const dataParse = await JSON.parse(data)
		 return dataParse
	}

	async writeData(dataset){
		console.log(typeof dataset, ' in write dataset: ', dataset);
		//получил данные 
		const jsonWrite = JSON.stringify(dataset)
		console.log('jsWrite',jsonWrite)
		//записал данные
		 await fs.appendFileSync(
			'data.json',
			jsonWrite,
			// function (err) {
			// 	 if (err){ throw err}
			// 	 else {console.log('writeOk') }
			// } 
		)
		//  await fs.writeFileSync(
		// 	'data.json',
		// 	jsonWrite,
		// 	// function (err) {
		// 	// 	 if (err){ throw err}
		// 	// 	 else {console.log('writeOk') }
		// 	// } 
		// )
		return console.log('Write is OK');
	}

	async getUsers(){
		return await this.readData()
	}

	async getUsersById(id){
		const users = await this.readData('users')
		console.log(users.find( i => i.id == id ));
		return users.find( i => i.id == id )
	}

	async getGenderUsers(gender){	
			const users = await this.readData()
			if ( gender == "male" ) return users.filter( i => i.isMan)
			if ( gender == "female" ) return users.filter( i => !i.isMan)
		}
	
 async putUser(data, id){
			//читаю файл с данными
		await fs.readFile('data.json', "utf8", (err, datas ) => {
			if (err) throw err
			const users = JSON.parse(datas)
			console.log(users);
			const updateUsers = users.users.map( i => i.id == id ? data : i )
			console.log('updateUsers',updateUsers)

			const createdUser = updateUsers.splice(0, users.length, ...updateUsers)
			console.log('createdUser',createdUser);
			const dataWrite = JSON.stringify(updateUsers)
			console.log(typeof updateUsers);

			 fs.writeFile(
				'data.json',
				dataWrite,
				function (err) {
					if (err){ throw err }
					else {console.log('writeOk') }
				}
			)
		})		 

		// const users = await this.readData()
		// console.log(users);
		// console.log('data, id',data, id);
		// const updateUsers =  await users.map( i => i.id == id ? data : i )
		// console.log('updateUsers',updateUsers);
		// const createdUser = updateUsers.splice(0, users.length, ...updateUsers)
		// console.log('createdUser',createdUser);
		// //передал данные в запись
		//  await this.writeData(updateUsers)
		// //читаю файл с данными
		// // const users2 = await this.readData()

		// // console.log('users2',users2);
		// // return  users2.filter( i => i.id == id)

		// // return users.filter( i => i.id == id)
		// 		const users2 = await this.readData()
		// 		console.log(users2);

		const users2 = await this.getUsersById(2)
		return users2
	}

	async postUser(data){
			const dataRead = await this.readData()
			console.log('users', dataRead);
			await dataRead.users.push(data)
			 await fs.writeFile(
				'data.json',
				JSON.stringify(dataRead),
				(err) => {
					if (err){ throw err }
					else {console.log('writePostOk') 
				}}
			)
									return await console.log( this.readData().users)

			// const users2 = await this.readData()

			// return users2.users.at(-1)

	// 	// return new Promise( (res,rej) => {
	// 	// 	users.push(data)
	// 	// 	// res.status(201)
	// 	// }) 
	}

	patchUser(data){
		return new Promise( (res, rej) => {
			const id = data.id
			const updateUsers = users.filter( i => ( i.id == id ))
			const newUser = Object.assign(...updateUsers, data)
			res( newUser )
		})
	}

	deleteUser(id){
		return new Promise( (res, rej) => {
			const ids = users.findIndex( i => i.id == id)
			users.splice(ids, 1)
			res(`${id}`)
		})
	}
}

module.exports = new UsersService()