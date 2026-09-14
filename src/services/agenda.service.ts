import { Injectable } from '@nestjs/common';
import data from '../utils/list.json';
@Injectable()
export class AgendaService {
  getMedicos() {
    return data.medicos.map((medico: { especialidade: string; }) => ({
      ...medico,
      especialidade: medico.especialidade.toUpperCase(),
    }));
  }
}