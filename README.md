### 🚀 Como Executar o Projeto

#### Pré-requisitos
* **Docker e Docker Compose** instalados (recomendado).
* **Node.js** v18+ (caso prefira rodar localmente).

#### Instalação e Boot
1. Clone o repositório:
   ```bash
   git clone https://github.com/EleEVeryZe/frota-backend && cd frota-backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

#### 🧪 Testando a Aplicação (Fluxo Completo)
Para facilitar a avaliação, incluí um script de automação em **Bash** que sobe o ambiente via Docker, aguarda a API responder e executa um fluxo completo. 

**Para rodar o teste automatizado:**
```bash
chmod +x request.bash
./request.bash
```


## 🛣️ Endpoints Principais (`api/v1`)

| Recurso | Método | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Motoristas** | `POST` | `/motoristas` | Cadastra um novo condutor |
| | `GET` | `/motoristas` | Lista todos (suporta filtro `?nome=`) |
| **Automóveis** | `POST` | `/automoveis` | Cadastra um novo veículo |
| | `GET` | `/automoveis` | Lista todos (filtros `?cor=` e `?marca=`) |
| **Utilização** | `POST` | `/registros-uso` | Vincula motorista a veículo (Retirada) |
| | `PATCH` | `/registros-uso/:id/finalizar` | Registra a entrega do veículo |

---