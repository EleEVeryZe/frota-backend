import { Constants } from '@/config';
import { Repository } from '@/services/repository/repository';
import { Request, Response } from 'express';

export class BaseController<T extends { id: string }> {
    constructor(private repo: Repository<T>) {}

    create = (req: Request, res: Response) => {
        const item = this.repo.add(req.body);
        return res.status(Constants.HTTP_STATUS.CREATED).json(item);
    }

    list = (req: Request, res: Response) => {
        const items = this.repo.getAll();
        return res.json(items);
    }

    getOne = (req: Request, res: Response) => {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const item = this.repo.getById(id);
        if (!item) return res.status(Constants.HTTP_STATUS.NOT_FOUND).json({ error: "Não encontrado" });
        return res.json(item);
    }

    update = (req: Request, res: Response) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const item = this.repo.update(id, req.body);
            return res.json(item);
        } catch (e: any) {
            return res.status(Constants.HTTP_STATUS.NOT_FOUND).json({ error: e.message });
        }
    }

    delete = (req: Request, res: Response) => {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const deleted = this.repo.delete(id);
        if (!deleted) return res.status(Constants.HTTP_STATUS.NOT_FOUND).json({ error: "Não encontrado" });
        return res.status(Constants.HTTP_STATUS.NO_CONTENT).send();
    }
}