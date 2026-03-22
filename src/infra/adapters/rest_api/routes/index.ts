import { BaseController } from '@/infra/adapters/rest_api/controllers/crudController';
import { UsoController } from '@/infra/adapters/rest_api/controllers/usoController';
import { IAutomovel } from '@/infra/adapters/rest_api/models/automovel.model';
import { IMotorista } from '@/infra/adapters/rest_api/models/motorista.model';
import { UsoRepository } from '@/infra/adapters/persistence/memory/uso.repository';
import { UsoService } from '@/domain/usecases/uso.service';
import { Router } from 'express';
import { Repository } from '../../persistence/memory/repository';
const router = Router();

// Instâncias 
const motRepo = new Repository<IMotorista>();
const autRepo = new Repository<IAutomovel>();
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