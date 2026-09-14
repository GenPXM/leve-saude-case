import { AgendaController } from './controller/agenda.controller';
import { AgendaService } from './services/agenda.service';

describe('AgendaController', () => {
  let agendaController: AgendaController;
  let agendaService: AgendaService;

  beforeEach(() => {
    agendaService = {
      getMedicos: jest.fn(),
    } as unknown as AgendaService;

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
            '2026-06-10 11:00',
          ],
        },
      ];

      jest.spyOn(agendaService, 'getMedicos').mockReturnValue(medicos);

      const resultado = agendaController.getMedicos();

      expect(resultado).toEqual(medicos);
      expect(agendaService.getMedicos).toHaveBeenCalledTimes(1);
    });

    it('deve delegar a consulta dos médicos para o AgendaService', () => {
      const medicos = [
        {
          id: 1,
          nome: 'Dr. João Silva',
          especialidade: 'Cardiologia',
          horarios_disponiveis: ['2026-06-10 09:00'],
        },
      ];

      jest.spyOn(agendaService, 'getMedicos').mockReturnValue(medicos);

      agendaController.getMedicos();

      expect(agendaService.getMedicos).toHaveBeenCalledTimes(1);
    });
  });
});
