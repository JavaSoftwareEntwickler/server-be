import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { Preventivo } from '../models/preventivo';

export class PdfService {

    public async generaPreventivo(preventivo: Preventivo): Promise<Buffer> {
        console.log({ preventivo });
        const html = this.buildHtml(preventivo);

        const browser = await puppeteer.launch({});
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfUint8 = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: `<span></span>`,
            footerTemplate: `
          <div style="font-size:10px; width:100%; text-align:center;">
            Pagina <span class="pageNumber"></span> di <span class="totalPages"></span>
          </div>
        `,
            margin: {
                top: '30mm',
                bottom: '25mm',
                left: '10mm',
                right: '10mm'
            }
        });

        await browser.close();

        return Buffer.from(pdfUint8);
    }


    private buildHtml(preventivo: Preventivo): string {
        const templatePath = path.join(__dirname, 'templates/preventivo.html');
        let html = fs.readFileSync(templatePath, 'utf8');
        const righeHtml = preventivo.righe.map(r => `
      <tr>
        <td>${r.descrizione}</td>
        <td>${r.um}</td>
        <td>${r.quantita}</td>
        <td>${r.importo}</td>
        <td>${r.importoTotale}</td>
      </tr>
    `).join('');

        html = html
            .replace('{{ nomeCliente }}', preventivo.nomeCliente)

            .replace('{{ dataPreventivo }}', new Date(preventivo.dataPreventivo).toLocaleDateString('it-IT'))
            .replace('{{ importoTotale }}', preventivo.importoTotale.toString())
            .replace('{{ righe }}', righeHtml);

        // Aggiungi la sezione note a fine preventivo
        const percAcconto = 31;
        // arrotonda acconto ai 10 € superiori
        const acconto = Math.ceil((preventivo.importoTotale * percAcconto / 100) / 10) * 10;
        const raw = Math.round(((acconto / preventivo.importoTotale) * 100) * 10) / 10;
        const percentualeReale = raw % 1 === 0 ? Math.trunc(raw) : raw;

        const noteFinali = `
      <div class="note-finali">
        <b>1. Prezzi:</b> Tutti i prezzi si intendono <u>IVA esclusa.</u><br>
        <b>2. Acconto:</b> <u>Acconto richiesto: {{ acconto }}</u>, pari a circa il {{ percentualeReale }}% dell'importo totale, <u>da versare al momento dell'accettazione.</u><br>
        <b>3. Smaltimento materiali:</b> I costi relativi a macerie o materiali di risulta sono stimati e potranno essere aggiornati in base al reale volume prodotto.<br>
        <b>4. Variazioni:</b> Eventuali variazioni in corso d'opera saranno oggetto di aggiornamento del presente preventivo.<br>
        <b>5. Lavori in economia:</b> Prezzo in economia: €125/giorno per ogni operaio impiegato (esclusi materiali).<br>
        <b>6. Trasporti:</b> I costi di trasporto sono esclusi e verranno conteggiati separatamente al costo di 0,50 €/km.<br>
        <b>7. Lavori non prevedibili:</b> Il preventivo non include lavorazioni non rilevabili durante il sopralluogo.<br>
        <b>8. Richieste extra:</b> Eventuali richieste aggiuntive saranno valutate e quotate separatamente.<br>
        <b>9. Ritardi non imputabili:</b> L’impresa non è responsabile per ritardi dovuti a cause esterne, condizioni meteo avverse o forza maggiore.<br>
        <b>10. Tempi di consegna:</b> La tempistica sarà definita in base alla disponibilità del cantiere.<br>
        <b>11. Aggiornamento prezzi:</b> In caso di variazioni significative dei costi, l’impresa si riserva il diritto di aggiornare i prezzi.<br>
        <b>12. Validità del preventivo:</b> Il presente preventivo ha validità di 30 giorni dalla data di emissione.<br>
        <b>13. Normative:</b> I lavori saranno eseguiti nel rispetto delle normative vigenti in materia di sicurezza e qualità.<br>
      </div>
    `;
        html = html.replace('</body>', `${noteFinali}</body>`);

        html = html
            .replace('{{ acconto }}', `${acconto}`)
            .replace('{{ percentualeReale }}', `${percentualeReale}`);



        // Includi CSS inline
        const cssPath = path.join(__dirname, 'styles/print.css');
        const css = fs.readFileSync(cssPath, 'utf8');
        html = html.replace('</head>', `<style>${css}</style></head>`);

        // Logo come base64
        const logoPath = path.join(__dirname, 'templates/logo.png');
        const logoBase64 = fs.readFileSync(logoPath).toString('base64');
        html = html.replace(
            'logo.png',
            `data:image/png;base64,${logoBase64}`
        );

        return html;
    }
}
