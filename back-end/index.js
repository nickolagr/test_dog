const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM hot_dog.products';


const connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'root',
  database : 'hot_dog'
});

connection.connect(err => {
	if(err){
		return err;
	}
});


app.use(cors());

app.get('/', (req,res) => {
	res.send('go to /products to see products')
});



app.get('/products/add', (req,res) => {
	const { product_name, sku, price, is_active } = req.query;
	const INSERT_PRODUCT_INTO_DB = `INSERT INTO hot_dog.products (product_name, sku, price, is_active) VALUES('${product_name}', '${sku}', '${price}', '${is_active}')`;
	connection.query(INSERT_PRODUCT_INTO_DB, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('successfully added product')
		}

	});

});

//rest api to delete record from mysql database

app.delete('/products/delete/:id', (req, res) => {
  let { id } = req.params ;
  let DELETE_PRODUCT_FROM_DB = `DELETE FROM hot_dog.products WHERE id= '${id}'`;
  console.log('id: ', req.params);
  // delete a row with id = req.params.id
  connection.query(DELETE_PRODUCT_FROM_DB, (error, results, fields) => {
    if (error) return console.error(error.message);
    res.status(200).send(results);
    console.log('Deleted Row(s):', results.affectedRows);
  });
});

//edit item

app.post('/products/update/:id', (req,res) => {
	const { product_name, sku, price, is_active } = req.query;
	let { id } = req.params ;
	const UPDATE_PRODUCT_INTO_DB = `UPDATE hot_dog.products SET product_name='${product_name}', sku='${sku}', price='${price}', is_active='${is_active}' WHERE id= '${id}'`;
	connection.query(UPDATE_PRODUCT_INTO_DB, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('successfully edited product')
		}

	});

});

app.get('/products', (req,res) => {
	connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}

	});
	
});

app.listen(4000, () => {
	console.log(`Products server listening on port 4000`)
});