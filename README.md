# 📂 Bacula Log Archiver — Google Apps Script

> Automação para capturar logs de backup do Bacula recebidos via Gmail, convertê-los em PDFs estilizados e organizá-los automaticamente no Google Drive.

---

## 📌 Visão Geral

Scripts de backup como o **Bacula** enviam logs por e-mail após cada execução. Com o tempo, esses e-mails se acumulam na caixa de entrada e tornam a auditoria de backups trabalhosa.

Este script resolve isso de forma automática:

1. Lê os e-mails com um marcador específico no Gmail (ex: `Backup HAMA`)
2. Converte cada e-mail em um **PDF estilizado** com cabeçalho e corpo monoespaçado
3. Organiza os PDFs no Google Drive em **pastas por data**
4. Arquiva os e-mails processados, mantendo a caixa de entrada limpa

---

## 🚀 Funcionalidades

- ✅ Leitura de e-mails por marcador do Gmail
- ✅ Conversão de e-mail em PDF com CSS customizado (fonte monoespaçada para logs)
- ✅ Organização automática em subpastas por data (`yyyy-MM-dd`)
- ✅ Suporte a anexos extras (além do corpo do e-mail)
- ✅ Arquivamento automático após processamento
- ✅ Remoção do marcador após arquivamento (evita reprocessamento)

---

## 🗂️ Estrutura no Google Drive

Após a execução, os arquivos são organizados assim:

```
📁 Pasta Pai (ex: Logs Bacula)
└── 📁 2025-06-10
│   ├── 📄 Backup_Job_FileSet_A.pdf
│   └── 📄 Backup_Job_FileSet_B.pdf
└── 📁 2025-06-11
    └── 📄 Backup_Job_FileSet_C.pdf
```

---

## ⚙️ Pré-requisitos

- Conta Google com acesso ao **Google Apps Script**
- Gmail com os logs do Bacula recebendo um **marcador/label** específico
- Uma pasta criada no **Google Drive** para servir de destino

---

## 🛠️ Como Configurar

### 1. Crie o projeto no Apps Script

Acesse [script.google.com](https://script.google.com) → **Novo Projeto** → cole o conteúdo do arquivo `bacula-log-archiver.gs`.

### 2. Configure as variáveis

No início da função principal, ajuste:

```javascript
var nomeMarcador = "Backup HAMA";   // Nome exato do marcador no Gmail
var pastaPaiId   = "SEU_ID_AQUI";  // ID da pasta de destino no Google Drive
```

> 💡 **Como obter o ID da pasta no Drive:** abra a pasta no navegador. O ID é a sequência de caracteres após `/folders/` na URL.

### 3. Autorize as permissões

Na primeira execução, o Google pedirá permissão para acessar Gmail e Drive. Clique em **Permitir**.

### 4. (Opcional) Configure um gatilho automático

Para rodar o script diariamente de forma automática:

- No Apps Script, vá em **Gatilhos** (ícone de relógio)
- Clique em **+ Adicionar gatilho**
- Configure: `salvarLogsBaculaComoPDFEstilizado` → **Com base no tempo** → **Diário**

---

## 📄 Saída — Formato do PDF

Cada PDF gerado contém:

```
┌────────────────────────────────────────────────┐
│  Relatório de Backup: [Assunto do E-mail]      │
│  Data do E-mail: [Data]                        │
│  Remetente: [E-mail do Bacula]                 │
├────────────────────────────────────────────────┤
│                                                │
│  [Corpo do e-mail em fonte monoespaçada,       │
│   preservando identação e estrutura do log]    │
│                                                │
└────────────────────────────────────────────────┘
```

---

## ⚠️ Limitações Conhecidas

| Limitação | Detalhe |
|---|---|
| Re-execução duplica arquivos | Não há verificação se o PDF já existe. Execute apenas uma vez por lote ou implemente checagem manual. |
| Fuso horário fixo | O fuso `GMT-3` está hardcoded. Altere se necessário. |
| Quota do Apps Script | O Google limita execuções a ~6 min. Grandes volumes de e-mails podem exigir execuções em lote. |

---

## 🔧 Melhorias Planejadas

- [ ] Verificação de duplicatas antes de criar o PDF
- [ ] Fuso horário configurável como constante no topo do script
- [ ] Tratamento de erros por e-mail (falha em um não interrompe os demais)
- [ ] Suporte a múltiplos marcadores/servidores
- [ ] Log de execução salvo no Drive

---

## 🧰 Stack

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Gmail API](https://img.shields.io/badge/Gmail%20API-EA4335?style=for-the-badge&logo=gmail&logoColor=white)
![Google Drive](https://img.shields.io/badge/Google%20Drive-34A853?style=for-the-badge&logo=googledrive&logoColor=white)
![Bacula](https://img.shields.io/badge/Bacula-Backup%20%26%20Recovery-blue?style=for-the-badge)

---

## 📜 Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para mais detalhes.

---

## 👤 Autor

**Fernando S. De Santana Júnior**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/fernando-junior-1a74ab29b/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/fernando-msa)
