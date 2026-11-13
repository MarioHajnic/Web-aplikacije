
import express from "express";
import { nekretnine, ponude } from "../data.js";

const router = express.Router();

router.post("/", (req, res) => {
    const podaci = req.body;

    if (podaci.nekretninaId === undefined ||
        !podaci.imeKupca ||
        !podaci.prezimeKupca ||
        podaci.ponudenaCijena === undefined ||
        !podaci.telefon) {
        return res.status(400).json({ poruka: "Nisu uneseni svi podaci." });
    }

    const nekretninaId = Number(podaci.nekretninaId);

    if (isNaN(nekretninaId) || nekretninaId <= 0) {
        return res.status(400).json({ poruka: "ID nije ispravan." });
    }

    const nekretnina = nekretnine.find(n => n.id === nekretninaId);

    if (!nekretnina) {
        return res.status(404).json({ poruka: "Nekretnina ne postoji." });
    }

    if (typeof podaci.ponudenaCijena !== "number" ||
        podaci.ponudenaCijena <= 0) {
        return res.status(400).json({ poruka: "Cijena ponude nije ispravna." });
    }

    const novaPonuda = {
        id: ponude.length + 1,
        nekretninaId: nekretninaId,
        imeKupca: podaci.imeKupca,
        prezimeKupca: podaci.prezimeKupca,
        ponudenaCijena: podaci.ponudenaCijena,
        telefon: podaci.telefon
    };

    ponude.push(novaPonuda);

    res.status(201).json(novaPonuda);
});

export default router;
