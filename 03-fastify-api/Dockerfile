# ==========================================
# STAGE 1: Builder
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# ==========================================
# STAGE 2: Runner (Production)
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 1. Cria o usuário e grupo
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 2. Copia os arquivos
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist

# 3. CRÍTICO: Garante permissão na pasta de trabalho para o usuário instalar dependências
# Isso corrige o erro "EACCES: permission denied, mkdir '/app/node_modules'"
RUN chown -R appuser:appgroup /app

# 4. Agora sim, mudamos para o usuário seguro
USER appuser

# 5. Instala dependências de produção
RUN npm ci --omit=dev && npm cache clean --force

EXPOSE 3333

CMD ["npm", "run", "start"]