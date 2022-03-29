const http      = require('http');
const socketio  = require('socket.io');
const Web3      = require('web3');
const moment    = require('moment');

const web3     = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8556'));

const server = http.createServer((req,res)=>{
    res.end('Server is running');
});

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

const io = socketio(server,{
    cors:{
        origin: '*',
        methods: ['GET'],
    }
});

//Blokları takip etmek için abonelik başlattık
let blokTakip = web3.eth.subscribe('newBlockHeaders');

//Blokları dinliyoruz
blokTakip.on('data',(blockHeader)=>{

    blockHeader.timestamp = moment.unix(blockHeader.timestamp).format('HH:mm:ss');

    io.emit('blockHeader',blockHeader);

    web3.eth.getBlock(blockHeader.number).then((transfer)=>{
        io.emit('transfer',transfer.transactions);
    });
});

io.on('connection',(socket)=>{
    //Soket idsini gösterioruz
    console.log('New user connected : ' + socket.id);

    //son 4 bloğu kullanıcıya emit ediyoruz
    web3.eth.getBlockNumber((req,res)=>{
        let geriGidilecekBlokSayisi = res - 4;
        for(let i = geriGidilecekBlokSayisi; i <= res; i++){
            web3.eth.getBlock(i,(req,blokBilgileri)=>{
                blokBilgileri.timestamp = moment.unix(blokBilgileri.timestamp).format('HH:mm:ss');
                socket.emit('blockHeader',blokBilgileri);
            });
        }
    })

    web3.eth.getBlock('latest').then((transfer)=>{
        socket.emit('transfer',transfer.transactions);
    });

})