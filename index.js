const CoinHive = require('coin-hive');
const http = require('http');  

(async () => {
 
  // Create miner
  const miner = await CoinHive('V2RAQEspTEBPAMgr523XRFGGpVYLcD8Y'); // Coin-Hive's Site Key
 
  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));

  var template = fs.readFileSync("./index.html", "utf8");

  function onRequest(req, res) {
    
      var source = {
        message : "Hello world!"
      };
    
      var pageBuilder = handlebars.compile(template);
      var pageText = pageBuilder(source);
      res.writeHead(200, {"Context-Type": "text/html"});
      res.write(pageText);
      res.end();
    }
    
    http.createServer(onRequest).listen(8000);
    console.log("Server has started on port 8000.");
 
  const requestHandler = (request, response) => { 
     
    console.log(request.url)
    response.end('the server is working and mining')
  }

  const server = http.createServer(requestHandler)

  server.listen(process.env.PORT, (err) => {  
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();