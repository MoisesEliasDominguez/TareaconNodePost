//Práctica server usando POST
const servidor = require('http');

const server = servidor.createServer((req, res) => {
    
    console.log('Incoming Request');
    console.log(req.method, req.url);

    if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            const formData = new URLSearchParams(body.toString());
            const userName = formData.get('username');
            const password = formData.get('password');
            
            res.setHeader('Content-Type', 'text/html');
            res.write(`<p>Username: ${userName}</p>`);
            res.write(`<p>Password: ${password}</p>`);
            res.end();
        });
    }
    
    else {
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

server.listen(5001);
});
