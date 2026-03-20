import { availableParallelism } from 'node:os';
import { config } from 'dotenv';
import cluster from 'cluster';
import http from 'http';
import { spawn } from 'node:child_process';
config();

const basePort = Number(process.env.PORT) || 3000;
const numCPUS = availableParallelism();
const numWorkers = numCPUS > 1 ? numCPUS - 1 : 1;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} запущен. Создаем ${numWorkers} воркеров... ${basePort} `);

  let workers = [];
  for (let i = 0; i < numWorkers; i++) {
    const workerPort = basePort + i + 1;
    const worker = cluster.fork({ PORT: workerPort });
    workers.push({ port: workerPort, pid: worker.process.pid });
  }
  let current = 0;
  http.createServer((req, res) => {
    const targetPort = workers[current];
    console.log(`[Proxy] Request for  ${req.url} -> redirected to worker on port ${targetPort.port}`);
    current=(current+1)%workers.length;
   const proxy=http.request({
    host:"127.0.0.1",
    port:targetPort.port,
    path:req.url,
    method:req.method,
    headers:req.headers
   }, (targetRes)=>{
    res.writeHead(targetRes.statusCode||200,targetRes.headers)
    targetRes.pipe(res)
   })
   proxy.on('error',()=>{
    res.writeHead(502)
     res.end(' ');
   })
   req.pipe(proxy)
  }).listen(basePort,  () => {
    console.log(`Balancer on http://localhost:${basePort}`);}
  );
} else {
  spawn('npx', ['fastify', 'start', '-l', 'info', 'dist/app.js', '--port', process.env.PORT!], {
    stdio: 'inherit',
    shell: true,
  });
}
