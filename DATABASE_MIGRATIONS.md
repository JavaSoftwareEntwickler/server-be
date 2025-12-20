# 🗄️ Gestione Database con TypeORM (SQLite)

## Fase 1 – Sviluppo iniziale (NO migration)

Durante le prime fasi di sviluppo, quando il modello dati cambia spesso, è accettabile usare:

```ts
synchronize: true
````

### Configurazione DataSource (DEV)

```ts
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'preventivi.db',
    synchronize: true,
    logging: true,
    entities: [Preventivo, RighePreventivo],
});
```

### Note

* Il database viene aggiornato automaticamente
* In caso di problemi è possibile eliminare il file `.db`
* **NON usare questa configurazione in produzione**

---

## Fase 2 – Passaggio a migration (progetto stabile)

Quando il modello dati diventa stabile, è necessario passare alle **migration**.

---

## Step 1 – Disabilitare `synchronize`

```ts
synchronize: false
```

Configurazione corretta:

```ts
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'preventivi.db',
    synchronize: false,
    logging: true,
    entities: [Preventivo, RighePreventivo],
    migrations: ['src/migrations/*.ts'],
});
```

---

## Step 2 – Creare cartella migrations

```bash
mkdir src/migrations
```

---

## Step 3 – Installare tool CLI TypeORM (se necessario)

```bash
npm install -D typeorm-ts-node-commonjs
```

---

## Step 4 – Aggiungere script npm

```json
"scripts": {
    "typeorm": "typeorm-ts-node-commonjs",
    "migration:generate": "npm run typeorm -- migration:generate",
    "migration:run": "npm run typeorm -- migration:run",
    "migration:revert": "npm run typeorm -- migration:revert"
}
```

---

## Step 5 – Generare una migration

Dopo aver modificato o aggiunto una entity:

```bash
npm run migration:generate -- \
  src/migrations/NomeMigration \
  -d src/config/data-source.ts
```

Esempio:

```bash
npm run migration:generate -- \
  src/migrations/AddIndirizzoToPreventivo \
  -d src/config/data-source.ts
```

TypeORM confronterà **entity vs database** e genererà automaticamente lo SQL.

---

## Step 6 – Eseguire le migration

```bash
npm run migration:run
```

Questo comando:

* applica le migration
* aggiorna lo schema
* salva lo stato nella tabella `migrations`

---

## Step 7 – Rollback (opzionale)

Per annullare l’ultima migration:

```bash
npm run migration:revert
```

---

## Best Practices

* ❌ Non usare `synchronize: true` in produzione
* ✅ Ogni modifica al DB deve avere una migration
* ✅ Le entity descrivono lo schema
* ✅ Le migration rappresentano la storia del database
* ❌ Non modificare mai il DB manualmente

---

## TL;DR

| Ambiente          | Strategia           |
| ----------------- | ------------------- |
| Sviluppo iniziale | `synchronize: true` |
| Progetto stabile  | Migration           |
| Produzione        | Solo migration      |

---

## Nota finale

Una volta attivate le migration:

* **NON cancellare il database**
* usare solo `migration:run` per aggiornamenti
* versionare sempre le migration nel repository
