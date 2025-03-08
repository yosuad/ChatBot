const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encuentras la documentación, recuerda que puedes mejorarla.',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para el siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encuentras un ejemplo rápido.',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para el siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para el siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para el siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

// Flujo para correos y comprar página web
const flowCorreoWeb = addKeyword(['correo', 'email', 'contactar']).addAnswer(
    [
        '📧 Si deseas ponerte en contacto con nosotros, puedes escribirnos a nuestro correo electrónico:',
        '✉️ contacto@wiquiweb.com',
        '\n*2* Para el siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowComprarWeb = addKeyword(['comprar web', 'página web', 'web']).addAnswer(
    [
        '🌐 ¿Estás interesado en comprar tu propia página web? ¡Nosotros podemos ayudarte!',
        '💻 Visita nuestro sitio web para más información y precios: [https://wiquiweb.com](https://wiquiweb.com)',
        '\n*2* Para el siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Bienvenido a *Wiquiweb*, tu solución digital para páginas web y servicios online.')
    .addAnswer(
        [
            'Te comparto los siguientes links de interés sobre nuestros servicios:',
            '👉 *doc* para ver la documentación',
            '👉 *gracias* para ver la lista de videos',
            '👉 *discord* para unirte al discord',
            '👉 *correo* para contactar con nosotros por email',
            '👉 *comprar web* si quieres adquirir tu propia página web',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord, flowCorreoWeb, flowComprarWeb]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
