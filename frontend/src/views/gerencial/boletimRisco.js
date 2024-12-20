import jsPDF from "jspdf";
require("jspdf-autotable");

export function gerarPDFRisco(data) {
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    let cont = 1;

    addHeader(doc, data[0]);


    const columns = [
      //  { header: "Área", dataKey: "area", width: 8 },
      //  { header: "Quadra", dataKey: "quadra", width: 8 },
        { header: "Codend", dataKey: "codend", width: 20 },
        { header: "Endereço", dataKey: "endereco", width: 60 },
        { header: "Latitude", dataKey: "latitude", width: 20 },
        { header: "Longitude", dataKey: "longitude", width: 20 },
        { header: "Método", dataKey: "metodo", width: 12 },
        { header: "Ambiente", dataKey: "ambiente", width: 12 },
        { header: "Local Cap", dataKey: "local", width: 16 },
        { header: "Nº AIL", dataKey: "ail", width: 8 },
        { header: "Altura", dataKey: "altura", width: 10 },
        { header: "Inicial", dataKey: "horaini", width: 8 },
        { header: "Final", dataKey: "horafim", width: 8 },
        { header: "Inicial", dataKey: "tempini", width: 8 },
        { header: "Final", dataKey: "tempfim", width: 8 },
        { header: "Inicial", dataKey: "umidini", width: 8 },
        { header: "Final", dataKey: "umidfim", width: 8 },
        { header: "Nº", dataKey: "amostra", width: 10 },
        { header: "Qt Tubos", dataKey: "tubos", width: 10 },
    ];

    var rows = [];

    for (const linha of data) {
        if (cont++ == 24) {
            cont = 1;
            doc.autoTable({
                head: [
                    [
                        { content: "Imóvel", colSpan: 4, styles: { halign: 'center', } },
                        { content: "Captura", colSpan: 5, styles: { halign: 'center', } },
                        { content: "Hora", colSpan: 2, styles: { halign: 'center', } },
                        { content: "Temperatura", colSpan: 2, styles: { halign: 'center', } },
                        { content: "Umidade", colSpan: 2, styles: { halign: 'center', } },
                        { content: "Amostra", colSpan: 2, styles: { halign: 'center', } }
                    ],
                    columns.map(col => col.header)
                ],
                body: rows.map(row => Object.values(row)),
                columnStyles: {
                    0: { cellWidth: columns[0].width },
                    1: { cellWidth: columns[1].width },
                    2: { cellWidth: columns[2].width },
                    3: { cellWidth: columns[3].width },
                    4: { cellWidth: columns[4].width },
                    5: { cellWidth: columns[5].width },
                    6: { cellWidth: columns[6].width },
                    7: { cellWidth: columns[7].width },
                    8: { cellWidth: columns[8].width },
                    9: { cellWidth: columns[9].width },
                    10: { cellWidth: columns[10].width },
                    11: { cellWidth: columns[11].width },
                    12: { cellWidth: columns[12].width },
                    13: { cellWidth: columns[13].width },
                    14: { cellWidth: columns[14].width },
                    15: { cellWidth: columns[15].width },
                    16: { cellWidth: columns[16].width },
                //    17: { cellWidth: columns[17].width },
                //    18: { cellWidth: columns[18].width },
                },
                margin: { top: 25, right: 5, bottom: 10, left: 5 },
                styles: {
                    lineWidth: 0.1, // Espessura da linha da borda
                    lineColor: [0, 0, 0], // Cor da linha da borda (preto)
                    fontSize: 7,
                },
                headStyles: {
                    fillColor: [250, 250, 250], // Cor de fundo do cabeçalho (azul claro)
                    textColor: [0, 0, 0], // Cor do texto no cabeçalho (branco)
                    fontStyle: 'bold', // Texto em negrito
                },
            });
            addFooters(doc);
            rows = [];
            doc.addPage();
            addHeader(doc, data[0]);
        }

        var row = {
         //   area: linha.area.toString(),
        //    quadra: linha.quarteirao,
            codend: linha.codend,
            endereco: linha.endereco.trim(),
            latitude: '',
            longitude: '',
            metodo: ' ',
            ambiente: ' ',
            local: '',
            ail: ' ',
            altura: '',
            horaini: '',
            horafim: '',
            tempini: '',
            tempfim: '',
            umidini: '',
            umidfim: '',
            amostra: '',
            tubos: ''
        };
        rows.push(row);
    }

    for (let i = cont; i < 24; i++) {
        var row = {
        //    area: '',
         //   quadra: '',
            codend: '',
            endereco: '',
            latitude: '',
            longitude: '',
            metodo: ' ',
            ambiente: ' ',
            local: '',
            ail: ' ',
            altura: '',
            horaini: '',
            horafim: '',
            tempini: '',
            tempfim: '',
            umidini: '',
            umidfim: '',
            amostra: '',
            tubos: ''
        };
        rows.push(row);
    }

    doc.autoTable({
        head: [
            [
                { content: "Imóvel", colSpan: 4, styles: { halign: 'center', } },
                { content: "Captura", colSpan: 5, styles: { halign: 'center', } },
                { content: "Hora", colSpan: 2, styles: { halign: 'center', } },
                { content: "Temperatura", colSpan: 2, styles: { halign: 'center', } },
                { content: "Umidade", colSpan: 2, styles: { halign: 'center', } },
                { content: "Amostra", colSpan: 2, styles: { halign: 'center', } }
            ],
            columns.map(col => col.header)
        ],
        body: rows.map(row => Object.values(row)),
        columnStyles: {
            0: { cellWidth: columns[0].width },
            1: { cellWidth: columns[1].width, },
            2: { cellWidth: columns[2].width },
            3: { cellWidth: columns[3].width },
            4: { cellWidth: columns[4].width },
            5: { cellWidth: columns[5].width },
            6: { cellWidth: columns[6].width },
            7: { cellWidth: columns[7].width },
            8: { cellWidth: columns[8].width },
            9: { cellWidth: columns[9].width },
            10: { cellWidth: columns[10].width },
            11: { cellWidth: columns[11].width },
            12: { cellWidth: columns[12].width },
            13: { cellWidth: columns[13].width },
            14: { cellWidth: columns[14].width },
            15: { cellWidth: columns[15].width },
            16: { cellWidth: columns[16].width },
           // 17: { cellWidth: columns[17].width },
           // 18: { cellWidth: columns[18].width },
        },
        margin: { top: 25, right: 5, bottom: 10, left: 5 },
        styles: {
            lineWidth: 0.1, // Espessura da linha da borda
            lineColor: [0, 0, 0], // Cor da linha da borda (preto)
            fontSize: 7,
        },
        headStyles: {
            fillColor: [250, 250, 250], // Cor de fundo do cabeçalho (azul claro)
            textColor: [0, 0, 0], // Cor do texto no cabeçalho (branco)
            fontStyle: 'bold', // Texto em negrito
            halign: 'center',
        },
    });


    addFooters(doc);
    doc.output('dataurlnewwindow', { filename: 'Boletim.pdf' });
    doc.output();
    console.log(doc);
}

function addFooters(doc) {
    doc.setFontSize(10);
    const pageCount = doc.internal.getNumberOfPages();
    let txtRodape = `Data: __/__/____   Responsável: ____________________________________________________________`;
    for (var i = 1; i <= pageCount; i++) {
        doc.text(txtRodape, 285, 200, null, null, "right");
    }
}

function addHeader(doc, cabeca) {
    doc.setFontSize(10);

    const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVgAAAB6CAYAAAD6f0vJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAIdUAACHVAQSctJ0AAECmSURBVHhe7d0FoB3F2Qbg/K79a7RQpDgJTnAo2qLFXSvQUtzdJbgED5IAIQmQBItiCTEswZJAgktwixDc599nyNzuXc6NNefeSzsvTM65e3ZnZ2dn33nn+76ZbRMyMjIyMuqCTLAZGRkZdUIm2IyMjIw6IRNsRkZGRp2QCTYjIyOjTsgEm5GRkVEnZILNyMjIqBMywWZkZGTUCZlgMzIyMuqETLAZGRkZdUIm2IyMjIw6IRNsRkZGRp2QCTYjIyOjTsgEm5GRkVEnZILNyMjIqBMywWZkZGTUCW2++eabkFJC+XsZ1X2qKeGrr74KE9+bGF58/sUw7oknw6iRI8PQIUPDoHvuCYPvGRSGDR0atz355JPhxRdfDJMmTZp2ZON8ZxXlY2Y3j4yMjIw5hdki2PIx5fTJJ59EwnzwwQfDvYMGh4H9BoR77ro73Dd8RBj10Mjw6MOPhMceeTQ8PHJUGDFseLjrzrvCwAEDwqBBg8KoUaPisfKolXcZ09ue0NQ+GRkZGc2FWSbY6v4+v/zyy/Dqq6+Ghx56KPTv3z/cdtttUa3eO/jeMKRIyDQRrJQIdnBBwoPvvTfcfffd4dZbbw39+vULDz/8cHjjjTdinrXOB7W2wczsk5GRkdFcaESwKX399dff2VYr2e+DDz4I48ePD3369Ak333xzGFoM/x9//PEw9oknIlneOfCO0L1rt9DpssvDRR0vjOmKyzuFHt26hzvvuDM88sgj0VTw2GOPhXsLsu3Vq1fo27dveOqpp8JHH31U87yzmjIyMjJaAt8hWKQ5MwT7+eefR6U5ePDg0KNHj/j5REGqI0eOjCR54YUXhvPOOy9cfeVVoXfPXmFA336RUAcOGBj69ekbet54U7iy0xVxn4svvjiSs2PHjh0b7rrrrtC9e/cwbNiw8N5774UvvviiZhlmNmVkZGS0BGaJYNN25MpeakiPGJkGKFHfEesll1zSoGbHjBkTXpkwIbz37nthyuQpYfKkyeGdt98JL7/0chg9enQYMmRIuOmmm+Jx0i233BLtsffdd1/M44477givvPJKTZPBzKaMjIyMlsAsmwiQ67PPPhtNAuytFOfw4cPDpZdeGs4999yoPBHk5MmTo/IUUVArP9v8Zp933303PPDAA6Fbt27hrLPOinkh2KeffjqeA5FPKEja/lDNa0YpIyMjoyUQCbaK6rZEVEjxpZdeik6sAQMGRDvpPffcE04++eRIjBTrxIkTG4b09p8eWSfYB3EzB3B4nXbaaeH000+P0QjPP/98uP322yPJvvbaaw351UI1/5QyMjIyWgI1FawE5b8RG/JErhJ1iQwPOeSQcMEFF0STQRUzItikYH1PsD/iRtjypo6feeaZaDq48847ozIu51FGeXs5ZWRkZLQEvjOTqxY5+TQZQLwqBxaPP0fUSSedFDp16hRefvnlRjbSKtL2cvr444/DW2+9FUk7kTCylahZpMqWe8IJJzTYcpEsZ1qKlZ0ZzOx+GRkZGXMajRQs+CyrTvj000/Do48+Gq677rro0BJOdfbZZ4fLL788kmvad2bT+++/H+6///5I2CIRkCoCf2rc+DDh5Qnhs88+i2VgHkCy55xzTtyfnVbEAucYgq5C3gnl82VkZGS0BGZIsInoqEdKUrQA0pMM5Q3z077lY8p5SCnvqVOnRscVOytTw5QpU8Jrr74Wul1/fejW9frw7NPPhM8/+zzuK+9x48bFUC5kLq4Wud9www2R2J2jjHQeSOctb8vIyMhoTjRpg5UQnCG8Ybngf558nn7RAsiOsq11XDnB10U+UwvVOn78uNC1a9ew7bbbhgMPPDCaGijXnj17ht122y1cXxDsxPfeC998/dfjmQNEFJx55pkxnIvtN4WAscdC9XxQ/TsjIyOjuTFdJ1cyDSBXNlDD9FNPPTX+XZ5lVcbXX30dPv7woxj3+sqEV+Isr6H3DglXXXll2GuvvcJyyy0XFl988ahImQoo1IMPPjj84Q9/iKRdVsTgk8qloJGsyQeUs79NbGBeSIq5ilrly8jIyGguTFfBUq8C/alFypEt9IorroihWmVCs290Wr3xZnhk1MNxltZ555wbDj34kLDzjjuFtX+1VliyXbvw85//PPzgBz8IG2+0cbhvxH3xuMH3Dg477rhjOO6446IpIuUnJSBdkw0uuuiiOBnBd042ylpoVyLY8jG+N0W8GRkZGc2BJgmWJ58ziVo1cUBI1pFHHhmH634DxPfhhx+Ghx58KJxz9jlh9113C+uvu15Ybpllw4IL/DL8Yu55wvzzzhdWXL59JNqtttgyLLHY4uGgAw8Kzz7zLBaMi7xstNFGoUOHDpE4oaDKmKrlEaZFQSuL9Q7SRAdOsfK+ZcKVMjIyMloCTRKsRVxMJuDpR6piXa+59poYWgXCsl547vlw2SWXhs1/u1lYZKGFw1w/+Wn45fwLhOWXXS4S7U477BiOPeaYcGOPG+I6BEccdnhYdeVV4mIvps0WJ4o23TXWWCNGJbz55psx76IE3/5XKg+IOOjSpUuMkWWyoGAlSru8bzVlZGRktARqEixlyktvBpXQqL59+saYV/bSZPN88fkXwqknnxyWardkWHjBhcIGv9kg7L3XX8IZp58eul7XNdxlpayHHwmvvfpqtOWOHTM27LbLrgXBrhoG3TPoW4VZpC5Xdw7LL7dcND+w21ZRLhdSZ4NlTkD8bMJMGKbuVk0B9k9KNiMjI6Ml0IhgI+kVnzz37K5CokxXvfrqq8OVnTqFDz/4MO7zdqFiL7rwokKpLhtWWWnlcNKJJ4V77r4n2lDfeeedGIr16SefNpAxjBg+ImxYkPDKK64cbu7VO77RoH9B3Pvvs29YfJFFwx9+9/twfdeuYeDAgXH2FucYJxiUyyaS4corr4xlQrDMBRQ28k0oX086f0ZGRkZzIxIslElM+NONN94Yba/WGuh4wQXhvmHDo7JFvpYbRJZrrLZ6uPGGG+P+YlenR2ZUK7MBU8IO220ftt9m27BaQc5tF10sLDj/AmHx4nOZpZYOK7VfMfx6vfXDnnvsGUl07Jgx4aMPP2oI3ULaJjuwxTIP6ATYiZk0EuyXricTbEZGRkuhTSKhREpIlErkfLI+qxhVIVUWWvE7r/0xRx4V2i+3fDj15FMaVO2k9yaGCS+/HCZPmhRDtcqgRK/p0iWsUBzz0x//JNpp11x9jbDFbzcL66y1dlisULCIdeMNN4rkyuzAnrvAfPOHHbffIfS9vU94f0qhZou+QBnYYtlsTVSw3GF5ta10HeWUkZGR0RJoRLDAYWSIzkSQzANmTn3w4YeRwEQMbLvVNmGTjTaO8a2iCAb07x8OO+TQOMw/8YQTYwhWWptADOtNhRre4Ne/CXMV5Lrc0suE444+Jgzo1z+MGjkqnHXGmWHZJZeKx/bv2y++v4tT7MD9DwiLLrxI+MH//G/YaIMNi9/6N8TeMkFwjl111VXRTDBixIhItELF/J6uqXxdGRkZGc2NRjZYECqVFtE2BGfvFHPKUWV4fmNBtuusvU50aIl57XVTz7DRhhtGdbr1llvFdOABB0bHE0LsX6jLLTbbPMw79zzhZwXBbvybDcLDhTJOuPXmW8IqhXrd609/Ds8Vx8AXn38RXnzhxfjGg/bLrxB+8uMfhz/v+acwZvToSPLCsnQAYmJ1BpS2WV6UcibYjIyM1oIGGyz4/sILL8QVs5AWM8G1114bQ6KQq1hUqnH11VcPRx5+RLh/+H1hv332DfP8fO6w2867hn639w0dTj0tbLrxJnG/EQX5IUbD/h232S60X3a5sN5aa4eHHniwgdQH9h8Q1l7zV5GYRR0kIMeJ774XTjnp5GgqEPpF2aaFYEx8YLrgFKNimTLSylxSQibYjIyMlkKDggUEavqp8CyB/NYN4OwSn4q0/G5FLXGrJguMfHBkuOSii+Pw/pZCiX4w9YNCsfYP222zbdh9l13DX/baK2y60cbh3LPPCbf26h02KdTr8ksvE22qX37xrQlh+LBh0fb6qzXWjG+gLYNjixkCQZu44IWJaanCt99+O5aFck3hWjqHNOmgtYCphJKvR5reso3Wf/i6+P3rj4vk829M35hcUuq4MjIyZoxGNljRAMjKBANhUswD5vzz0PsdWTAbbLbZZmGrLbcMg+4eFN575934fq0Ppk6N5HbbLbdGM8Ay7ZYMSxfpkIMPDuOefDKMeezxsPXmW4TFFlo4XNu5S/j4o2+XG3y82L79dttHx9btt93+HfVpdS1kLcrg/PPObyCVFOlAYTNnCNUSs2vxmHRsSs0Nal/9nX/++WGXXXYJv/3tb8Omm246x9N+++0XibaMb4p78PmQYWHqkceHqXsfFKbuc3CRDvkbU5HH/oeFjzqcHT67a1D45v2p086WkZExPTQiWKpQAL9htymo1h1IC7uk/V5//fVw7LHHhmWXWSYcdeSRYeqUb+2eSOWJ0WPCYQcdHEOvFpjnF6Hd4kvEYb3fxo4eHbbfepsw/y/mDaeceFJ44/U3YgHEzloEhkK9+qqroq03Qb5jizy333a7GMJ1RacrIsECe6soguToslCMjkGEASRylZoTbMTeKbbQQguFf/mXfwn/9E//VLe01FJLNcQKwzdFPX/So2eYtNr6YeLiy8/51LZ9mLTsquH9P+wVvnhstEqeduaMjIxaaLDB+kyv4UZUPPPUIe880kshUMwEFOOee+4ZTQX777tfVJYdTjk1xrauudrqYfVVVg1LLtE2bLPV1jFS4IWCRM84rUNYYZllwzxz/Syst866cbj/0osvxbfMmqiw0C8XDOecdXYMA+NoY6J48okn437LLr1MjEIw3RZZA9JX1s6dO8dYXTZjL2LUAUAi13R9zQFkd+ihh0ZibdOmTd2TlckaCLa4zi/GPhmmbL3zt0S4zKpzPi29Spi01MphUkG2UzbdOnw2aGgk9e8LjMAIh44dO4Yzzjgj+hqee+65OOqxXejf4YcfHt+mkZExJ9BAsNSpWFeB+xZVQbLeEGuB7eRYSoRFRQrhOvHEE8N2224b1yJYb+114kQC4VoHHXBgXD3r8MMOi2FXVtZaeYX2YeFCpS443/zhl0UyA8x2JoAuV10dSfT4Y48LD48aFS677LLwu913D3v84Y9x7QLke9wxx0ZThHIA0lc2dlgqm3lAPGxLKVjlsTB4c5Gr1Ihgi3r5tM+AMGmNX4eJSLAWQc6pVBDtxHYrhvd33TOSuinPrR3ajU573XXXbbhH//M//xNWWGGFsN1224V11lkn/Nd//VdMRkMZGXMCjQjWMoQIVuiT3p2N09qrVGuZYCXbEDKFe+0114bLLr4khlxRneede15YcMEF47oEPbp1jzGzFO0mG2wYli9UrIgA4VebbfrbcE3nLuHmnr3C+oWqpYZv7t077L333uEnP/lJ+OEP/i9OSth1513CsCFDI4ml8jq/SILrr78+9C6OoaqZNlqKYM16W3bZZb9DgvVM3yHYXreFSausU3+CLdLEJVcKk5ZbPXzU8dLw9QcffluGVgwiwXrCyPW///u/49KZ//zP//ydOt14441j7HZGxpxAA8EyAYhdRbCUoQgCoU9I19CqSrApIT3DfEN7kw4++ujj+MaDBRZYIK5XYKHtVQu1Kkrg4AMPCmsVnyYOiHu1fOHhhx4W14/dZvMtwo7bbR/XKeBc23zzzaMj54gjjogLvMg7nTOV1+wtKttECGUWSfDqq6827FPev55QP1Yb+7//+7/vPLD1TN8h2N4Idt1mIdioYtu2D+/v+Pvw5YRXmqWe/xYYdTHfaJd//OMfo/mLOUAba1eMthZddNH4nbkpI2NOoYFgkYTVstg12aPM4KJi2TSRWVMEW8XnX3wRLrn00vDLX/4yKtk7BgwMv9tt97Dt1tuEk088Ka66JezK0oW/3/13cVHuPrfeFnbbaedoZrj1llujClWWcePHR8JMji1I51Qe4WNegmhWl+EfgvX6cNdiv1TmekP8LdX97//+7zWJsF6pRQm2SNHWu87G4fOHRjVLPf8t0Ia1KZ21jpmipVTZ+5988snYQWs7RkYZLQNtqLW3o1lFI4IVA4tgNUQRBIbeIguaItemkjhaSxDuu/c+YfRjo8P9930bp8quu0tBpO2XWyFGBphccNqpp8Xog/332Ses1L59fC9XCsUqJ6h+p5oTwSq7GWeiEjjC/N5cBOuB3X777cO//uu/1iTCeqVWQbCrrx8+G3hXs9thdbxioC36Y5Rz+umnx79NiqmF1Ha0CcSqjVtQHrkKqUvtfGaAnB2n7Xl5JyVsCU0TXzw/pnLPKjjbvKNO+QmclPytbWtjMyJ/o0mjUNflWJ/+9mxXYZu4cee0r08dTC2oL2WQn6TuTEv3nCm3bcopj/IIcmbABGmkzHzjPh5zzDExCsdIwsp833c0EKzKUklMBLyonTp1ilNm33333VkiWPC2gn3+snd0ULHPiqOVhwo7+aSTw5Jt24WFF1o4LvTi93eL7Scef0Jc8KXjBR3DpImTGs5Z69wJlKNGzpyhwVu60A1PDdGxUr1B5Yt3/bd/+7eaRFiv1OIE227Fbwm2/53NQrDuvegRi6679lp1Mvfcc4cddtghOmpTxEkZtnFGLrzwwnHflLyIExmV21cVSEW8NRPDvPPOW/P8nGSia7x1mQCgnGcGW2+9dZhrrrkalSmlX/ziF6Ft27bRPozEEV6tchIYiy22WMNx7MxLL710dABXIXJi5513bjinz1133XXar43hzSHCDlOeTCoI1/Os3LalPA477LDpXrNyE1DK5D18Rrq16vE//uM/4oxR0+GRdnM8x/XALBFsGf5Oqfq3tWDvLBSr0KotN98idC8U5lPjxseYVlNp2y22ePjJj34cXzEz6qGRscFcfOFFcfnD4wslUF0Zq5x/GWWCdcNbimA99Hrf//zP/6zZWOqVWg3BDmgegkVwIkx+9rOf1ayPlP73f/83hlzVUnxU2yabbBLjiMvHyFN7r6X2ACEJ70LM5eOaSjrbbbbZJsZoU7wzwlprrVUzn2pihvIGZr6RMrRzb2qu7m9UZbH8al0gf4Rd3nfDDTec9mtjGMmWzV8//OEP48tQvd2kWu499tijSYL1/Dqvd+stssgijY5rKumwtthiixiGObOdVWvCd0wECNaQaXZMBInQfPfgd+ncJWy+6WbRqWVh7WOOOjrGygrXsqqWxVw4yDw4og0o2v332y+MGz8uliflm1D+26ebxcElkiARbDIRpH3Kx9cTyqEnr9VI6pX+kQjWfWQnpQ7LdSAqQL3PN998DSaa9u3bx/ZQhQeU+YoaK+chiSgwM05nX4VtJ598ciSW6nHTS0j2N7/5TYwpb4q4E4SP1cqjVtKRM0lw/CbwW9QiLR3JeuutFzuWMogTMwzL+/q7FszmFHmR9vvpT38azQG4oVpuk4aaIkL1aPQwzzzzNDpmZtIqq6xSU4m3djQiWMQq7IqSFcDPySUUq6wmywlqbU/pnbffCX2KBi1SwPoEbK7WI1h0wYXChoW65QD77NPP4rl95/zarRimjBw1subwLuULiFwPSsH26N4jlvmuYlj40osvNtzg8v71hnrS09ZqHPVK/0gES4Fpkz/+8Y8brh+hUqMiAthfjz/++Di7jXqt1X5Mrz7qqKPi8LNcjykJs2NqKkPb1IHXUs2U8korrRQjXtZff/0YoVCNg3au3/3udzO0TVaJaplllokkyr5LWTpX+XeEw7GbQNk3FYPNnEEseWYSmptg1aM49VqdgLzFI5uCr0NiNqiOMCT1YHT7fUIDwaoUw2sKlhzXqMTBlr3ys5M+KnpZyxAOHzY8DB40KFx/7XVh7TXWjCtoWbcgObSYCijdzYqbPHjQ4PhA2Z4UMaQ8QXm9N6x7oXxvuuHG8Ngjj8b3gHkHWDym9NLE5oBzWkJxZoc+cyL9IxEsM4yhbvnBExanjRqCI1TOJQ8+s1YV2oG4aRMKynVYTsjQyK0Myg95Vh/45ZdfPhI+J41IBPtxcP3+97//jqlITDchUIv0E6pExabPd+H+uqatttqqEYEyVbCNgv2mZ2KgpPfff/+/tpUCzU2wzs0RXK1Hzwt7tREH8mT6wD9/+ctf4iv+y/vqZJhpplePrQ0NBIsgEBaCpWKpV8NeHkMXlHq/RFozk9IbCByr0iXv89pt553DCssuFzpfdXXDMOe5Z579dkZYccP0dB6adGw5TwmUSePudn230LtnrzDygQfDnQPviGsc1Nq/OeD61B/HQrlh1Cv9IxGsdkLRla+fXXCfffZpmB4NTd1zIgEZm72VjvfArr322o0eekTGGw/aHmLkZEq/S5Su+6wNpnP5tD9brZC98v4SB5JOoilUiarscJKvaIUyyTGJ8L47L+dWmdR/9KMfhVVXXbWR3XS11VaLpJjQ3ARr5meVMI1GmPXK9Qi+6yTd7/J5pV//+tdxNPB9QSTY1Dg01CFFw7lj4MAYUkXF6k00OJWW9k0JqtvKqfinaB3TPr/dPVbcAfvsG5ZdaunQ8fwLGgji9Vdfi6FbaxXK1owwjrJyXsqXEihTnCpbKOI+t90WHrz/gbi4d0vM5FImSpySkPTChqJUzpxwfCEAKgQhaKQ+JQTbYDMsyvD3TLA63IsvvrgRQUpIxHD6kEMOiaSnPpBpFciNA6Z8LCeUNY/LefquXaVjeMXL0SFUs5CiRMK1wFxUdYax+5Y7giqqRLX77rvHduW5c00HHXRQI9MGc4TFjlyrMpaPNZS+5pprGpk1kJlp5Un9NTfBetV+eT9tWj1ODwSU0UP5uCWWWCKOFJvjuZ4TaCBYiU3z3mKY43UuXvvCSWXYgzwSwULav/y9nBIRxr8RbErF/xxTRx1xRAzV6lD0yuxiYNnDnXfaOay+6mpxyF8rFjYl0Pg9UCZE6AV1BJRvasTV/esJnYZwEt5dD4YHmQJBsNVee3YSMl155ZXjg2SWm47Pw2JxmwbvcEsQbNtpBHvH3XUnWO2JCuLkqjXFVUIC7ODqpRqLKgQLKaV92W/VoTb/q1/9qlE+IkKcTxgS+2lZ4S6++OLRaTUjsJ2W89QOxIs2hSpRUWqIRLgZ9Vp1zC255JJx0oSIH069tF1ncPTRR0eVx56Ztqsz5gukCM1NsJ6L8n7Iv2xDrgXPuHosdyxGE0YV7s/3AY0IFlEMuXdIGDhgYBg7pvFyhbNDsF/H78V+JYLVG594wgmh7WJLhOOPO75h/db33n0v7LbLrjF2tlvX6xver1VOZXiA9ODKOOK+++ICHbXWImgOMK14sGs9+FWb0+wkZCDGkENFQD1b+XcaWPF38xNs+zB5rY3C5w+ObJa61iaE5K244oqNVGU1sevpeLXbhHPOOaeRDVO8KHJiekBIKQIhHY+gdNY77rhjo3to1FB1hNUCu2I6RkJQQraaQpWodKrI3Joe1WGy6xDrSylTqmy86TediHAzzyvVWC67+FVrdrhXzU2wHIHl/ZSlGmpWBfFg2n05egMxs31/bwg2kaFKR1ojHxoZX+My/olxca1V3kfb0z4zkyKxllKxcVoKcWHu00/rEAn22KOP+Q7BmmxwbdFoPi4ejmq+ZSBqNjUNTPiGAHAKJ+XX1HH1AOO8FZnKD2m9ksYmQNvwqVEjK743K8FOW4tgyra7hS9ffLlZ6hkQImV35JFHxkB0HU+1jpAKVSpWU7mQSTm8y++cKMn0xRxWVojuo4cYgRiVVElKO5sRqvZiCrZsA62iSlTTSyIlKFuCiDJMHYdyMg8IVXTdHG9l+zElaBF4ZgJ1Yu2F9JvUFMHyx5RNXbNDsCY1lPdTrlqhdGXoUM3sEgubjhPiZebm95JgVTxPq1e6PP7IY6FbMRTl6NKTVwm2fFyCb7VSGR9+8EE4vUOH0G6JtnEJwkSI3r+1q2m0y68QOpfUR/mc5eTmGuIhWat/aXDlueTlfesNBNucU2WpCcNYD0nD9RX3ojkJ1jkmFp8fndMxfD31g2/L0ExwzTpYYYUEAJLx0JfryINI7WrTvO1lgqB+//znP0cnkeMt1MO2Vz6eQmQiqNpgqUW24AbTTA1om5RuOT/KcnohRjNDsOyolKC2rnPQ7tmf0+/aH4JlQnJdlCxTQjkPv6s7baeqKk08qAX5ldW/To3ze1YI1pTm8n7KSuVPDzqK6qQQIw8vBWiO53pOIBJsIiKJbPemWGFTtxdD8Gu6dIlKIBnHwX61CBb8lVIthuXUsujL0ksuFV9omAj2zdffCDttv8O3BFuoh/LwDspldF7DO3OWPTxsYuIg5VUuV0r1RnMTrDT//PNH+7hrjSg+m41gk3rdeufwxeNjm6WOa8F5OXnY8dnqykqHM4pa046o1XLdSdRcchbqsMoEInFSaVdVZ5GHnXLmCKt13ZxxVFfVXCQ6oWoXLqNKVMxBzF9s+2Y+ifWl3JEjAuOjcH1VG7/OgKMuXVv1unQ0rkud7bTTTo1+Y8utVcaqg0oEA9v1rBCsslcdvvKxzGctGKmIZ65O7jAyaWrNhNaIRgQLE16eEONTRz74UIwoMGWWbbMpp5OK8Irt5597LkyZNDl8VTR4RKd3ZUsVEfD0+Kfi8c4VVcEhh4YVV2gfLuzYseGGPj1ufNhys83DyiuuFHvMqg22DI2YgV9MnE92JUpbXvYtX1MDAdURLUGwkmHoHHNyeVvBdNLElCjXJVYIk3792/Bp/zua9Y0GVJfOl19AtEaKz/aJiMrLRQpVopCo3LJza2YT4vKAG9FVZ49Ja665ZnSqEgzaqvLYl+KtRjogFua2skipokpUnGtNwTUTQrM7sUVom/IaBZU7AuWk6j1f6lR5kagOpXw85619ahGsvD3r5URtI/Tq1FxJSCO1jbB1hhIfg5jnsm1ZUj4z6qYXwdHa0CYRkQQWWnng/gciubJtXl00aOTlhpT3lUQEeJushV2sknVtl2vC2DFjQtdrr4tvN2jXtl0k0kMOOjg8WvT4XxY3zBKD3lSw7trrhBt69IgVKq8H7rs//Ga99cNqq6waevfqFSuxer4Ejdo6sBot26seWURBIuVEsD7/ngl2o402+qvSn12CRZoWzxZy5bgmUiRWZLvy2mHK7/8SPrvn3vDNZ00Pk+c03Ef32JDY1FixppwvqXNFgmW1xjlkWiyBUCY8Co8iNbupnNgEy/tRqmyS1JKRUnkGWUoIwBBW1Ag1aDhebQP+pl6TXbQpVImqqYVXAPmJnKmGgjGTVK+LStTZlIfZRj8cs0Z9VRJj3xU+hfR0ZlUzgsS8omOvRbAIU0iZsDnJ+ghez0N5s+XWmiarYxQ1IcrBBIuqeSUlsb06se8TGhGspOJ4UG8tGu+okSNjpZiGp8dMxCXpmfr26RsXc0GKbRdbPC6YfdThR8RXda/SfsWw/977hC0KVbrm6muETpd3igT49ltvx3d1fTtja1BDbyk0TIiWONi+ffo0SbA+2YR5hUURUMqcFMpXHprY7++dYA3pZnuiwTRiFcs6ec0NwtSCND/Y/7DwwX5NpIOPCh+edk74pOct4cuXmne6onupMz/ggAMaheywBXJOIZYygVBlHDhC98S6llUagqZ2KbVyQtIcMeX85Y2kjbrMhCqbIGYmIXxTWi3VOT31CrNCsDrVE044oVF7U27z/D2v5evyN4dgeaitrjzTyGqDDTZoVHeS2GJ1WyvEEEFS7p61WgRbK4mG8My6h0ZdtTqrGSU2cubA5nie5yQaEWwiUA8tAzl1YF1GQ3GG5TQcVblMCRZvEVZ11hlnhksvujgcf/QxYfNNNo2v7D7miCPD6Mcej6tkeTXMpRdfEgn2qfFPRfVqJa0xo8dEckWm3moggsB02UF33xOJt1ymlBA7Zd2hQ4doHpDccKaKMsrH1BstRbBm5zTYzGaWYKnQacQ66VcbhA8OODy+y+vL514IX73yavhqQhPptdfD15On1D3etRbcQ8NGs65q1UM1eaCpMw8kp0jajjjYCD3oVWhnTA9le6v9DfkNb4kOQ2qqMP0+vYS0BMkjaO1+RqheG7JvCtobNVfe39+17Kfqznqv4qjL+yNW16RjUV9Vkq2VKGETaHQ48jWsn5l7YqlF53KMT2tGUNa19q0m98A0YPcGV3zfUJNgEZ6YPeQqJIWhnz2LzIcvPv8ijHxwZNh5h53CphtvEsY98WS0j/UvFO0mG24UVlqhfeh9U8/w4QcfhtGPPx569exVfI4OE4uGfdkll0azwaknnxLeevOteE7mh6uvvCpOn92hUMEPPfBgPEe5TClpXIz/na/uHB4s9runIGMmgqoTrpzqjZYiWMMpHU5EUU8zJNh2BbEuvnwc5k/d79Dwab87InF+U9R1a4Z7qAPVkVJ2ZRIsJ8N/Q00jGyQgZpgSY7uT2GJFFtRywoA1Baw8lfanCv2dhqWImSrccsstm1RhVCuVjESEIREKMwOEl84rGS43BaRNkZb35whrqq0rt6E6E0jaX11wknr2mFqYm8rREtVrYv7g7FJHnkmgYEUllMtRK1nIRcwuKCOuIOCENrqOWuSuLM5J8QoJ+z6SK9QkWImt1DRCKtYQx4WaifL5Z59H8vMSwt8WatWar8889XQkZRMUqFND/bvvujvuq2IoX78zKfiNfdbqWZ9PU6kq/LRTTg1LtW0X9t7rL2H8k42XK0zJtqHDhsbAcBMiHhhxX3HOAVHdVM0D5VRvtATBpmFeQ8cyPYKlWBddNkxcdrXw/m5/Cp8OvCt8NXFS+GZaHX8foJzuPweqqBZ2UXZYSo9DSPukWBFranPIIL0VQOLwqqXyErQhx6T9JfHGSYEqg/p2DrZ/Q/I//elPsQxCxbRLxCH+VMc3K3XLRls+rzbVFBBbeotASoiyKaThPMJP+/vuuYPkzCKohFOxKbsmMcAUvJlTnrHqNTnOtZbLUSvpoNLoN8E9MlLGL0w26V7qQEWECL90TuaQROjfRzQi2HLSqBjShVewZamEKwvl+Nqrr4WvvvwqjCkUqbUDFl9k0TCg/4BIoPcUpGrJQZEAJH0a5vtkK2Wvnefnc4cTjjs+vDLhlWlFCNF+6v1ciy60SDiNsn3jze+UB9hxrGbPCG+mmWm90uTioUv7JFSPrSdagmCFq5hR1HB9FYJt8Pi3bR8mLrNamLJrQay39AnffDpziiojI+NvR5MEq8fR+xuWmYbKBnvkEUeEEcOGx9+s9Sqedb5fzBtV5zNPPxMef+zxsPOOO8V1Bi4v1JWIBL29iQtbFcOqn8/1s7DtNtvG/JLy8slJhZSXardkuLHHDeGTj4thb4kXlUePZ0hjXrb9zWNOn4nIm0r1RnMSLOXKe2yShU6tAYlgV14n2ldjZEDx/f3f7RU+vaFX+Oqtt1vEfpqR8Y+MJgmWLDeEMGwQHmOo1PGCC8IVl3cKzz/3fCTZEcNHhG223iYS6kknnBj69ekbQ7YWWWjh8Kc99oxviD3/3POiSWCeueeOyxEOGXxvg93Q0EW+wj5+NtdcYceCpB5/9LG4XRkSkKtwGXZgtiZDB7NZlMt0waqdtprqDSEvvNXVoO45nRC4pfIMj9MEjQYg2J63hEkrrVWo2PXC1D32CZ92uyl8+dLLzRqr2lwwdJzR8FE7ss/MOJlaGkSCsibhMaeg/XtW5e05+lsgL526+myO56oK95MtvmpuaM1okmAlF2JKHKVIdbKXnN7h9NC7V+/w/pQpYer7U6Pda6sttworr7RyDL9iIphvnl+EZZZcKmyywYZhxeVXCMsstXTYc489vo0OmKa6VNaLL7wQTjn5lDD/vPOFdm3bxjUIeGydO5EmcK6Jy7PwA5MF1crWpWzyse/0SLbeYLfjlBCfKWRoTiZOGqExYgPZqXQsNb3FxfV/1u+OMPWgI8MnN/QOX700IXzzPWqIMwP3mDlJDPSJJ54YQ5UoeStlaQcJiETHzTkrMJ1d0TFpBpDOSfthbirbOpNX3UQX4oJzRf7iQcVcc3Bpn2+88UZ0DNludTOOMzO7kkOLrVfe9kkdoXboGZIfx3EqLwcUXwcHkuvReXrOpkci7K/yd36J04sNtQo2TiNQIY3yNsWX87pcV2UkE5w8LZbju0gBQGxMhhyHJgH4nbBgy/XdMelYz2qy76ovdWomGlNjGYjab+l81hiotV6DumDzJrBch+vBO66vOZ7vvwXfIVhI390I5GYBbp5ZDVT4Cxuo5QwpUT2jBX89/Ouus25YpSDadosvEX76wx+F//qP/wwLLfDLcMRhh0ebqd7PQ/LmG2+GoUOGhqOOODKq3fnmnTcce+yx4eVSrG36VLkapHNqiB4mZaBe0020b9ofUvlTqjc0PqFj5fjDOZXEMWrYOhXmFtdZCwj266I+vnr19WadANBccB+ZrEROmBQgOJ0nX+fjzaZISXu1n06YV9ybTk0XFc/pGG+ONTUTaQj+1yEK9wOkjNyYX4S/2Yc5Sh6iFnR0VvEyRVv+ZjfZrhO0j2gDZjT3x+QGvwl/EvGi3SsXclAOThxkjNzF13pFCm+6ssrPeZB2U/cawcg/JZMqXFt5+T+Ee+ihh8ZY3pS3SQVGQDqFWiTrOU95ul7XhRTty9GtkxeqlTp+9aDj8b1cHnWTFnLRdq1Opq5NxkiEDRzpypfOp25cu/KlDgYJO4dyK7/rcD3uk3qcntOyNWC6BJuIi6cQuSFSvbMGxIOqsfldZejN+tx2e7CItkVcti3U7EJFw1lumWXDccceF9Ur++0tvW+OIVriXectlG7bgoy9SVZe6aanc/tkDqBcNVQeScRKjZTDRVJ5perfaVs94RzKbngneVjnREp5pbqYLvye0t8hKMGDDz44hu8I3qd2dEBeAePhpZ4QGUGA7JhTTMQQXWBtACTmWJ5xStXrr+3jgabcJJMT2LjFfVNHjnMMAqewqF6KTBu0qtaiiy4avd3I2n7Kp5yUFpOOvIRseW60DwH/zilkSqd8yimnRLKwFoL4XEpbuJYJDeJtq4ovQafAHGW9V6QtDMrfZpUJh0LeFLG8hZpZfU3erk/eSNJIqArmQOVWZs83kkfUSM4kD+eQF9JUH9Q3IqVq1YdjTZWlYP2mHI5zzX4Tk+zYBCMBZO3eqBsRBMqn45SHdm+avjhax5tqq9Pz2nSELATMdbZmRIJNSIRUfZg96MhNpRqeGOpQlBoSFZmOQbQapm1sqSced3yMk9PQl1pqyUimCy+4UDQJ+Nxow43CFQVZu4nVc6pcjd6wxg2kUChZQw1lcPOqZU1/V1PG9x86dirGg8VkhbCMoIxoRKggNm0G6SICJGESSoJ9PMxUJaVJPZodhISYBCzSTU1J2h1lhGAFugvFotZS1AalJ0YzLY5CACBT4U3aMiWMEJCuWWTUNKGA7G0zhRQxWc8A+ZRJggkEETpOiJQOtgrPA+IUFmYESbkiZNen45FHWj/BORMQmhheZWXSqtp71YtjKHiCitkj2VwRpzJRp4hXWFgSRDqs1Dkh6QQmPOsWIEzkbyTBtKPMQMFSryZJqFvP9J577hnLIEbW7zojdaQOdUqgTIhWXK/7aWTXWtFm2mfE9EjJxQnoN2RFcBqci6QEqNck6SMcXiRDfuFap552avhTUXG77rxL+ENxYw89+JBwyUUXh2FDhzUi6AR5UbTIVQ/txiN15/bdDapV1lrbMr6L72Mdsc2lIST7KmJDaKZqUjacjB50C7QgAlEdCCXB/ggNQSMhxIV8EJWHmaPV8BNpqRv7M1shWIlJAokg9USwtiUF7W9qFmkhWGQjlA6hUahW9GIOQLCG7kxKyMcwXCeR4NzUnHNazCWRURmJYBGwcjpGOZSH+ka48kZUZbMBULKJsJJ9OCERrA5KXbgm8bnqym+uxzCdctSBMRsgWYQuP9fMNgq2G+qrb/dCB+c7he7ZVuZEsEYkBBywmysD0sUzRhz+xjNlsC0zDyHvWnbb1oI2LrRWKiNtM/wy3GFUd/H3DhocF8++5OJL4ltd9XRx2O7wIjlGb6OhP1tUql7q6eLhmFAQsqFWuXe2r2PloVGIFjCEMpRBrhwGbqjeKpUnpYTq9+rvf6/QmEVTeNhmBAShMRsRUGpJhbR2UEMWImF7o0wRDxuc4TFCZedjymI+QmLItOxMosaoU8fr9G1H1KZsUlbUn985U0BdJgVrKI7UBNxrs2WCRTgIlDIzeoNEsIlYqDdKWRmTgvX8UJlUGEWYRmRIx1sUkBzVWFWZkAg22SCpY2pcWZLTLylYZfFMgWeHclVfjWYBTkMiWKpQR+NYJKxcnmNExjyIEF2fjg0n1CJYz7xzIXOL5lhaMS1Aw9SiHssEy75OxLkmZbDIDOG27777xjyYJlKH4N5bwzfVadlR2drQsOC2VCalWsk+Hkp2EQuyPDFmbHzZ4IUXdAznnXNuJMBaD206tnyeKhzjWITqZqhAKtlNNVxx41Sk/VJ5oNb38nnSb60FGqSHzlCWs06jZk8udzazCvVinjz1MqPhEkclZUQJsmtXH7LWCkNvw0fqibNEO+F45dxBRpSOToaKdW0UGGXKQcK0ZQotsmQvRUipnSAxDzRyQAjJcVomWITH263dI9FEsMjdPgjaO/2RpnyZzuSnbPKjtnQOzoNgrTbFRolo2RzZGDmukCNCQTqS56kWECzScR+pxPQ2DXP2mVIM36lgJIyA2GzlbbidHH86iyoSwVK/FCNRo5xInu3UuXRu6sn1UbSur0qw6tWzS+W6PrZq9WUEoj7ZZZFlIli/u37RCeyxOh1t00hWvSNlZKreXIfrkbf7TsXX6oRaCxoRbDklcqomRKARm6JqQW7TWs3q6tK5czjzjDNib2z481LxIH/04XeHN1XYx0Nv5a6u13WNS5txWIwaOSqSK2O3BopEVGS5LFDre/UaWgOUAwEYomnAloyjnjxcbHyzuwxb6vUNlRCPxj49UG0UigdJCFOtIWhrhHanY6ImEZprsDSeBxSxcDzZx32nkNhrEYzfDU09jAgBaZXNWY5TdxRsGuIDIlWvSMPD7X7xoqs/dkaK0UNOZVGDiATx+Js4UL8UHgJSx6Y16xwQIYcWxcoO680J9nUO5Ccf52LqaOreuG+OQZTME67TtRldqgNtTSei00Fo6ivlbVjt+KS2y9BpyVc5kZroBFEXysGx5Fw6CnXq3DoS9WXkwEThWJ0egjf6lA/yN0HIvROOhfDVnVGqTpP61+nIWzmtkWA0kDo6nymaQ34+jRzUl3pPaxy0VjQyESRiKpNTrURFCrdwQ7oWPcrDxU1AkncWjfecs86OM7w6X3V1uG/4iDCheODfKSpy4nsTw+RJk2Py3fEvvfBinKxgoZeTi97r7DPPCncOvCO8+PwLcSEXN0SPWFbF5XKU/y5/r6bWAOU3fPUwe2g1LI3KcI0jUCOdHSTCNAwzR39GShiRJ4+vhyANH78P8DAzM3EqWX/A/H9EZHiZiNH9Rl46Z0rPfsiBV5yZoZGvoAClyiarUzesTe3FkJhSlb98JISik0Si1Jz26bzuAQVmSO0394FQIA7SCEE9c9ByaHlu3CdtAslQ2ZQ0QjQ0T4uwNAVmDPkrk092S89IqgPwDFOJSRXLm6p17qby9gynfCWObGJKWcXP8ofIR1mNvlIHYFRGETsWsbtWZhjHM++lUSeytJ8Rqv3Ujc4onc8IzLUlZxY4zt86RmrV+V0PIUcBt5bnuylEBasCqqRaC+Xf4w2cPDlWvHd3CdF6suiRnxo3Ptx1x52RYNlnTzj2uHDm6WeEKztdEd9wcH2RfPfb8cVvHU49LXQuCPbu4hhvPrAyV5/b+kQ1K+/qTK1UjvRZ/l69hpRaAzyw6dXFbGUaE1K1xgOFXoYya9QeGJ+uKz2Q6Rp9T79RA8l8krYlVPOicGsRbNoPAUm+t5a6+1vgGr4P11HPcs7JvFP7y5g5NBCslG5EUxWYfitXsl7MA96/X/8i9Qv333d/XJPg/qInuqvoLfvcfnscslnv1RDspuJTurn3zcVvfQrVe2ectJCO6de3X0wUiB4unTMlKH+Wv6dylVOZbFoSCFY8ZSJYvTsPrd6/XEbXzM7FPmfIyaSg16cefOesYbPlBLQkXoorZCvTq7MJqm9Aqu6N4+RFAVBhhmhlgkWohoK85swMhl7yphbLqigjI2PW0GAigDIx1UKt/aSvvv7WZMBrawgiGeYgA3YmwwTDLWQg+W6bod2o4tO+HAiGAey3pH+V8KWmUGuf9Ld8WgMQFaJjB0sky9Nt2KbeEKt9hKIx+tuH+cD+9mVWYGvjsFFH6bUa7IQg9IUjxzZK2bUjV2ExjnM8+x9bI/NEmWDZFMV0ci5w3HASsXeJeRRtkJGRMXtow9jN9lRWUomoEklVU0J5G5JFEsgRsfIienBjxEHfvnEYzJ6akm0CxhGufREukpZHLTVd/nt628qwrbUQrLKwf4q3FA7E+YDkEJmV78UYs9+lFeLZatkOeVzZWJsiWNEDIDSHA8g2atW9pFg5dzgPeM+pYM4QxG0/di9RBzzg/ubAYA9kt+Mkso1DJpkRMjIyZg1t2AENKalOBm0PE7KEMnlJHtqUqr+lxHYnD84DZItUKFVKtpxs85t9kLxjHDuj/NNv5fIBIjUMRxjyZZNE1vZvLVBGXk91bSifvPkUpaB3HQ4Psm2G6e6HeGFEaB8Ey7GSgtTtRwEDgqVWbRMz6Fxe/exvHl7TLpNaTW9Z5cDh+DF10t9IXUyimTw877ZRtkwZGRkZs442VJMQEsNXXm6xfOyqUyZPid47w9aqopxRSnAc+x6vLvIrJ9v8lvIGn9Mj13JK+ydC5wxD3K4BeZkFhmjTvi0N5eDV5al1zTy51CISo06pVbGxwmNso1zVD/BwU6GzSrAp9lK8pPsMOtRkguD5NulAvlQt0wDbL1WM8NlhtY3yjKiMjIyZR5vXX30tOqCuuvLKYK3Xnjf1DG++9npcnMUw3vA9zRNO5FZNs4Omjq21PW1LCQkjVWSlQ+AQE2dnaIsYBCT7ZJ5oLdBRCU9BYsJZBHEnpxczgZfJsZkm8qNkOaSQrlk5ZRMBuyhbqf0M+ZGmufRiDG0zhVQdCZD3N7ur2EK2bmEutkkcbRxm4kkRrFd2UMzImenGrB2f2dGVkTF7iATrldkItXvX68NVna4IbxQEK6TqxBNOiDGHZnWIFWRHFZiNCDyYzADUKKXlIUxD/ESCKVXJsfy9+ntKHnKkLlHSVJRZKsjFjBPTdcUdKhvnmPg5UQrCnqg8CtYMsNYCNm5OIzZRzqbkaPLdMBz5qUuzWQRxI1QB2OlFdY7j8EKwzB9WHrJdHmlOtmMEYJsFow7Vi6mhyNN5qGDHsP/aZtRitEJJO955zQFXTucS0E3luq8ZGRmzjkiw3kTgTQNdr70unHv2OeGF554PN/fqHU48/ttFei8qSOuQgw6OKosSEiKEzKgms0eEFXFsUboCntlUBVAjRTZWIUQeZCl9R6BspP6WfLcdoSJrJILM2QwRhRWPKDqB2hQgElEWdkTqVeCycphaJwhaIHg1vrQloZPQIRiuU4yWbjN90EwXHQFFDuoN8VGmhvjmsQusNivI/Gz2W50SmyoHFFOBsCuxrRxk6oa5BNSnjtGx8mKTlRelamojcwpSV/fUqm3yadu2bSRZ5ZjR1NuMjIym0UCwI4YOj6rVItjIFsGe0eH0cEOPHlHdXtO5S7j80svChR07RpVI2bDRmXli6h2iu+zyyyIpsoUyL3CeeYipTcqT7dCw3ZCe+uXwQdKGwVSxhJSRDFJFFmyM8kem/kbuFKqoA8eZxeI7gmXOcD5xowiW06g1QcfBrKGc6kFdCfxHmGXoZNSFcDazhHRA7MnsrJRwgqgLkzEM46n6ZD8vQ15CuJxTJ8gEwB4rP/mmcyubc1HSOjXnd2xGRsbsIxKslxI+cN/9cTHsww45NPTo1j30uqlnnGl11RVXxhlWVsvq3bNXnASAPBGZqX/snoatFNDlnS6PD+eDBZFa55XKPKYgYF7wtEg34qNGkYUhPzugRSjsS+EhDEHvN9x4Q7j9ttujg6d7UR7nQtSIl3p+cdo0W3GjyBvBepW3slxSqO6ri2FvWhkpIyMjoyXQxmu4zah64P4H4vDT2wiis+vGm8LRRx4Vp7KavvrKyxOiqjVTixJFdBQWZWQo7jvitcartQmQI8V0bZdr4lRaJIn4hhb7+dv5vInWW2QtEkMt7/nHPaKZ4o4BAyNBDy0I85mnng6PPfponBE2siDSR4s8u1zdOb4dwboFvQuCFaj/3LOFgh0yNL5kcf999wudC6J96803p11mRkZGRvOjjWE6ZUjtsWGefdZZ4aKOF4Ybu98QLjy/YyRZCpfSveXmW8JDDz4U7X9sr9Sm4wzFhfsgz2EFyVld66GCQL22++4774pOtDv6D4z5vCGfgqgH9h8QlfHQwUNCp8suD8cefUzYcfsdglfODCz2P+uMM8P555wX3nv3vfDySy+H2265Napob0o45qij42tnLBKD9EcWZXq+IFjkftbpZ4Tdd90tknB50YiMjIyM5kYkWEuMUaJWAWLTRG4XX3RxXJKQ04sqfPyxx0LfPn3jMoIUI4KlZBGsmVlsdux37IpjRo+O+7ClUp43dO8Rbrv1tnD3XXeHt996Ow7rKU/K1IpDHGiHH3Z4OK1Qy5Qrorz6qqvDLjvtHO3BVGz/vv3CI6MejgkZU7zswswaox4aGQl2eHGctWmZOSwoM6Eg5oyMjIyWQgPBIkc2UcN8NlPB+iOGD48KkUOLSuWQMuwvE+zwEcMbtrO/yoezpUyw3bt1i0R6Z3GMbQhW4pxiy/UKDU4ydloONMc+8vAj4YD99o/kzhxACSNSKpZd2DardpUVrG1+s3rXxRdeFBcDz8jIyGgptOG1Z0NlHnj+uYKkRoyIjiiLiBjGx/Ctrl3DrbfcEol0dKFUmQh4rTmX7r//vjCgULDUL4KNCnbMmEi+vNwIu1evnpHE+xckLWxLkD0bLYJl973pphsjAXOCnVwM/dlz333nnWgWsEasKId7CvWLdEc/9ni0D0eTwJCh8TtVG9eWLQiWDRfJMnOw5WZkZGS0FNq89caboV9BghxKT4wdG0YWKvHeglTTEBxJGZ4juVsLwmMDtY/QrYceeDDcP6Ig2H794+tjBheke1ehNBGhxbbfLPJmGnD8oIJ8by5IlMOsV8+e8X1eY4tjnHfwPYOi/dY52E57dO8RnVnCua6bFj1AQUeCLdTxjTfcGIkeASujCIhnn36mgWB7XN8tXHbJpVHd5iD5jIyMlkIbkwqoPZEDQrMG9BsQbZccSJxJFCQ7JweV924NLH5HhNd1uSZu8xsn1ZjHxxRqd0hcaJuqHDZkWCTYq4p8bioIEQkiz67XXBfto48/8lgka2qTY6vXjT3DowWBChFjQ+1w2mkxztXEAfG0wq/YeqlkEx4co8xMAc6vLAg2XcsF550ft2c7bEZGRkuhjTe8XleoPkqRQuVgMqtISNSFBVmdd+554Z5CrT76yKPhmi5dCpU6OCpc+947eHChWO8sFGf3OB9+/Lhx4fquXaMC5ZiyuIn97OM1MNRwp8s6Rbss8n1q/FPxlTOXXXppDBV7viD7QYWadc7TO3SIMbBDhg6N0QpmO3HEcaqZcHAusi9UrXT5ZZfFCAdvrvWeMOYHqtwi4M89+9dXImdkZGQ0J9oIZTKzx5J01hcwzdI0VjOtki3VdvuZhcSGyrbKOcZhxYaLXK0O5RhDePZY0y+tUeBYy+75277I0jZD90mTJ8UJAmYQpXM4v0kIJhuw8TqH2Uem4Prud0vsKZuZSKZyimAwM+mTTz+JfzuP3xC8MmVkZGS0BNpM+8zIyMjImMPIBJuRkZFRJ2SCzcjIyKgTMsFmZGRk1AmZYDMyMjLqhEywGRkZGXVCJtiMjIyMOiETbEZGRkadkAk2IyMjo07IBJuRkZFRJ2SCzcjIyKgTMsFmZGRk1AmZYDMyMjLqhEywGRkZGXVCJtiMjIyMOiETbEZGRkadkAk2IyMjo07IBJuRkZFRJ2SCzcjIyKgTMsFmZGRk1AmZYDMyMjLqhEywGRkZGXVCJtiMjIyMuiCE/wcL1m7o8TwI8gAAAABJRU5ErkJggg==";

    doc.addImage(img, "PNG", 10, 5, 30, 20);

    let texto = 'BOLETIM PARA CAPTURA ENTOMOLÓGICA ';

    const larguraPagina = doc.internal.pageSize.getWidth();

    // Calcula a posição X para centralizar o texto
    const larguraTexto = doc.getTextWidth(texto);
    const posX = (larguraPagina - larguraTexto) / 2;

    //doc.text(texto, posX, 10);
    doc.text(texto, larguraPagina / 2, 10, null, null, "center");

    //let txtCabeca = `Município: ${cabeca.municipio}`;
    let txtCabeca = `Município: ${cabeca.municipio}  Área: ${cabeca.area}  Quarteirão: ${cabeca.quarteirao}`;
    doc.text(txtCabeca, larguraPagina / 2, 20, null, null, "center");

}
