import { Injectable } from '@nestjs/common';

import {
  Agendamento,
} from '../services/agendamento.service';

import { AgendamentoRepository } from './agendamento.repository';

@Injectable()
export class AgendamentoMemoryRepository
  implements AgendamentoRepository
{
  private readonly agendamentos: Agendamento[] = [];

  salvar(agendamento: Agendamento): void {
    this.agendamentos.push(agendamento);
  }

  existePorMedicoEHorario(
    medicoId: number,
    dataHorario: string,
  ): boolean {
    return this.agendamentos.some(
      (agendamento) =>
        agendamento.medico_id === medicoId &&
        agendamento.data_horario === dataHorario,
    );
  }
}