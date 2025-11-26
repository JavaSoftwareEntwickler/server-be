# Server Preventivi – Node.js + TypeScript + TypeORM

Backend progettato per la gestione dei preventivi, sviluppato con **Node.js**, **Express**, **TypeScript** e **TypeORM**.  
Il servizio espone API REST per la creazione e la consultazione dei preventivi ed è progettato per integrarsi facilmente in architetture enterprise o ambienti a microservizi.

---

## 🚀 Tecnologie Utilizzate

- **Node.js**
- **Express**
- **TypeScript**
- **TypeORM**
- **SQLite** (DB locale per sviluppo)
- **Nodemon**
- **CORS**

---

## 📁 Struttura del Progetto

```

root
│   app.ts
│   package.json
│   tsconfig.json
│   preventivi.db
│   .gitignore
│
├── db
│     └── data-source.ts
│
├── models
│     ├── IPreventivo.ts
│     ├── IRighePreventivo.ts
│     ├── preventivo.ts
│     └── righe-preventivo.ts
│
└── doc
└── come_crearlo.txt

````

---

## ⚙️ Setup del Progetto

### 1️⃣ Installazione dipendenze

```bash
npm install
````

---

## ▶️ Avvio in modalità sviluppo

```bash
npm run serve
```

Il server si avvierà sulla porta:

```
http://localhost:8088
```

---

## 🗄️ Configurazione del Database

Il progetto utilizza **SQLite** come DB locale.

Configura la connessione in:

```
/db/data-source.ts
```

```ts
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'preventivi.db',
    synchronize: true,
    logging: true,
    entities: [Preventivo, RighePreventivo]
});
```

---

## 📡 Endpoint REST Disponibili

### **GET /preventivi**

Restituisce l’elenco completo dei preventivi.

### **POST /preventivo/crea**

Crea un nuovo preventivo.

Payload richiesto:

```json
{
  "nomeCliente": "Mario Rossi",
  "dataPreventivo": "2025-01-10",
  "importoTotale": 1500
}
```

---

## 🧱 Modelli / Entità

### **Preventivo**

* id
* nomeCliente
* dataPreventivo
* importoTotale
* creatoIl
* modificatoIl

### **RighePreventivo**

* id
* descrizione
* quantita
* creatoIl
* modificatoIl

---

## 🧪 Testing (in arrivo)

Lo stack è predisposto per integrare:

* Jest
* Supertest
* Mock DB con SQLite memory

---

## 📦 Build (opzionale)

Per la produzione si consiglia:

* rimozione di `cors`
* build con `tsc`
* switch da SQLite ad un DB enterprise (PostgreSQL/MariaDB)

---

## 🔒 Note sulla Sicurezza

* Validazione payload consigliata (es. Zod/Joi)
* Disabilitare `synchronize=true` prima di andare in produzione
* Aggiungere rate limiting e helmet per hardening del server Express

---

## 💼 Maintainer

Progetto gestito dal team backend.
Per richieste o bug aprire una **issue** o contattare il maintainer designato.

---

## 📄 Licenza

MIT License

```