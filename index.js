console.log("Removing dynamodb items")
const { getDynamoDBRows } = require('./list')
const { deleteListOfItemsDynamoDB } = require('./delete')
const { 
    DynamoDBClient
} = require("@aws-sdk/client-dynamodb");

const dotenv = require('dotenv');
dotenv.config();

const client = new DynamoDBClient({ region: process.env.AWS_DYNAMO_REGION });

async function main(){
    //lets get all the dynamodb items
    const dynamodbItems = await getDynamoDBRows(client);
    //Now we delete all dynamodb rows
    await deleteListOfItemsDynamoDB(dynamodbItems, client)
}

main();
