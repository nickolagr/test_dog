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
//  Delete user
app.delete('/products', function (req, res) {
  
    let id = req.body.id;
  
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    connection.query('DELETE FROM hot_dog.products WHERE hot_dog.id=?', [id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
}); 
//custom code here

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