import sql from 'mssql'
import config from '../db.js'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJES;
const seriesTabla = process.env.DB_TABLA_SERIES;
const combinacionTabla = process.env.DB_TABLA_SERIESANDPERSONAJES;

export class PersonajeService {
    getPersonajeById = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`SELECT pers.*, serie.*  FROM ${combinacionTabla} comb, ${personajeTabla} pers, ${seriesTabla} serie WHERE comb.IdPersonajes=@Id`);
        console.log(response)

        return response.recordset[0];
    }

    getPersonaje = async (name, age, weight, serie) => {
        console.log('This is a function on the service');
        
        let query = `SELECT DISTINCT pers.Imagen, pers.Nombre, pers.Id from ${personajeTabla} pers, ${combinacionTabla} comb`;

        if (serie) {
            query += ` WHERE pers.Id = comb.IdPersonajes AND comb.IdSeries = @serie`
        } else {
            query += ` WHERE pers.Id > 0`
        }
        if (name) {
            query += ` AND Nombre = @nombre`
        }
        if (age) {
            query += ` AND Edad = @edad`
        }
        if (weight) {
            query += ` AND Peso = @peso`
        }

        const pool = await sql.connect(config);
        let response = await pool.request()
            .input('nombre',sql.VarChar, name)
            .input('edad',sql.Float, age)
            .input('peso',sql.Float, weight)
            .input('serie',sql.Int, serie)
            .query(query);
        
        return response.recordset;
    }

    createPersonaje = async (personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.VarChar, personaje?.imagen ?? '')
            .input('Nombre',sql.VarChar, personaje?.nombre ?? '')
            .input('Edad',sql.Float, personaje?.edad ?? 0)
            .input('Peso',sql.Float, personaje?.peso ?? 0)
            .input('Historia',sql.VarChar, personaje?.historia ?? '')
            .query(`INSERT INTO ${personajeTabla}(Imagen, Nombre, Edad, Peso, Historia) VALUES (@Imagen, @Nombre, @Edad, @Peso, @Historia)`);
        console.log(response)

        return response.recordset;
    }

    updatePersonajeById = async (id, personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .input('Imagen',sql.VarChar, personaje?.imagen ?? '')
            .input('Nombre',sql.VarChar, personaje?.nombre ?? '')
            .input('Edad',sql.Float, personaje?.edad ?? 0)
            .input('Peso',sql.Float, personaje?.peso ?? 0)
            .input('Historia',sql.VarChar, personaje?.historia ?? '')
            .query(`UPDATE ${personajeTabla} SET Imagen = @Imagen, Nombre = @Nombre, Edad = @Edad, Peso = @Peso, Historia = @Historia WHERE Id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`DELETE FROM ${personajeTabla} WHERE Id = @Id`);
        console.log(response)

        return response.recordset;
    }
}