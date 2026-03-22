import { Repository } from "./repository";
import { IRegistroUso } from "@/models/uso.model";

export class UsoRepository extends Repository<IRegistroUso> {
    findAtivoPorMotorista(idMotorista: string) {
        return this.getAll().find(u => u.idMotorista === idMotorista && !u.dataTermino);
    }

    findAtivoPorAutomovel(idAutomovel: string) {
        return this.getAll().find(u => u.idAutomovel === idAutomovel && !u.dataTermino);
    }
}