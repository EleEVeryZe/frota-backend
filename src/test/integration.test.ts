import request from 'supertest';
import express from 'express';
import router from '@/routes';

const app = express();
app.use(express.json());
app.use(router);

describe('Fluxo de Gerenciamento de Frotas (Integração)', () => {
  let createdMotoristaId: string;

  it('Deve criar um novo motorista', async () => {
    const res = await request(app)
      .post('/motoristas')
      .send({ nome: 'Ayrton Senna', cnh: '123456' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdMotoristaId = res.body.id;
  });

  it('Deve listar todos os motoristas', async () => {
    const res = await request(app).get('/motoristas');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve buscar um motorista por ID', async () => {
    const res = await request(app).get(`/motoristas/${createdMotoristaId}`);

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Ayrton Senna');
    expect(res.body.id).toBe(createdMotoristaId);
  });

  it('Deve atualizar um motorista', async () => {
    const res = await request(app)
      .put(`/motoristas/${createdMotoristaId}`)
      .send({ nome: 'Senna do Brasil', cnh: '654321' });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Senna do Brasil');
  });

  it('Deve retornar 404 ao buscar motorista inexistente', async () => {
    const res = await request(app).get('/motoristas/id-que-nao-existe');
    expect(res.status).toBe(404);
  });

  it('Deve deletar um motorista', async () => {
    const res = await request(app).delete(`/motoristas/${createdMotoristaId}`);
    expect(res.status).toBe(204);

    const check = await request(app).get(`/motoristas/${createdMotoristaId}`);
    expect(check.status).toBe(404);
  });
});