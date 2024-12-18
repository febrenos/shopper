# Etapa de construção
FROM node:23.0.0-slim AS builder

# Criação do diretório de trabalho
WORKDIR /api

# Copiar os arquivos de configuração de dependências
COPY ./api/package*.json ./
COPY ./api/prisma ./prisma

# Instalar as dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa de produção
FROM node:23.0.0-slim

WORKDIR /api

# Copiar as dependências e código compilado da etapa de construção
COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/package*.json ./
COPY --from=builder ./app/dist ./dist

# Expõe a porta 3000 para a aplicação
EXPOSE 3000

# Comando para rodar a aplicação em produção
CMD [ "npm", "run", "start:prod" ]
