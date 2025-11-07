# 🖥️ VM Challenge

Desafio Fullstack composto por **Backend (Spring Boot)** e **Frontend (Angular)** para o gerenciamento de **Máquinas Virtuais (VMs)**.  
O sistema permite **criar, listar, consultar e atualizar o status** das instâncias de VMs.

---

## ⚙️ Backend

API desenvolvida em **Java 21** com **Spring Boot 3**.

### 🧩 Tecnologias Utilizadas
- **Java 21**
- **Spring Boot 3**
- **Spring Web**
- **Spring Data JPA**
- **Validation (Jakarta)**
- **Lombok**
- **H2 Database (em memória)**

---

### 🚀 Como Executar o Projeto

#### ✅ Pré-requisitos
- Java 21 instalado  
- Maven (ou usar o wrapper incluso: `./mvnw`)

#### ▶️ Passos para rodar

```bash
# Clonar o repositório e acessar a pasta
git clone https://github.com/<seu-usuario>/vm-challenge.git
cd vm-challenge

# Executar a aplicação
./mvnw spring-boot:run
```

A API ficará disponível em:  
👉 [http://localhost:8080](http://localhost:8080)

#### 💾 Console do Banco H2
- URL: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)  
- **JDBC URL:** `jdbc:h2:mem:vmdb`  
- **Usuário:** `sa`  
- **Senha:** *(em branco)*

---

### 🔌 Endpoints Principais

#### ➕ Criar VM
**POST** `/vms`
```json
{
  "name": "vm-api-01",
  "cpu": 2,
  "memoryMb": 4096,
  "diskGb": 50,
  "region": "us-east-1"
}
```

**Resposta:**
```json
{
  "id": "xxxx-xxxx-xxxx",
  "name": "vm-api-01",
  "cpu": 2,
  "memoryMb": 4096,
  "diskGb": 50,
  "region": "us-east-1",
  "status": "PROVISIONING"
}
```

#### 📋 Listar todas as VMs
**GET** `/vms`

#### 🔎 Consultar VM por ID
**GET** `/vms/{id}`

#### 🔄 Atualizar Status da VM
**PATCH** `/vms/{id}/status`
```json
{ "status": "RUNNING" }
```

#### 🔁 Regras de Transição de Status

| Estado Atual  | Próximos Permitidos     |
|----------------|-------------------------|
| PROVISIONING   | RUNNING, ERROR          |
| RUNNING        | STOPPED, ERROR          |
| STOPPED        | RUNNING, ERROR          |
| ERROR          | RUNNING, STOPPED        |

---

### 💻 Exemplo (PowerShell)
```powershell
$body = @{
  name = "vm-api-01"
  cpu = 2
  memoryMb = 4096
  diskGb = 50
  region = "us-east-1"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:8080/vms" -ContentType "application/json" -Body $body
```

---

### 🧠 Observações
- O banco **H2** é recriado a cada inicialização.  
- As validações garantem que CPU, memória e disco sejam maiores que zero.  
- Apenas as funcionalidades do desafio foram implementadas.

---

### 👨‍💻 Autor
Desenvolvido por **Gabriel** como parte do desafio *VM Challenge*.

---

## 💻 Frontend

Interface web desenvolvida em **Angular 17**, responsável pela gestão e controle de VMs.

---

### ⚙️ Tecnologias
- **Angular 17**
- **TypeScript**
- **Chart.js + ng2-charts**
- **HTML + SCSS**

---

### 📂 Estrutura do Projeto
```
src/
 ├── app/
 │   ├── core/              # Serviços, guardas e navbar
 │   │   ├── auth.guard.ts
 │   │   ├── auth.service.ts
 │   │   └── navbar.component.ts
 │   ├── dashboard/         # Tela inicial com gráficos e métricas
 │   ├── login/             # Tela de login básico
 │   ├── vm-list/           # Listagem de VMs e ações
 │   ├── vm-create/         # Cadastro de nova VM
 │   ├── models/            # Tipos e interfaces (VM)
 │   ├── app.routes.ts      # Rotas principais
 │   └── app.config.ts      # Configuração de módulos
 ├── assets/                # Ícones, estilos globais
 ├── main.ts                # Ponto de entrada
 └── index.html             # Template raiz
```

---

### ▶️ Instalação e Execução
```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/vm-frontend.git
cd vm-frontend

# Instalar dependências
npm install

# Rodar aplicação
npm start
```

A aplicação estará disponível em:  
👉 [http://localhost:4200](http://localhost:4200)

---

### 🔐 Login
A autenticação é local e simples.  
Pode ser usado qualquer e-mail e senha.

**Exemplo:**
```
Email: user@teste.com
Senha: 123
```

---

### 🧩 Funcionalidades

#### 🔹 Login
- Validação de formato de e-mail  
- Redireciona para o Dashboard

#### 🔹 Dashboard
- Exibe métricas gerais:
  - Total de VMs
  - Quantidade por status (RUNNING, STOPPED, ERROR)
- Gráficos interativos (barras e pizza)

#### 🔹 Listagem de VMs
- Mostra todas as VMs cadastradas  
- Ações disponíveis:
  - Iniciar / Pausar / Parar / Excluir  
- Atualizações refletem em tempo real no LocalStorage  

#### 🔹 Cadastro de VM
- Valida campos obrigatórios:
  - Nome (mín. 5 caracteres)
  - CPU, Memória, Disco, Região  
- Impede criação se já houver 5 VMs  
- Redireciona para listagem após salvar  

#### 🔹 Logout
- Disponível na Navbar  
- Redireciona para tela de login  

---

### 🧠 Observações Técnicas
- As VMs são armazenadas no **LocalStorage** (`key: vms`)  
- Estrutura pronta para integração com o backend Spring Boot via `HttpClient`  
- Rotas protegidas com `AuthGuard`  
- Projeto **100% standalone** (sem `NgModules`)

---

### 🧾 Scripts Úteis

| Comando        | Descrição                     |
|----------------|-------------------------------|
| `npm start`    | Inicia o servidor local       |
| `npm run build`| Gera build de produção        |
| `npm run lint` | Executa verificação de código |
| `npm audit`    | Verifica vulnerabilidades     |

---

## 🏁 Conclusão
O **VM Challenge** foi desenvolvido com foco em **simplicidade, clareza e completude**, implementando todas as telas e fluxos obrigatórios com UX consistente e integração funcional entre o **frontend Angular** e o **backend Spring Boot**.
