import express from "express";
import { searchLoad } from "../database/loads/index";

/* interface Load {
  ID: number;
  NomeProduto: string;
  Peso: string;
  NomeMotorista: string;
  PlacaCaminhão: string;
  Origem: string;
  NomeOrigem: string;
  Destino: string;
  NomeDestino: string;
  PrazoEntrega: string;
} */

const loadRouter = express.Router();
// GET-SEARCH LOAD ============================================
loadRouter.get("/", async (req, res) => {
  console.log("GET loadRouter CALLED");
  const loadNumber = req.body.ID;

  if (loadNumber.toString().length > 3) {
    console.log("entrou no IF vai chamar");
    try {
      const foundLoad = await searchLoad(loadNumber);
      console.log("foundLoad = ", foundLoad);

      if (foundLoad !== null) {
        res.status(200).json(foundLoad);
      } else {
        res.status(404).send("Load not found");
      }
    } catch (error: any) {
      console.error("Error searching load:", error.message);
      res.status(500).send("Error searching load");
    }
  }
});

export default loadRouter;
