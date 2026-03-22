import { IRegistroUso } from "@/infra/adapters/rest_api/models/uso.model";

export interface UsoUseCase {
    vincular(idMotorista: string, idAutomovel: string): IRegistroUso 
    finalizar(idUso: string): IRegistroUso
}