// Importamos las librerías necesarias
const qrcode = require('qrcode-terminal');
const { Client, MessageMedia } = require('whatsapp-web.js');

// Inicializamos el cliente de WhatsApp
const client = new Client({
    puppeteer: {
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Ruta al ejecutable de Chrome
    }
});

// Evento para generar y mostrar el código QR para la autenticación
client.on('qr', qr => {
    qrcode.generate(qr, { small: true }); // Generamos y mostramos el QR en la terminal
});

// Evento para cuando el cliente de WhatsApp está listo
client.on('ready', () => {
    console.log('WhatsApp Funcionando');
});

// Inicializamos el cliente de WhatsApp
client.initialize();

// Función para enviar la imagen a los contactos con la etiqueta "lead-los"
client.on('message', async (message) => {
    // Verificamos si el mensaje es de un contacto que tiene la etiqueta "lead-los"
    if (message.from && message.from.includes('@c.us')) {  // Verifica que el mensaje es de un número de contacto
        const contact = await client.getContactById(message.from); // Obtenemos el contacto por ID
        const labels = await contact.getLabels(); // Obtenemos las etiquetas del contacto

        // Comprobamos si el contacto tiene la etiqueta 'lead-los'
        if (labels.some(label => label.name === 'lead-los')) {
            // Si el contacto tiene la etiqueta 'lead-los', enviamos la imagen
            const media = MessageMedia.fromFilePath('imagen1.jpg'); // Ruta a la imagen que deseas enviar
            await client.sendMessage(message.from, media); // Enviar la imagen al contacto
            console.log(`Imagen enviada a ${message.from}`);
        }
    }
});

// Función para retrasar la ejecución en milisegundos
const delay = ms => new Promise(res => setTimeout(res, ms)); // Esto permite crear una pausa entre procesos
