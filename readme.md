# Proyecto para limpiar todos los items de una tabla de dynamoDB

Con este proyecto se puede limpiar todos los datos de una tabla seleccionada, TOMAR PRECAUCIONES

# Uso

El algoritmo obtiene la lista de todos los items de una tabla de dynamodb, vienen una definida cantidad de registros que no superen en total 1MB. De superarlo, para obtener la siguiente lista se utiliza un LastEvaluatedKey que se envía en la siguiente petición de obtención de items entregando 1MB más. Este proceso se repite hasta que no devuelve LastEvaluatedKey por lo que ya no hay mas registros. Luego este array se utiliza para eliminar los registros, pero la eliminacion solo es posible de 25 en 25, por lo que este array luego es separado en mini arrays de 25 o menos.

Para iniciar el proceso hacer lo siguiente:

1. Correr `npm install` para instalar las dependencias
1. Duplicar el archivo `.env.example` y renombrarlo a `.env`
1. Abrir el archivo `.env` y colocarle el valor a las variables de entorno de acuerdo a la configuracion de dynamodb

```
AWS_DYNAMO_REGION=[REGION]
AWS_DYNAMODB_TABLE_NAME=[NOMBRE_DE_TABLA]
AWS_DYNAMODB_TABLE_KEY_NAME=[NOMBRE_DEL_KEY_DE_LA_TABLA]
```

Nota: Para tablas con llaves compuestas se debe colocar todos los atributos que conforman esta llave compuesta, separados por coma en la variable de entorno `AWS_DYNAMODB_TABLE_KEY_NAME`. Ej:

```
AWS_DYNAMODB_TABLE_KEY_NAME=id,date
```

1. Se deben configurar las variables de entorno de AWS. Esto se hace desde la consola de AWS donde se obtienen las credenciales para acceso programaticamente por lo que hay que setear dichas variables también en el archivo `.env`:

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SESSION_TOKEN=
```
1. Por seguridad la linea que elimina está comentada, asi que abrir el archivo `delete.js` y descomentar la línea que envía el comando de eliminación hacia dynamodb

```
async function deleteBatchItems(chunk, client){
    ...
    // const deleteBatchItemsResult = await client.send(new BatchWriteItemCommand(deleteBatchItemsCommandInput));
    ...
}
```

1. Correr el comando `npm start` para iniciar con el proceso. ESTE PROCESO ES IRREVERSIBLE.

