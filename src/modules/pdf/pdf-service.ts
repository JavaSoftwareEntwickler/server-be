import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { Preventivo } from '../preventivi/models/preventivo.entity';

export class PdfService {

    public async generaPreventivo(preventivo: Preventivo): Promise<Buffer> {
        const html = this.buildHtml(preventivo);


        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Header HTML per tutte le pagine
        const headerHtml = `
            <div style="
                width:100%;
                display:flex;
                align-items:flex-start;
                justify-content:space-between;
                font-family: Arial, sans-serif;
                font-size:14px;
                padding: 0 10px;
            ">
                
                <!-- LOGO A SINISTRA -->
                <img src="data:image/png;base64,${this.getLogoBase64()}" style="width:300px;" />

                <!-- BOX A DESTRA -->
                <div style="
                    margin-left: 30px;
                    margin-top: 30px;
                    width:45%;
                    text-align:left;
                    line-height:1.4;
                ">

                    <div style="display:flex; margin-top:4px;margin-right:30px;">
                        <span style="min-width:90px;"><strong>Preventivo:</strong></span>
                        <span style="flex:1; border-bottom:1px dotted #000;">${preventivo.id}</span>
                    </div>
                    <div style="display:flex;margin-top:4px;margin-right:30px;">
                        <span style="min-width:90px;"><strong>Data:</strong></span>
                        <span style="flex:1; border-bottom:1px dotted #000;">
                            ${new Date(preventivo.dataPreventivo).toLocaleDateString('it-IT')}
                        </span>
                    </div>
                    <br/>

                    <div style="display:flex; margin-top:4px;margin-right:30px;">
                        <span style="min-width:90px;"><strong>Cliente:</strong></span>
                        <span style="flex:1; border-bottom:1px dotted #000;">
                            ${preventivo.nomeCliente}
                        </span>
                    </div>

                    <div style="display:flex; margin-top:4px;margin-right:30px;">
                        <span style="min-width:90px;"><strong>Indirizzo:</strong></span>
                        <span style="flex:1; border-bottom:1px dotted #000;">
                            ${preventivo.indirizzo}
                        </span>
                    </div>
                </div>
            </div>
            `;


        const pdfUint8 = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: headerHtml,
            footerTemplate: `
          <div style="font-size:10px; width:100%; text-align:center;">
            Pagina <span class="pageNumber"></span> di <span class="totalPages"></span>
          </div>
        `,
            margin: {
                top: '60mm',
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
            .replace('{{ indirizzo }}', preventivo.indirizzo)
            .replace('{{ dataPreventivo }}', new Date(preventivo.dataPreventivo).toLocaleDateString('it-IT'))
            .replace('{{ importoTotale }}', preventivo.importoTotale.toString())
            .replace('{{ righe }}', righeHtml);

        // Calcolo acconto
        const percAcconto = 31;
        const acconto = Math.ceil((preventivo.importoTotale * percAcconto / 100) / 10) * 10;
        const raw = Math.round(((acconto / preventivo.importoTotale) * 100) * 10) / 10;
        const percentualeReale = raw % 1 === 0 ? Math.trunc(raw) : raw;

        html = html
            .replace('{{ acconto }}', `${acconto}`)
            .replace('{{ percentualeReale }}', `${percentualeReale}`)
            .replace('{{ importoTotale }}', preventivo.importoTotale.toString());

        // Aggiungi CSS inline
        const cssPath = path.join(__dirname, 'styles/print.css');
        const css = fs.readFileSync(cssPath, 'utf8');
        html = html.replace('</head>', `<style>${css}</style></head>`);

        // Logo inline
        const logoPath = path.join(__dirname, 'templates/logo.png');
        const logoBase64 = fs.readFileSync(logoPath).toString('base64');
        html = html.replace(/logo\.png/g, `data:image/png;base64,${logoBase64}`);

        return html;
    }

    private getLogoBase64(): string {
        const logoPath = path.join(__dirname, 'templates/logo.png');
        return fs.readFileSync(logoPath).toString('base64');
    }
}
