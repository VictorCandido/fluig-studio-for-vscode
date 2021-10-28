import express from 'express';
import { RoutesController } from './Controllers/RoutesControllers';

const router = express.Router();

const routesController = new RoutesController();

router.get('/dataset/listDatasets', routesController.listDatasets);
router.get('/dataset/uploadDataset', routesController.uploadDataset);

export default router;