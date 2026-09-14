# Leve Saúde API

API REST para consulta de médicos e realização de agendamentos.

O projeto foi desenvolvido com **NestJS + TypeScript**, preparado para execução em **AWS Lambda + API Gateway** através do Serverless Framework, com suporte para execução local utilizando `serverless-offline`.

---

## Tecnologias

- Node.js
- TypeScript
- NestJS
- AWS Lambda
- AWS API Gateway
- Serverless Framework
- Serverless Offline
- Jest
- Supertest
- ESLint
- Prettier
- Swagger / OpenAPI

---

## Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

- Node.js
- npm

Verifique as versões instaladas:

```bash
node --version
npm --version
```

---

## Instalação

Clone o projeto:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto:

```bash
cd leve-saude
```

Instale as dependências:

```bash
npm install
```

---

# Execução

## Desenvolvimento

Para executar a aplicação em modo desenvolvimento:

```bash
npm run start:dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

O modo `--watch` permite que alterações no código sejam detectadas automaticamente.

---

## Serverless Offline

O projeto também pode ser executado através do Serverless Framework utilizando o plugin `serverless-offline`.

Execute:

```bash
npm run serverless
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

O `serverless-offline` permite simular localmente o funcionamento do AWS Lambda e API Gateway durante o desenvolvimento.

---

# Swagger

A documentação da API está disponível através do Swagger.

Com a aplicação em execução, acesse:

```text
http://localhost:3000/api
```

A interface permite visualizar os endpoints disponíveis e realizar requisições diretamente pela documentação.

---

# Endpoints

## GET /agendas

Retorna a lista de médicos e seus respectivos horários disponíveis.

### Requisição

```http
GET /agendas
```

### Resposta

```json
[
  {
    "id": 1,
    "nome": "Dr. João Silva",
    "especialidade": "CARDIOLOGISTA",
    "horarios_disponiveis": [
      "2026-06-10 09:00",
      "2026-06-10 10:00",
      "2026-06-10 11:00"
    ]
  },
  {
    "id": 2,
    "nome": "Dra. Maria Souza",
    "especialidade": "DERMATOLOGISTA",
    "horarios_disponiveis": [
      "2026-06-11 14:00",
      "2026-06-11 15:00"
    ]
  }
]
```

---

# POST /agendamento

Cria um novo agendamento para um paciente.

### Requisição

```http
POST /agendamento
Content-Type: application/json
```

### Body

```json
{
  "agendamento": {
    "medico_id": 1,
    "paciente": "Carlos Almeida",
    "data_horario": "2026-06-10 09:00"
  }
}
```

### Resposta de sucesso

HTTP `201 Created`

```json
{
  "mensagem": "Agendamento realizado com sucesso",
  "agendamento": {
    "id": "uuid-gerado",
    "medico": "Dr. João Silva",
    "paciente": "Carlos Almeida",
    "data_horario": "2026-06-10 09:00"
  }
}
```

---

## Médico não encontrado

Quando o `medico_id` informado não existir:

HTTP `404 Not Found`

```json
{
  "erro": "Médico não encontrado",
  "mensagem": "O médico informado não foi encontrado."
}
```

---

## Horário indisponível

Quando o horário solicitado não estiver disponível para o médico:

HTTP `409 Conflict`

```json
{
  "erro": "Horário indisponível",
  "mensagem": "O horário solicitado não está mais disponível para este médico."
}
```

O mesmo erro é retornado quando o horário já tiver sido utilizado em um agendamento anterior.

---

# Testes

O projeto possui testes unitários e testes end-to-end.

## Testes unitários

Executar:

```bash
npm test
```

Os testes unitários validam os componentes da aplicação de forma isolada.

---

## Testes E2E

Executar:

```bash
npm run test:e2e
```

Os testes E2E inicializam o `AppModule` real e realizam requisições HTTP utilizando Supertest.

São cobertos cenários como:

- consulta de médicos;
- criação de agendamento;
- médico inexistente;
- horário indisponível;
- tentativa de utilizar novamente um horário já agendado.

---

## Executar todos os testes

Para executar os testes unitários e E2E:

```bash
npm run test:all
```

O comando executa:

```text
Testes unitários
      ↓
Testes E2E
```

---

## Testes em modo watch

```bash
npm run test:watch
```

---

## Cobertura de testes

```bash
npm run test:cov
```

O relatório de cobertura será gerado pelo Jest.

---

# Qualidade de código

## ESLint

O projeto utiliza ESLint para análise estática do código TypeScript.

Executar:

```bash
npm run lint
```

Para aplicar correções automáticas:

```bash
npm run lint:fix
```

O projeto também possui regra para impedir o uso explícito de `any`.

---

## Prettier

O projeto utiliza Prettier para padronização da formatação do código.

Para formatar os arquivos:

```bash
npm run format
```

Para verificar a formatação:

```bash
npm run format:check
```

---

# Build

Para gerar a versão compilada:

```bash
npm run build
```

Os arquivos compilados serão gerados no diretório:

```text
dist/
```

---

# Estrutura do projeto

```text
src/
├── controller/
│   ├── agenda.controller.ts
│   └── agendamento.controller.ts
│
├── dtos/
│   └── criar-agendamento.dto.ts
│
├── errors/
│   ├── horario-indisponivel.error.ts
│   └── medico-nao-encontrado.error.ts
│
├── filters/
│   └── agendamento-exception.filter.ts
│
├── repositories/
│   ├── agendamento.repository.ts
│   └── agendamento-memory.repository.ts
│
├── services/
│   ├── agenda.service.ts
│   └── agendamento.service.ts
│
├── utils/
│   └── list.json
│
├── app.module.ts
└── main.ts

test/
├── app.e2e-spec.ts
└── jest-e2e.json
```

---

# Arquitetura

A aplicação utiliza separação de responsabilidades entre as camadas.

```text
AWS Lambda
    │
    ▼
main.handler
    │
    ▼
NestJS
    │
    ▼
Controller
    │
    ▼
Service
    │
    ├── Regras de negócio
    │
    └── Repository
          │
          ▼
    Memory Repository
```

## Lambda Handler

O handler Lambda é responsável pela integração entre AWS Lambda e a aplicação NestJS.

A lógica de negócio não fica no handler.

---

## Controllers

Os controllers são responsáveis por:

- receber requisições HTTP;
- receber os dados dos DTOs;
- delegar a execução aos services;
- retornar o resultado da operação.

Os controllers não possuem regras de negócio.

---

## Services

Os services concentram as regras de negócio da aplicação.

No fluxo de agendamento, o `AgendamentoService`:

1. localiza o médico;
2. valida a existência do médico;
3. verifica se o horário está disponível;
4. verifica se o horário já foi utilizado;
5. gera o identificador do agendamento;
6. solicita o armazenamento ao repository;
7. monta a resposta da operação.

---

## Repository

O acesso aos agendamentos é abstraído através de um repository.

A implementação atual utiliza memória:

```text
AgendamentoRepository
        ▲
        │
AgendamentoMemoryRepository
```

Essa abstração permite substituir posteriormente a implementação por uma solução de persistência, como banco de dados, sem alterar as regras de negócio do service.

---

## Erros de negócio

Os erros de negócio são representados por classes específicas:

```text
MedicoNaoEncontradoError
HorarioIndisponivelError
```

O `AgendamentoExceptionFilter` converte esses erros em respostas HTTP apropriadas:

```text
MedicoNaoEncontradoError
        ↓
HTTP 404

HorarioIndisponivelError
        ↓
HTTP 409
```

---

# Persistência

Para este projeto, os agendamentos são armazenados em memória.

Isso significa que os dados:

- não são persistidos em banco de dados;
- são perdidos quando a aplicação é reiniciada;
- são utilizados para controlar a disponibilidade durante a execução da aplicação.

Os médicos utilizados pela aplicação estão definidos no arquivo:

```text
src/utils/list.json
```

---

# Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo desenvolvimento |
| `npm run start:debug` | Inicia em modo debug |
| `npm run start:prod` | Executa a versão compilada |
| `npm run serverless` | Executa o Serverless Offline |
| `npm run build` | Compila o projeto |
| `npm run lint` | Executa o ESLint |
| `npm run lint:fix` | Corrige problemas automaticamente quando possível |
| `npm run format` | Formata o código com Prettier |
| `npm run format:check` | Verifica a formatação |
| `npm test` | Executa os testes unitários |
| `npm run test:e2e` | Executa os testes E2E |
| `npm run test:all` | Executa testes unitários e E2E |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run test:cov` | Executa testes com cobertura |

---

# Validação completa

Antes de realizar um commit, recomenda-se executar:

```bash
npm run lint
npm run format:check
npm run build
npm run test:all
```

Esses comandos validam:

- análise estática;
- formatação;
- compilação TypeScript;
- testes unitários;
- testes end-to-end.

---

# Princípios arquiteturais

O projeto foi estruturado considerando:

- TypeScript em toda a aplicação;
- tipagem forte;
- ausência de `any` explícito;
- separação de responsabilidades;
- controllers sem regras de negócio;
- Lambda handler sem regras de negócio;
- regras de negócio concentradas nos services;
- dependências injetadas pelo NestJS;
- Dependency Inversion através da abstração de repositories;
- erros de negócio semanticamente tipados;
- testes unitários;
- testes end-to-end;
- ESLint;
- Prettier;
- execução local compatível com Serverless/AWS Lambda.

---

# Fluxo de desenvolvimento

Para iniciar o projeto:

```bash
npm install
npm run start:dev
```

Para validar a qualidade do código:

```bash
npm run lint
npm run format:check
npm run build
npm run test:all
```

Para executar utilizando Serverless Offline:

```bash
npm run serverless
```

A documentação Swagger estará disponível em:

```text
http://localhost:3000/api
```

---

# Exemplo de fluxo completo

## 1. Iniciar a aplicação

```bash
npm run serverless
```

## 2. Consultar médicos

```bash
curl http://localhost:3000/agendas
```

## 3. Criar um agendamento

```bash
curl -X POST http://localhost:3000/agendamento \
  -H "Content-Type: application/json" \
  -d '{
    "agendamento": {
      "medico_id": 1,
      "paciente": "Carlos Almeida",
      "data_horario": "2026-06-10 09:00"
    }
  }'
```

## 4. Tentar agendar o mesmo horário novamente

```bash
curl -X POST http://localhost:3000/agendamento \
  -H "Content-Type: application/json" \
  -d '{
    "agendamento": {
      "medico_id": 1,
      "paciente": "Outro Paciente",
      "data_horario": "2026-06-10 09:00"
    }
  }'
```

A segunda tentativa deverá retornar:

```http
409 Conflict
```

Com:

```json
{
  "erro": "Horário indisponível",
  "mensagem": "O horário solicitado não está mais disponível para este médico."
}
```

---

# Licença

Este projeto foi desenvolvido como parte de um case técnico e está configurado como `UNLICENSED`.