export interface IAutomovel {
    id: string;
    placa: string;
    cor: string;
    marca: string;
}

export class Automovel {
    placa: string;
    cor: string;
    marca: string;

    constructor(
        placa: string,
        cor: string,
        marca: string
    ) {
        this.placa = placa;
        this.cor = cor;
        this.marca = marca;
    }
}