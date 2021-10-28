import { Request, Response } from "express";
import { DatasetController } from "./DatasetController";

export class RoutesController {
    async listDatasets(req: Request, res: Response) {
        const datasetController = new DatasetController();
        const datasets = await datasetController.listAll();
        res.status(200).json(datasets);
    }

    async uploadDataset(req: Request, res: Response) {
        const datasetController = new DatasetController();
        await datasetController.uploadDataset();
        res.status(200).send('ok');
    }
}