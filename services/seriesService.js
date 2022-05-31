import sql from 'mssql'
import config from '../db.js'
import 'dotenv/config'

const seriesTabla = process.env.DB_TABLA_SERIES;
const personajeTabla = process.env.DB_TABLA_PERSONAJES;
const combinacionTabla = process.env.DB_TABLA_SERIESANDPERSONAJES;

export class SeriesService {
    getSeries = async (id) => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        let response;

        if (!id) {
            response = await pool.request()
                .query(`SELECT id, imagen, titulo, fechaCreacion FROM ${seriesTabla}`);
        } else {
            response = await pool.request()
                .input('Id',sql.Int, id)
                .query(`SELECT pers.*, serie.*  FROM ${combinacionTabla} comb, ${personajeTabla} pers, ${seriesTabla} serie WHERE comb.IdSeries=@Id and comb.IdPersonajes=@Id`);
        }
        console.log(response)
        return response.recordset;
    }

    editSeries = async (id) => {
        const pool = await sql.connect(config);
        let reposnse;

        if (!id) {
            return res.status(404).json("No se encontro la serie");
        } else {

        }
    }
}