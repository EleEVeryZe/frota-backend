# 🚗 Frota API - Seidor

Este projeto é uma **WebAPI** desenvolvida para o controle de utilização de automóveis de uma empresa. O sistema permite o gerenciamento de frotas, motoristas e o registro detalhado de quem utilizou qual veículo, garantindo a integridade das regras de negócio operacionais.

## 📋 Sobre o Projeto

O objetivo é permitir que a empresa tenha controle total sobre seus ativos (automóveis) e colaboradores (motoristas), evitando conflitos de uso e mantendo um histórico de utilização.

### Principais Funcionalidades
* **Gestão de Automóveis:** Cadastro, atualização, exclusão e listagem com filtros por cor e marca
* **Gestão de Motoristas:** Cadastro, atualização, exclusão e listagem com filtro por nome
* **Controle de Utilização:**
    * Registrar início de uso (com motivo e data)
    * Finalizar utilização (registro de data de término)
    * Listagem completa de registros com dados vinculados de motorista e veículo

### Regras de Negócio Implementadas
* **Exclusividade do Veículo:** Um automóvel só pode ser utilizado por um motorista por vez
* **Exclusividade do Motorista:** Um motorista que já esteja utilizando um automóvel não pode iniciar a utilização de outro simultaneamente

---

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução
* **Express.js:** Framework web para construção das rotas e middlewares
* **Persistência em Memória:** Armazenamento volátil dos dados para facilitar a execução imediata sem dependências de banco de dados externos
* **Jest** Para os testes de unidade e integração

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js instalado (versão recomendada: LTS).
* Gerenciador de pacotes (npm ou yarn).

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/EleEVeryZe/frota-backend
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd frota-backend 
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Executando a API
Para iniciar o servidor:
```bash
npm start
```
A API estará disponível em `http://localhost:4000` (ou a porta configurada).

### Executando os Testes
Para garantir que as regras de negócio e funcionalidades estão operacionais
```bash
npm test
```

---

## 🛣️ Endpoints Principais (Exemplos)
TODO: ADICIONAR ROTAS
---

## 📂 Estrutura de Dados

O sistema controla as seguintes informações:
* **Automóvel:** Placa, Cor e Marca
* **Motorista:** Nome
* **Utilização:** Data de início, data de término, motorista, automóvel e motivo