import {
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { AgendaController } from './controller/agenda.controller';
import { AgendaService } from './services/agenda.service';

describe('AgendaController', () => {
  let agendaController: AgendaController;
  let agendaService: AgendaService;

  beforeEach(() => {
    agendaService = new AgendaService();
    agendaController = new AgendaController(agendaService);
  });

  describe('getMedicos', () => {
    it('deve retornar os médicos disponibilizados pelo serviço', () => {
      const medicos = [
        {
          id: 1,
          nome: 'Dr. João Silva',
          especialidade: 'CARDIOLOGISTA',
          horarios_disponiveis: [
            '2026-06-10 09:00',
            '2026-06-10 10:00',
          ],
        },
      ];

      jest
        .spyOn(agendaService, 'getMedicos')
        .mockReturnValue(medicos);

      const resultado = agendaController.getMedicos();

      expect(resultado).toEqual(medicos);
      expect(agendaService.getMedicos).toHaveBeenCalledTimes(1);
    });

    it('deve delegar a consulta dos médicos para o AgendaService', () => {
      const medicos = [
        {
          id: 1,
          nome: 'Dr. João Silva',
          especialidade: 'CARDIOLOGISTA',
          horarios_disponiveis: [
            '2026-06-10 09:00',
          ],
        },
      ];

      jest
        .spyOn(agendaService, 'getMedicos')
        .mockReturnValue(medicos);

      agendaController.getMedicos();

      expect(agendaService.getMedicos).toHaveBeenCalledTimes(1);
    });
  });
});