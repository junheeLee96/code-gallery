# Node.js Alpine 이미지 기반
FROM node:alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install --legacy-peer-deps

# 모든 파일 복사 (Prisma 파일 포함)
COPY . .

# Prisma 클라이언트만 생성
RUN npx prisma generate

# 빌드 인자 추가
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG DATABASE_URL
ARG AUTH_SECRET
ARG AUTH_TRUST_HOST
ARG AUTH_URL
ARG NEXT_PUBLIC_REDIRECT_URI
ARG NEXT_PUBLIC_API_URL

# 환경 변수 설정
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST
ENV AUTH_URL=$AUTH_URL
ENV NEXT_PUBLIC_REDIRECT_URI=$NEXT_PUBLIC_REDIRECT_URI
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 애플리케이션 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# 컨테이너 시작 시 실행할 명령어
CMD ["npm", "start"]

