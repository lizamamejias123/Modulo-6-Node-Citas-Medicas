// chalk fondo blanco y letras azules
const chalk = require("chalk");
// uuid para la creacion de id de 6 digitos
const {
    v4: uuidv4
} = require("uuid");
// fecha mediante el metodos mmmm do yyy, h:mm:ss a
const moment = require("moment");
// lodash para devolver lista del api
const _ = require("lodash");
// trae la data del api
const axios = require("axios");


const http = require("http");

http
    .createServer((req, res) => {
        axios
            .get("https://randomuser.me/api/?results=7")
            .then((response) => {
                //   recorrer el api para obtener los valores con lodash
                _.each(response.data.results, function (value, i) {
                    console.log(value.name);
                });
                _.each(response.data.results, function (value, i) {
                    const {
                        first: nombre,
                        last: apellido
                    } = value.name;
                    //   creacion de id 
                    const id = uuidv4().slice(0, 6);
                    //   creacion de fecha segun formato pedido
                    const fecha = moment().format("MMMM Do YYYY, h:mm:ss a");
                    //   data nueva
                    const usuario = `${i + 1}.- Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${fecha} \n `;
                    //   cambios de vista en la consola
                    console.log(chalk.bgWhite.blue.bold(usuario));
                    //   imprimir usuarios
                    res.write(usuario);
                });
                res.end();
            })
            .catch((e) => {
                console.log(e);
            });
    })
    .listen(8081, () => console.log("En el puerto 8081"));