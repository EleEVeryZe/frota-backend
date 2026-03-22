import request from 'supertest';
import express from 'express';
import router from '@/routes';

const app = express();
app.use(express.json());
app.use(router);

describe('Fluxo de Gerenciamento de Frotas (Integração)', () => {
  let motoristaId: string;
  let automovelId: string;
  let usoId: string;

  it('Deve criar um novo motorista', async () => {
    const res = await request(app)
      .post('/motoristas')
      .send({ nome: 'Ayrton Senna', cnh: '123456' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    motoristaId = res.body.id;
  });

  it('Deve criar um novo automóvel', async () => {
    const res = await request(app)
      .post('/automoveis')
      .send({ placa: 'BRA1E22', cor: 'Preto', marca: 'Lotus' });

    expect(res.status).toBe(201);
    automovelId = res.body.id;
  });

  it('Deve permitir que um motorista retire um carro', async () => {
    const res = await request(app)
      .post('/registros-uso')
      .send({ idMotorista: motoristaId, idAutomovel: automovelId });

    expect(res.status).toBe(201);
    expect(res.body.idMotorista).toBe(motoristaId);
    usoId = res.body.id;
  });

  it('Não deve permitir que o mesmo motorista pegue outro carro ao mesmo tempo', async () => {
    const outroCarro = await request(app)
      .post('/automoveis')
      .send({ placa: 'XYZ9999', cor: 'Branco', marca: 'Ford' });

    const res = await request(app)
      .post('/registros-uso')
      .send({ idMotorista: motoristaId, idAutomovel: outroCarro.body.id });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Este motorista já possui um vínculo ativo.");
  });

  it('Deve permitir devolver o carro', async () => {
    const res = await request(app)
      .patch(`/registros-uso/${usoId}/finalizar`);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('dataTermino');
  });
});