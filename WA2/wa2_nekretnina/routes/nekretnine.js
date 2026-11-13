
import express from "express";
import { nekretnine } from "../data.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(nekretnine);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ poruka: "ID mora biti broj." });
    }

    const nekretnina = nekretnine.find(n => n.id === id);

    if (!nekretnina) {
        return res.status(404).json({ poruka: "Nekretnina ne postoji." });
    }

    res.status(200).json(nekretnina);
});

router.post("/", (req, res) => {
    const podaci = req.body;

    if (!podaci.naziv || !podaci.opis || !podaci.lokacija ||
        podaci.cijena === undefined || podaci.brojSoba === undefined ||
        podaci.povrsina === undefined) {
        return res.status(400).json({ poruka: "Nisu uneseni svi podaci." });
    }

    if (typeof podaci.cijena !== "number" || podaci.cijena <= 0 ||
        typeof podaci.brojSoba !== "number" || podaci.brojSoba <= 0 ||
        typeof podaci.povrsina !== "number" || podaci.povrsina <= 0) {
        return res.status(400).json({ poruka: "Podaci nisu ispravni." });
    }

    const novaNekretnina = {
        id: nekretnine.length + 1,
        naziv: podaci.naziv,
        opis: podaci.opis,
        cijena: podaci.cijena,
        lokacija: podaci.lokacija,
        brojSoba: podaci.brojSoba,
        povrsina: podaci.povrsina
    };

    nekretnine.push(novaNekretnina);

    res.status(201).json(novaNekretnina);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ poruka: "ID mora biti broj." });
    }

    const index = nekretnine.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({ poruka: "Nekretnina ne postoji." });
    }

    const podaci = req.body;

    if (!podaci.naziv || !podaci.opis || !podaci.lokacija ||
        podaci.cijena === undefined || podaci.brojSoba === undefined ||
        podaci.povrsina === undefined) {
        return res.status(400).json({ poruka: "Potrebno je poslati sve podatke." });
    }

    if (typeof podaci.cijena !== "number" || podaci.cijena <= 0 ||
        typeof podaci.brojSoba !== "number" || podaci.brojSoba <= 0 ||
        typeof podaci.povrsina !== "number" || podaci.povrsina <= 0) {
        return res.status(400).json({ poruka: "Podaci nisu ispravni." });
    }

    nekretnine[index] = {
        id: id,
        naziv: podaci.naziv,
        opis: podaci.opis,
        cijena: podaci.cijena,
        lokacija: podaci.lokacija,
        brojSoba: podaci.brojSoba,
        povrsina: podaci.povrsina
    };

    res.status(200).json(nekretnine[index]);
});

router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ poruka: "ID mora biti broj." });
    }

    const nekretnina = nekretnine.find(n => n.id === id);

    if (!nekretnina) {
        return res.status(404).json({ poruka: "Nekretnina ne postoji." });
    }

    const podaci = req.body;

    for (const polje in podaci) {
        if (polje === "naziv" || polje === "opis" ||
            polje === "cijena" || polje === "lokacija" ||
            polje === "brojSoba" || polje === "povrsina") {
            nekretnina[polje] = podaci[polje];
        } else {
            return res.status(400).json({ poruka: "Nepoznato polje." });
        }
    }

    if (typeof nekretnina.cijena !== "number" || nekretnina.cijena <= 0 ||
        typeof nekretnina.brojSoba !== "number" || nekretnina.brojSoba <= 0 ||
        typeof nekretnina.povrsina !== "number" || nekretnina.povrsina <= 0) {
        return res.status(400).json({ poruka: "Podaci nisu ispravni." });
    }

    res.status(200).json(nekretnina);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ poruka: "ID mora biti broj." });
    }

    const index = nekretnine.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({ poruka: "Nekretnina ne postoji." });
    }

    nekretnine.splice(index, 1);

    res.status(200).json({ poruka: "Nekretnina je obrisana." });
});

export default router;
