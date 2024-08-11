import http from "node:http";
import Debug from "debug";

const debug = Debug("vault-dot-env:util:health-server");

export function runHealthServer(port: number) {
  return new Promise<http.Server>((resolve) => {
    const server = http.createServer(async (req, res) => {
      if (req.url === "/health") {
        res.writeHead(200);
        res.end("OK");
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    });

    server.listen(port, () => {
      debug("Server listening on port %d", port);
      resolve(server);
    });
  });
}
