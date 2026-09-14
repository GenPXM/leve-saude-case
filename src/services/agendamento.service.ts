import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import Medicos from '../utils/list.json';

import { HorarioIndisponivelError } from '../errors/horario-indisponivel.error';
import { MedicoNaoEncontradoError } from '../errors/medico-nao-encontrado.error';
import { AgendamentoRepository } from '../repositories/agendamento.repository';

export interface CriarAgendamento {
  medico_id: number;
  paciente: string;
  data_horario: string;
}

export interface Agendamento {
  id: string;
  medico_id: number;
  medico: string;
  paciente: string;
  data_horario: string;
}

export interface AgendamentoResponse {
  mensagem: string;
  agendamento: {
    id: string;
    medico: string;
    paciente: string;
    data_horario: string;
  };
}

@Injectable()
export class AgendamentoService {
  constructor(
    private readonly agendamentoRepository: AgendamentoRepository,
  ) {}

  criar(data: CriarAgendamento): AgendamentoResponse {
    const medico = Medicos.medicos.find(
      (item) => item.id === data.medico_id,
    );

    if (!medico) {
      throw new MedicoNaoEncontradoError(data.medico_id);
    }

    const horarioDisponivel = medico.horarios_disponiveis.includes(
      data.data_horario,
    );

    if (!horarioDisponivel) {
      throw new HorarioIndisponivelError();
    }

    const horarioOcupado =
      this.agendamentoRepository.existePorMedicoEHorario(
        data.medico_id,
        data.data_horario,
      );

    if (horarioOcupado) {
      throw new HorarioIndisponivelError();
    }

    const agendamento: Agendamento = {
      id: randomUUID(),
      medico_id: medico.id,
      medico: medico.nome,
      paciente: data.paciente,
      data_horario: data.data_horario,
    };

    this.agendamentoRepository.salvar(agendamento);

    return {
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: {
        id: agendamento.id,
        medico: agendamento.medico,
        paciente: agendamento.paciente,
        data_horario: agendamento.data_horario,
      },
    };
  }
}