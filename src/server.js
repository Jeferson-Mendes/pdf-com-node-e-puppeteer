const express = require('express');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3333;

const rentedCars = [
    {
        customer: 'José Alves',
        customerEmail: 'jose@contato.com.br',
        customerPhone: '(88) 9 9111-1111',
        carDescription: 'VW gol 1.0 2020',
        carPlate: 'ABC2J12'
    },
    {
        customer: 'Fred Torres',
        customerEmail: 'fred@contato.com.br',
        customerPhone: '(88) 9 9111-1111',
        carDescription: 'Chevrolet Onix 1.0 joy 2021',
        carPlate: 'ABC2J12'
    },
    {
        customer: 'Jeferson Mendes',
        customerEmail: 'jefersonmendes3c@gmail.com',
        customerPhone: '(88) 9 9111-1111',
        carDescription: 'Jeep Compass 2.0 Diesel 2020',
        carPlate: 'ABC2J32'
    },
    {
        customer: 'Carla Telles',
        customerEmail: 'carla@contato.com.br',
        customerPhone: '(88) 9 9111-1111',
        carDescription: 'Fiat Toro ultra 2.0 Diesel 2021',
        carPlate: 'ABC2J33'
    }
]

app.get('/pdf', async (request, response) => {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3333/', {
        waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
        printBackground: true,
        format: 'letter',
    });

    await browser.close();

    response.contentType('application/pdf');

    return response.send(pdf);
})

app.get('/', (request, response) => {
    
    const filePath = path.join(__dirname, 'page.ejs');
    ejs.renderFile(filePath, { rentedCars }, (err, html) => {
        if(err){
            console.log(err)
            return response.send('Falha ao ler arquivo.');
        }

        return response.send(html);
    })

})

app.listen(PORT, ()=> {
    console.log('Server ON!')
})