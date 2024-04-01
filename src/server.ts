import net from 'net';
import {spawn} from 'child_process';


    
  net.createServer((connection) => {
    console.log('A client has connected.');
    connection.on('data', (dataBuffer) => {

        const message = JSON.parse(dataBuffer.toString());
        console.log(message)
        if(message.parameters !== ''){
            const command = spawn(message.command, [message.parameters]);
            command.stderr.on('data', (data) => {
                console.log("comando no soportado");
            })
            command.stdout.pipe(process.stdout);
        } else if(message.parameters === ''){
            const command = spawn(message.command);
            command.stderr.on('data', (data) => {
                console.log("comando no soportado");
            })
            command.stdout.pipe(process.stdout);
        }
        

    })
    
    connection.on('close', () => {
      console.log('A client has disconnected.');
    });
  }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });
