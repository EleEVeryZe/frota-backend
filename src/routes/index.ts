import { BaseController } from '@/controllers/crudController';
import { IAutomovel } from '@/models/automovel.model';
import { IMotorista } from '@/models/motorista.model';
import { AutomovelRepository } from '@/services/repository/automovel.repository';
import { MotoristaRepository } from '@/services/repository/motorista.repository';
import { Router } from 'express';
const router = Router();

// Instâncias 
const motRepo = new MotoristaRepository();
const autRepo = new AutomovelRepository();

const motController = new BaseController<IMotorista>(motRepo);
const autController = new BaseController<IAutomovel>(autRepo);

// --- Rotas de Motorista ---
router.post('/motoristas', motController.create);
router.get('/motoristas', motController.list);
router.get('/motoristas/:id', motController.getOne);
router.put('/motoristas/:id', motController.update);
router.delete('/motoristas/:id', motController.delete);

// --- Rotas de Automóvel ---
router.post('/automoveis', autController.create);
router.get('/automoveis', autController.list);
router.get('/automoveis/:id', autController.getOne);
router.put('/automoveis/:id', autController.update);
router.delete('/automoveis/:id', autController.delete);

export default router;