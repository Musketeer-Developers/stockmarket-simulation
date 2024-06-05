# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY overlay/staging/configmap/.env .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app ./
COPY --from=builder /app/overlay/staging/configmap/.env .
#COPY --from=builder /app/public ./public

ENV NEXT_PUBLIC_AI_COTENT https://ai.stickball.biz:8010
ENV NEXT_PUBLIC_TEXT_CONTENT https://ai-two.stickball.biz:8008
ENV NEXT_PUBLIC_KEYWORDS https://ai.stickball.biz:8014
ENV NEXT_PUBLIC_TIKTOK https://ai.stickball.biz:8004
ENV NEXT_PUBLIC_YOUTUBE https://ai.stickball.biz:8002
ENV NEXT_PUBLIC_MCQS https://ai.stickball.biz:8006
ENV NEXT_PUBLIC_TRUE_FALSE https://ai.stickball.biz:8012
ENV NEXT_PUBLIC_AI_VIDEO https://ai.stickball.biz:8018
ENV NEXT_PUBLIC_API_LINK https://temporary-staging-sbserver.up.railway.app
ENV NEXT_PUBLIC_BUCKET_NAME stickball
ENV NEXT_PUBLIC_REGION us-east-1
ENV NEXT_PUBLIC_ACCESS_KEY_ID AKIAQBXNDZNKO24XB2PJ
ENV NEXT_PUBLIC_SECRET_ACCESS_KEY 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
ENV NEXT_PUBLIC_TESTING_APP https://stickball-testing-view-stagging.netlify.app/?skillID=
ENV NEXT_PUBLIC_S3_BUCKET_LINK https://stickball.s3.amazonaws.com/
ENV NEXT_PUBLIC_X_API_KEY ee323a-1232asdfdasf2323@32asdfds-asdfd|--|ee323a-1232asdfdasf2323@32asdfds-asdfd
ENV NEXT_PUBLIC_APP_CLIENT https://stickball-main-client.netlify.app/

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=nextjs:nodejs /app/.next/ ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/ ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]