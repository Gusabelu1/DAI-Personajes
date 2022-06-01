import sql from 'mssql'
import config from '../db.js'
import 'dotenv/config'

const seriesTabla = process.env.DB_TABLA_SERIES;
const personajeTabla = process.env.DB_TABLA_PERSONAJES;
const combinacionTabla = process.env.DB_TABLA_SERIESANDPERSONAJES;

export class SeriesService {
    getSerieById = async (id) => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        let response;
        let response2;
        
        response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`SELECT *  FROM ${seriesTabla} WHERE Id = @Id`);

        response2 = await pool.request()
            .input('Id',sql.Int, id)
            .query(`SELECT *  FROM ${personajeTabla} pers, ${combinacionTabla} comb WHERE pers.Id = comb.IdPersonajes AND comb.IdSeries = @Id`);
        
        console.log(response);
        console.log(response2);
        return [response.recordset, response2.recordset];
    }

    getSeries = async (name, age, weight, serie) => {
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

    createSerie = async (serie) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.VarChar, serie?.imagen ?? '')
            .input('Titulo',sql.VarChar, serie?.titulo ?? '')
            .input('FechaCreacion',sql.DateTime, new Date().toJSON() ?? '')
            .input('Calificacion',sql.Float, serie?.calificacion ?? 0)
            .query(`INSERT INTO ${seriesTabla}(Imagen, Titulo, FechaCreacion, Calificacion) VALUES (@Imagen, @Titulo, @FechaCreacion, @Calificacion)`);
        console.log(response)

        return response.recordset;
    }

    updateSerieById = async (id, serie) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .input('Imagen',sql.VarChar, serie?.imagen ?? '')
            .input('Titulo',sql.VarChar, serie?.titulo ?? '')
            .input('Calificacion',sql.Float, serie?.calificacion ?? 0)
            .query(`UPDATE ${seriesTabla} SET Imagen = @Imagen, Titulo = @Titulo, Calificacion = @Calificacion WHERE Id = @Id`);
        console.log(response)

        return response.recordset;
    }


    deleteSerieById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`DELETE FROM ${seriesTabla} WHERE Id = @Id`);
        console.log(response)

        return response.recordset;
    }
}