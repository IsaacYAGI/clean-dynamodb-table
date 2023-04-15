const { 
    ScanCommand
} = require("@aws-sdk/client-dynamodb");

module.exports.getDynamoDBRows = (client) => {
    //We build the scanCommand with the table name and all the attributes that should be retrieved
    //These attributes are the keys of the table
    const scamCommandInput = {
        TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
        AttributesToGet: process.env.AWS_DYNAMODB_TABLE_KEY_NAME.split(","),
        //   Limit: 5,
        //   PaginationToken:""
    };
    return new Promise(async (resolve, reject) =>{
        let dynamodbItems = [];
        let paginationToken = null;
        let itemCount = 0;
        do{
            //while we have more items to get, we repeat the scan command
            //so we get the first set of rows
            const listOfItems = await client.send(new ScanCommand(scamCommandInput));
            //and we look for LastEvaluatedKey. If it is set we have more rows to get
            paginationToken = listOfItems.LastEvaluatedKey;
            //so we modify the original scanCommand adding the ExclusiveStartKey with the value of the LastEvaluatedKey
            scamCommandInput.ExclusiveStartKey = paginationToken;
            //of course we save the items obtained
            dynamodbItems = dynamodbItems.concat(listOfItems.Items)
            itemCount+= listOfItems.Items.length;
            console.log("Number of elements to erase:", itemCount)
            //we keep doing this until no more items are available
        }while(paginationToken)
        resolve(dynamodbItems);
    })
}