function updateProduct(connection, value, id){
    connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: value
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
        if(err) throw err;
    }
    );
}

module.exports = {
    updateProduct: updateProduct
};