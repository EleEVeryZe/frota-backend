export interface IMotorista {
    id: string;
    nome: string;
}

export class Motorista {
    nome: string;

    constructor(
        nome: string,
    ) {
        this.nome = nome;
    }
}