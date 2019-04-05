function viewProducts(connection,menu){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.log("\r\n");
        console.table(res);     
        menu(connection);  
    })
}

module.exports = {
    viewProducts: viewProducts
}