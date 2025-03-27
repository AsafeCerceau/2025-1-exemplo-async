const amqp = require("amqplib");
async function produce() {
    try {
        const connection = await amqp.connect("amqp://localhost"); // Aqui a gente vai conectar com a fila
        const channel = await connection.createChannel(); // Esse canal é como a gente consegue chegar na nossa fila
        const queue = 'mensagens'; // Aqui eu declaro a fila. 
        await channel.assertQueue(queue,{durable: false}); // Se a fila não existir, ela é criada automaticamente

        let messageCount = 1;

        setInterval(() => {
            const message = 'Messagem ${messageCount}';
            channel.sendToQueue(queue, Buffer.from(message));
            console.log('Enviada: ${mensagem}');
            messageCount++;
        }, 2000);
    }catch (error) {
        console.error("Erro: ", error);
    }
}
produce();

// No terminal escrever
// npm install
// docker compose up
// Na porte 2 (clicar no símbolo do globinho)
// login: guest; guest