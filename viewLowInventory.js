function viewLowInventory(connection, menu){
    let query = connection.query(
        `
        SELECT * 
        FROM products
        `, function(err, res){
            if(err) throw err;
            let lowInventory= [];
            let blankLines = "\n";
            for (let i =0; i< res.length; i++){
                if (res[i].stock_quantity < 100){
                    lowInventory.push(res[i]);
                    blankLines += "\n";
                }
            }
            console.log("\n");
            console.table(lowInventory);
            console.log(blankLines);
        }
        )
    menu(connection);
}

module.exports = {
    viewLowInventory: viewLowInventory
}