import { ObjectId } from 'mongodb';
import Pelicula from './pelicula.js';
import Actor from './actor.js';

const actorCollection = 'actores';


async function handleInsertActorRequest(req, res) {
    const { idPelicula, nombre, edad, estaRetirado, premios } = req.body;

    try {
        
        const pelicula = await Pelicula.findOne({ nombre: idPelicula });
        if (!pelicula) return res.status(404).send('Película no encontrada');

        const newActor = new Actor({
            _id: new ObjectId(),
            idPelicula,
            nombre,
            edad,
            estaRetirado,
            premios
        });

        const result = await newActor.save();
        return res.status(201).send(result);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}


async function handleGetActoresRequest(req, res) {
    try {
        const actores = await Actor.find();
        return res.status(200).send(actores);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}


async function handleGetActorByIdRequest(req, res) {
    const id = req.params.id;

    try {
        const actor = await Actor.findById(id);
        if (!actor) return res.status(404).send('Actor no encontrado');
        return res.status(200).send(actor);
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}


async function handleGetActoresByPeliculaIdRequest(req, res) {
    const peliculaId = req.params.pelicula;

    try {
        const actores = await Actor.find({ idPelicula: peliculaId });
        return res.status(200).send(actores);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
