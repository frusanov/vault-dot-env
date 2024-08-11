FROM node:20-alpine

RUN mkdir /app
WORKDIR /app

COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

RUN npm i
RUN npm run build

# FROM node:20-alpine

# RUN mkdir /app
# WORKDIR /app

# COPY --from=build /build/dist /app/dist
# COPY --from=build /build/package.json /app/package.json
# COPY --from=build /build/package-lock.json /app/package-lock.json
# COPY --from=build /build/node_modules /app/node_modules

CMD ["node", "dist/index.js"]


# RUN mkdir /app
# WORKDIR /app


# RUN bun install

# CMD ["bun", "run", "index.ts"]
