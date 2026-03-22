import { BaseController } from '@/controllers/crudController';
import { UsoController } from '@/controllers/usoController';
import { IAutomovel } from '@/models/automovel.model';
import { IMotorista } from '@/models/motorista.model';
import { AutomovelRepository } from '@/services/repository/automovel.repository';
import { MotoristaRepository } from '@/services/repository/motorista.repository';
import { UsoRepository } from '@/services/repository/uso.repository';
import { UsoService } from '@/services/uso.service';
import { Router } from 'express';
const router = Router();

// Instâncias 
const motRepo = new MotoristaRepository();
const autRepo = new AutomovelRepository();
const usoRepo = new UsoRepository();

const usoService = new UsoService(usoRepo, motRepo, autRepo);

const motController = new BaseController<IMotorista>(motRepo);
const autController = new BaseController<IAutomovel>(autRepo);
const usoController = new UsoController(usoService);

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

// Definição das rotas
router.post('/registros-uso', usoController.vincular);
router.patch('/registros-uso/:id/finalizar', usoController.finalizar);

export default router;