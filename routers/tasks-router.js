import { Router } from 'express';
import Model from '../models/Model.js';
import modelConfig from '../models/tasks-model.js';
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
router.get('/users/:id', (req, res) => controller.get(req, res, 'usersall'));
router.get('/users/notcompleted/:id', (req, res) => controller.get(req, res, 'usersnotcompleted'));
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

export default router;