import { Router } from 'express';
import Model from '../models/Model.js';
import modelConfig from '../models/taskrecordings-model.js';
import database from '../database.js';
import Accessor from '../accessor/Accessor.js';
import Controller from '../controller/Controller.js';

// Model

const model = new Model(modelConfig);

// Data accessor

const accessor = new Accessor(model, database);

// Controller

const controller = new Controller(accessor);

// Endpoints

const router = new Router();

router.get('/', (req, res) => controller.get(req, res, null));
router.get('/:id', (req, res) => controller.get(req, res, null));
router.get('/:id/:id2', (req, res) => controller.get(req, res, null));
router.post('/', controller.post);
router.put('/:id/:id2', controller.put);
router.delete('/:id/:id2', controller.delete);

export default router;