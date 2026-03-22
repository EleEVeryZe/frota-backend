import { IAutomovel } from "@/infra/adapters/rest_api/models/automovel.model";
import { IMotorista } from "@/infra/adapters/rest_api/models/motorista.model";
import { UsoUseCase } from "@/application/usecases/uso.usecase";
import { IRepository } from "@/application/out/irepository";
import { IUsoRepository } from "@/application/out/uso.repository";

export class UsoService implements UsoUseCase {
    constructor(
        private usoRepo: IUsoRepository,
        private motoristaRepo: IRepository<IMotorista>,
        private automovelRepo: IRepository<IAutomovel>
    ) {}

    vincular(idMotorista: string, idAutomovel: string) {
        if (!this.motoristaRepo.getById(idMotorista)) throw new Error("Motorista não encontrado.");
        if (!this.automovelRepo.getById(idAutomovel)) throw new Error("Automóvel não encontrado.");

        if (this.usoRepo.findAtivoPorMotorista(idMotorista)) {
            throw new Error("Este motorista já possui um vínculo ativo.");
        }

        if (this.usoRepo.findAtivoPorAutomovel(idAutomovel)) {
            throw new Error("Este automóvel já está sendo utilizado por outro motorista.");
        }

        return this.usoRepo.add({
            idMotorista,
            idAutomovel,
            dataInicio: new Date().toISOString()
        });
    }

    finalizar(idUso: string) {
        const uso = this.usoRepo.getById(idUso);
        if (!uso) throw new Error("Registro de uso não encontrado.");
        if (uso.dataTermino) throw new Error("Este uso já foi finalizado.");

        uso.dataTermino = new Date().toISOString();
        return this.usoRepo.update(idUso, uso);
    }
}