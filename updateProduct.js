function updateProduct(connection, stock_quantity, product_sales, id){
    connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: stock_quantity,
        product_sales: product_sales
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