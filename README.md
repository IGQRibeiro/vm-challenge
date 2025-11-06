# vm-challenge

API desenvolvida em **Java 21** com **Spring Boot**, para o desafio de programação.  
O sistema gerencia Máquinas Virtuais (VMs), permitindo cadastrar, listar, consultar e atualizar o status de cada instância.

---

## ⚙️ Tecnologias utilizadas
- **Java 21**
- **Spring Boot 3**
- **Spring Web**
- **Spring Data JPA**
- **Validation (Jakarta)**
- **Lombok**
- **H2 Database (em memória)**

---

## 🚀 Como executar o projeto

### Pré-requisitos
- Java 21 instalado
- Maven (ou usar o wrapper incluído: `./mvnw`)

### Passos para rodar

1. Clone o repositório e acesse a pasta:
   ```bash
   git clone https://github.com/<seu-usuario>/vm-challenge.git
   cd vm-challenge
Execute a aplicação:

bash
Copiar código
./mvnw spring-boot:run
A API ficará disponível em:

arduino
Copiar código
http://localhost:8080
Console do banco H2:

bash
Copiar código
http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:vmdb

Usuário: sa

Senha: (em branco)

🧩 Endpoints principais
➕ Criar VM
POST /vms

json
Copiar código
{
"name": "vm-api-01",
"cpu": 2,
"memoryMb": 4096,
"diskGb": 50,
"region": "us-east-1"
}
Resposta:

json
Copiar código
{
"id": "xxxx-xxxx-xxxx",
"name": "vm-api-01",
"cpu": 2,
"memoryMb": 4096,
"diskGb": 50,
"region": "us-east-1",
"status": "PROVISIONING"
}
📋 Listar todas as VMs
GET /vms

🔎 Consultar VM por ID
GET /vms/{id}

🔄 Atualizar status da VM
PATCH /vms/{id}/status

Body:

json
Copiar código
{ "status": "RUNNING" }
🔄 Regras de transição de status
Estado atual	Próximos permitidos
PROVISIONING	RUNNING, ERROR
RUNNING	STOPPED, ERROR
STOPPED	RUNNING, ERROR
ERROR	RUNNING, STOPPED

💻 Exemplo de uso (PowerShell)
powershell
Copiar código
$body = @{
name = "vm-api-01"; cpu = 2; memoryMb = 4096; diskGb = 50; region = "us-east-1"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:8080/vms" -ContentType "application/json" -Body $body
🧠 Observações
O banco H2 é recriado a cada inicialização.

As validações garantem que CPU, memória e disco sejam maiores que zero, e os campos obrigatórios estejam preenchidos.

Não foram adicionadas features extras além do especificado no desafio.

👨‍💻 Autor
Desenvolvido por Gabriel como parte do desafio vm-challenge.

yaml
Copiar código

---

pronto — é só colar isso no `README.md`, salvar e fazer o commit:

```bash
git add README.md
git commit -m "docs: add project README"