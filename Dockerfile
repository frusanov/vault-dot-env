FROM oven/bun:1

RUN mkdir /app
WORKDIR /app

COPY ./lib /app/lib
COPY ./index.ts /app/index.ts
COPY ./package.json /app/package.json
COPY ./bun.lockb /app/bun.lockb
COPY ./tsconfig.json /app/tsconfig.json

RUN bun install

CMD ["bun", "run", "index.ts"]
