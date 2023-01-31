const fs = require('fs')


// const users = [ 
//   { id: 1, name: 'Sergey', isMan: true , age: 31 },
//   { id: 5, name: 'Julianna', isMan: false , age: 28 },
//   { id: 4, name: 'Daniil', isMan: true , age: 1 },
//   { id: 3, name: 'Pasha', isMan: true , age: 42 },
//   { id: 2, name: 'Denis', isMan: true , age: 31 },
//   { id: 6, name: 'Piter', isMan: true, age: 56},
//   { id: 7, name: 'Ekaterina', isMan: false, age: 22}
// ]

//  const js = JSON.stringify(users)
// fs.writeFileSync( '../data.json', js)


class UsersService {

	async readData(){
		 const data = await fs.readFileSync('./services/data.json', "utf8")		 
		 const dataParse = await JSON.parse(data)
		 return await dataParse.users
		}

	async writeData(dataset){
		console.log(typeof dataset);
		//получил данные
		const jsonWrite = JSON.stringify(dataset)
		console.log('jsWrite',jsonWrite)
		//записал данные
		await fs.appendFileSync(
			'../data.json',
			jsonWrite,
			err => { if (err) throw err}
		)
		return console.log('jsWrite',jsonWrite);
	}

	async getUsers(){
		return await this.readData()
	}

	async getUsersById(id){
		const users = await this.readData()
		console.log(users.find( i => i.id == id ));
		return users.find( i => i.id == id )
	}
	async getGenderUsers(gender){	
			const users = await this.readData()
			if ( gender == "male" ) return users.filter( i => i.isMan)
			if ( gender == "female" ) return users.filter( i => !i.isMan)
		}
	
async putUsers(data, id){
			//читаю файл с данными
		const users = await this.readData()
		console.log(users);
		console.log('data, id',data, id);
		const updateUsers = await users.map( i => i.id == id ? data : i )
		console.log('updateUsers',updateUsers);
		const createdUser = await updateUsers.splice(0, users.length, ...updateUsers)
		console.log('createdUser',createdUser);
		//передал данные в запись
		await this.writeData(createdUser)
		//читаю файл с данными
		const users2 = await this.readData()

		console.log('users2',users2);
		return await users2.filter( i => i.id == id)

		// return users.filter( i => i.id == id)
	}
	async postUsers(data){
				const users = await this.readFileSync()
					users.push(data)
			return users.at(-1)

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