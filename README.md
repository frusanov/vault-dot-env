# vault-dot-env

## Intended Use

```yaml
version: '3.8'

services:
  vault-dot-env:
    image: vault-dot-env
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/health"]
      interval: 1m30s
      timeout: 10s
      retries: 5
      start_period: 40s
      start_interval: 5s
    environment:
      - VAULT_ADDRESS=https://vault.example.com
      - VAULT_TOKEN=your-token
      - DOT_ENV_PATH=/vault
      - DOT_ENV_FILE=.env.local
      - VARIABLE_0=kv/data/secret.path.in.object:ENV_VAR_NAME
      - VARIABLE_1=kv/data/secret:ENV_VAR_NAME # JSON will be written in env variable
      - VARIABLE_1=kv/data/other_secret.path.in.array.0.param # env variable will be OTHER_SECRET_PATH_IN_ARRAY_0_PARAM
    volumes:
      - some-app-data:/vault

  some-app:
    image: some-app:latest
    depends_on:
      - vault-dot-env
    volumes:
      - some-app-data:/data

volumes:
  some-app-data:
    external: true
```

## To install dependencies:

```bash
npm i
```

## To build:

```bash
npm run build
```
