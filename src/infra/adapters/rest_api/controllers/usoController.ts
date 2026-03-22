import { Constants } from '@/infra/adapters/rest_api/config';
import { Request, Response } from 'express';
import { UsoUseCase } from '@/application/usecases/uso.usecase';

export class UsoController {
    constructor(private usoService: UsoUseCase) {}

    vincular = (req: Request, res: Response) => {
        try {
            const { idMotorista, idAutomovel } = req.body;

            if (!idMotorista || !idAutomovel) {
                return res.status(Constants.HTTP_STATUS.BAD_REQUEST).json({ error: "IDs de motorista e automóvel são obrigatórios." });
            }

            const registro = this.usoService.vincular(idMotorista, idAutomovel);
            return res.status(Constants.HTTP_STATUS.CREATED).json(registro);
        } catch (error: any) {
            return res.status(Constants.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
        }
    }

    finalizar = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const registro = this.usoService.finalizar(id as string);
            return res.status(Constants.HTTP_STATUS.CREATED).json(registro); 
        } catch (error: any) {
            return res.status(Constants.HTTP_STATUS.NOT_FOUND).json({ error: error.message });
        }
    }
}