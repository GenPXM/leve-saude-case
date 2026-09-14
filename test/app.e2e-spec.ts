import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '../src/app.module';

describe('Leve Saúde API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /agendas', () => {
    it('deve retornar a lista de médicos', async () => {
      const response = await request(app.getHttpServer())
        .get('/agendas')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);

      expect(response.body[0]).toEqual({
        id: 1,
        nome: 'Dr. João Silva',
        especialidade: 'CARDIOLOGISTA',
        horarios_disponiveis: [
          '2026-06-10 09:00',
          '2026-06-10 10:00',
          '2026-06-10 11:00',
        ],
      });
    });
  });

  describe('POST /agendamento', () => {
    it('deve criar um agendamento com sucesso', async () => {
      const response = await request(app.getHttpServer())
        .post('/agendamento')
        .send({
          agendamento: {
            medico_id: 1,
            paciente: 'Carlos Almeida',
            data_horario: '2026-06-10 09:00',
          },
        })
        .expect(201);

      expect(response.body).toEqual({
        mensagem: 'Agendamento realizado com sucesso',
        agendamento: {
          id: expect.any(String),
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: '2026-06-10 09:00',
        },
      });
    });

    it('deve retornar 404 quando o médico não existir', async () => {
      const response = await request(app.getHttpServer())
        .post('/agendamento')
        .send({
          agendamento: {
            medico_id: 999,
            paciente: 'Carlos Almeida',
            data_horario: '2026-06-10 09:00',
          },
        })
        .expect(404);

      expect(response.body).toEqual({
        erro: 'Médico não encontrado',
        mensagem: 'O médico informado não foi encontrado.',
      });
    });

    it('deve retornar 409 quando o horário não estiver disponível', async () => {
      const response = await request(app.getHttpServer())
        .post('/agendamento')
        .send({
          agendamento: {
            medico_id: 1,
            paciente: 'Carlos Almeida',
            data_horario: '2026-06-10 12:00',
          },
        })
        .expect(409);

      expect(response.body).toEqual({
        erro: 'Horário indisponível',
        mensagem:
          'O horário solicitado não está mais disponível para este médico.',
      });
    });

    it('deve retornar 409 quando o horário já estiver agendado', async () => {
      const agendamento = {
        agendamento: {
          medico_id: 1,
          paciente: 'Carlos Almeida',
          data_horario: '2026-06-10 10:00',
        },
      };

      await request(app.getHttpServer())
        .post('/agendamento')
        .send(agendamento)
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/agendamento')
        .send({
          agendamento: {
            medico_id: 1,
            paciente: 'Outro Paciente',
            data_horario: '2026-06-10 10:00',
          },
        })
        .expect(409);

      expect(response.body).toEqual({
        erro: 'Horário indisponível',
        mensagem:
          'O horário solicitado não está mais disponível para este médico.',
      });
    });
  });
});
