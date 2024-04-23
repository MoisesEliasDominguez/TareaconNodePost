//Práctica server usando POST
const servidor = require('http');

const server = servidor.createServer((req, res) => {
    
    console.log('Incoming Request');
    console.log(req.method, req.url);

    if (req.method === 'POST') {
        let body = '';

        // Manejano de los datos de entrada 
        req.on('data', (chunk) => {
            body += chunk;
        });

        // Cuando se han recibido todos los datos, procesamos el formulario 
        req.on('end', () => {
            // Parseamos los datos del formulario
            const formData = new URLSearchParams(body.toString());
            // Obtenemos los valores de username y contraseña
            const userName = formData.get('username');
            const password = formData.get('password');
            
            // Enviamos una respuesta con los datos recibidos
            res.setHeader('Content-Type', 'text/html');
            res.write(`<p>Username: ${userName}</p>`);
            res.write(`<p>Password: ${password}</p>`);
            res.end();
        });
    }
    
    else {
        // Si la solicitud no es un POST, enviamos el formulario
        res.setHeader('Content-Type', 'text/html');
        res.write('<form method="POST">');
        res.write('<label for="username">Username:</label>');
        res.write('<input type="text" id="username" name="username"><br>');
        res.write('<label for="password">Password:</label>');
        res.write('<input type="password" id="password" name="password"><br>');
        res.write('<button type="submit">Enviar</button>');
        res.write('</form>');
        res.end();    
    }
});

server.listen(5001, () => {
    console.log('Servidor escuchando en el puerto 5001');
});
