import { Agendamento } from '../services/agendamento.service';

export abstract class AgendamentoRepository {
  abstract salvar(agendamento: Agendamento): void;

  abstract existePorMedicoEHorario(
    medicoId: number,
    dataHorario: string,
  ): boolean;
}
