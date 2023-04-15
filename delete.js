const { 
    BatchWriteItemCommand,
} = require("@aws-sdk/client-dynamodb");

const _ = require('lodash');

async function deleteBatchItems(chunk, client){
    //We build the set of items that are going to be erased
    const deleteArray = chunk.map(chunkItem => {
        return {
            DeleteRequest:{
                Key:chunkItem
            }
        }
    })
    // console.log("arrayDelete:",JSON.stringify(deleteArray))
    //and build the delete command for a single chunk which will be executed
    const deleteBatchItemsCommandInput = {
        RequestItems:{
            [process.env.AWS_DYNAMODB_TABLE_NAME]: deleteArray
        }
    };
    console.log("deleteBatchItemsCommandInput:",JSON.stringify(deleteBatchItemsCommandInput))

    //------------- UNCOMMENT THIS LINE TO EXECUTE THE DELETE COMMAND, BE CAREFUL THIS CAN'T BE UNDONE!!-------------------
    // const deleteBatchItemsResult = await client.send(new BatchWriteItemCommand(deleteBatchItemsCommandInput));
    //---------------------------------------------------------------------------------------------------------------------

    // console.log("deleteBatchItemsResult", deleteBatchItemsCommandInput);
}

module.exports.deleteListOfItemsDynamoDB = async (array, client) => {
    //We must split the array into chunks with the size of 25 elements 
    //because dynamodb only allows modifying 25 elements at a time
    const arrayChunk = _.chunk(array,25);
    console.log("Delete operations to execute:",arrayChunk.length)
    //Then we just procceed to build the delete batch command with every chunk
    for (const chunk of arrayChunk){
        await deleteBatchItems(chunk, client)
        await sleep(200);
        // console.log("deleted user:",element.Username)
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}