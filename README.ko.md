# better-ccflare 🛡️
[![Mentioned in Awesome Claude Code](https://awesome.re/mentioned-badge.svg)](https://github.com/hesreallyhim/awesome-claude-code)

**모든 요청을 추적하세요. 깊이 파고드세요. 이제 레이트 리밋은 없습니다.**

여러 계정에 걸쳐 지능형 로드 밸런싱을 제공하는 최강의 Claude API 프록시. 모든 요청, 응답, 레이트 리밋을 완전히 가시화합니다.

**🚨 주요 업데이트 (v3.0.0):** 이 릴리즈에는 중요한 보안 수정, OAuth 토큰 상태 모니터링, 새 공급자 지원(NanoGPT, Minimax)이 포함됩니다. 모든 사용자는 즉시 업그레이드하세요. 자세한 내용은 [마이그레이션 가이드](docs/migration-v2-to-v3.md)를 참고하세요.


https://github.com/user-attachments/assets/c859872f-ca5e-4f8b-b6a0-7cc7461fe62a


![better-ccflare 대시보드](apps/lander/src/screenshot-dashboard.png)

## 왜 better-ccflare인가요?

- **🚀 레이트 리밋 에러 제로** - 여러 계정에 걸쳐 요청을 자동으로 분산
- **🤖 다중 공급자 지원** - Claude OAuth, Claude API 콘솔, Vertex AI, AWS Bedrock, NanoGPT, z.ai, Minimax, OpenRouter, Kilo, Anthropic 호환, OpenAI 호환 공급자 지원
- **🔒 OAuth 토큰 상태 모니터링** - 자동 갱신 및 상태 표시기를 통한 OAuth 토큰 실시간 모니터링
- **🔗 커스텀 API 엔드포인트** - 엔터프라이즈 배포를 위한 Anthropic 계정 커스텀 엔드포인트 설정
- **☁️ OpenAI 호환 지원** - OpenRouter, Together AI 등 OpenAI 호환 공급자를 Claude API 형식으로 사용
- **🔄 스마트 자동 폴백** - 레이트 리밋이 초기화되면 선호 계정으로 자동 전환
- **⚡ 자동 갱신** - 레이트 리밋 초기화 시 30분 버퍼를 두고 새 사용 윈도우 자동 시작
- **📊 요청 수준 분석** - 최적화된 배치 처리로 지연시간, 토큰 사용량, 비용을 실시간 추적
- **🔍 심층 디버깅** - 전체 요청/응답 로깅 및 에러 추적
- **🔐 API 인증** - 안전한 키 관리를 통한 선택적 API 키 인증
- **⚡ 10ms 미만 오버헤드** - 지연 로딩 및 요청 중복 제거로 최소한의 성능 영향
- **🛡️ 보안 강화** - 인증 우회, 커맨드 인젝션, 자격 증명 유출에 대한 중요 보안 수정
- **💸 무료 오픈소스** - 직접 실행하고, 수정하고, 인프라를 소유하세요

### 왜 이 포크인가요?

이 프로젝트는 [snipeship/ccflare](https://github.com/snipeship/ccflare)의 훌륭한 기반 위에 구축되었으며 상당한 개선이 이루어졌습니다:

**🎯 핵심 개선사항 (v3.0.0):**
- **보안 강화** - 인증 우회, 커맨드 인젝션, PKCE 구현에 대한 중요 수정
- **OAuth 토큰 상태 모니터링** - 실시간 상태 표시기 및 30분 버퍼를 통한 자동 토큰 갱신
- **확장된 공급자 지원** - AWS Bedrock, NanoGPT(동적 가격 책정), Minimax, OpenRouter, Kilo, Anthropic 호환, OpenAI 호환 공급자
- **간소화된 로드 밸런싱** - 티어 시스템 제거, O(1) 우선순위 기반 선택
- **실시간 분석 대시보드** - 요청 기록이 사라지지 않는 아름다운 웹 UI
- **패키지 배포** - npm 및 bun으로 손쉬운 설치

**🛠️ 개발자 경험:**
- **강력한 CLI** - 계정 관리 및 설정을 위한 완전한 커맨드라인 인터페이스
- **REST API** - 자동화 및 통합을 위한 완전한 API
- **크로스 플랫폼 바이너리** - Node.js 또는 Bun에서 동작하는 사전 컴파일 바이너리
- **종합적인 로깅** - 검색 가능한 기록을 포함한 요청/응답 추적
- **데이터베이스 통합** - 지속적인 저장 및 분석을 위한 SQLite(기본) 또는 PostgreSQL, Kubernetes 멀티 파드 배포 지원

**📦 배포 및 업데이트:**
- **npm/bun 레지스트리** - `npm install -g better-ccflare` 또는 `bun install -g better-ccflare`로 설치
- **npx/bunx 지원** - 설치 없이 실행: `npx better-ccflare` 또는 `bunx better-ccflare`
- **스마트 업데이트 감지** - 웹 UI에서 패키지 매니저를 감지하고 적절한 업데이트 명령어 표시
- **버전 관리** - 자동 업데이트 알림을 포함한 시맨틱 버저닝

**🏢 프로덕션 준비 완료:**
- **엔터프라이즈 기능** - 커스텀 API 엔드포인트, 세션 관리, 고급 분석
- **성능 최적화** - 요청 중복 제거 및 캐싱으로 10ms 미만 오버헤드
- **안정성** - 자동 에러 복구, 서킷 브레이커, 상태 모니터링
- **확장성** - 고처리량 프로덕션 환경을 위해 구축
- **PostgreSQL 지원** - `DATABASE_URL=postgresql://...` 설정으로 SQLite 파일 공유가 불가능한 Kubernetes 멀티 파드 배포에 PostgreSQL 사용

## 빠른 시작

### npm으로 설치 (Linux x86_64)

```bash
npm install -g better-ccflare

# better-ccflare 시작 (서버 + 대시보드)
better-ccflare
```
[Claude SDK 설정](#claude-sdk-설정)으로 이동하세요.

**⚠️ Windows npm 설치 문제**: Windows에서 npm으로 설치 후 `"C:\\Program Files\\nodejs\\\\node_modules\\better-ccflare\\dist\\better-ccflare" is either misspelled or could not be found` 같은 경로 오류가 발생하면, 이는 npm이 래퍼 스크립트를 생성하는 방식에 영향을 미치는 알려진 [npm 버그](https://github.com/npm/cli/issues/969)입니다. 해결 방법은 [Windows 문제 해결](#windows-문제-해결)을 참고하세요.

### bun으로 설치

```bash
bun install -g better-ccflare

# better-ccflare 시작 (서버 + 대시보드)
better-ccflare
```
[Claude SDK 설정](#claude-sdk-설정)으로 이동하세요.

### 사전 컴파일 바이너리 설치 (모든 아키텍처)

[GitHub Releases](https://github.com/tombii/better-ccflare/releases/latest)에서 플랫폼에 맞는 바이너리를 다운로드하세요:

#### Linux x86_64
```bash
wget https://github.com/tombii/better-ccflare/releases/latest/download/better-ccflare-linux-amd64
chmod +x better-ccflare-linux-amd64
./better-ccflare-linux-amd64
```

#### Linux ARM64 (Raspberry Pi 3/4/5, Oracle Cloud ARM, AWS Graviton)
```bash
wget https://github.com/tombii/better-ccflare/releases/latest/download/better-ccflare-linux-arm64
chmod +x better-ccflare-linux-arm64
./better-ccflare-linux-arm64
```

#### macOS Intel
```bash
curl -L -o better-ccflare-macos-x86_64 https://github.com/tombii/better-ccflare/releases/latest/download/better-ccflare-macos-x86_64
chmod +x better-ccflare-macos-x86_64

# macOS에서 서명되지 않은 바이너리 실행을 위한 격리 속성 제거
xattr -d com.apple.quarantine better-ccflare-macos-x86_64

./better-ccflare-macos-x86_64
```

#### macOS Apple Silicon
```bash
curl -L -o better-ccflare-macos-arm64 https://github.com/tombii/better-ccflare/releases/latest/download/better-ccflare-macos-arm64
chmod +x better-ccflare-macos-arm64

# macOS에서 서명되지 않은 바이너리 실행을 위한 격리 속성 제거
xattr -d com.apple.quarantine better-ccflare-macos-arm64

./better-ccflare-macos-arm64
```

**macOS Gatekeeper 안내:** macOS 바이너리는 유료 Apple Developer 구독이 필요하기 때문에 Apple의 공증을 받지 않았습니다. 다운로드 후 위의 `xattr` 명령으로 격리 속성을 제거해야 바이너리를 실행할 수 있습니다. 서명되지 않은 바이너리 실행을 원하지 않는다면 [소스에서 설치](#소스에서-설치)할 수 있습니다.

#### Windows x86_64
[`better-ccflare-windows-x64.exe`](https://github.com/tombii/better-ccflare/releases/latest/download/better-ccflare-windows-x64.exe)를 다운로드하여 실행하세요.

### 설치 없이 실행 (npx/bunx)

```bash
# npx로 실행 (최신 버전 다운로드 후 실행)
npx better-ccflare@latest

# bunx로 실행 (bun 사용자에게 더 빠름)
bunx better-ccflare@latest
```

### 소스에서 설치

```bash
# 클론 및 설치
git clone https://github.com/tombii/better-ccflare
cd better-ccflare
bun install

# 대시보드 빌드 (첫 실행 전 필수)
bun run build

# better-ccflare 시작 (TUI + 서버)
bun run better-ccflare
```

**참고**: 서버 시작 전 최소 한 번은 `bun run build`를 실행하여 대시보드 파일을 빌드해야 합니다. 빌드 단계가 포함된 `bun run better-ccflare`를 실행해도 됩니다.

### 환경 변수

better-ccflare는 설정을 위한 여러 환경 변수를 지원합니다:

```bash
# 서버 설정
PORT=8080                              # 서버 포트 (기본값: 8080)
BETTER_CCFLARE_HOST=0.0.0.0           # 서버 바인딩 호스트 (기본값: 0.0.0.0, 로컬호스트 전용은 127.0.0.1 사용)
CLIENT_ID=your-client-id              # OAuth 클라이언트 ID
BETTER_CCFLARE_CONFIG_PATH=/path/to/config.json  # 커스텀 설정 위치
BETTER_CCFLARE_DB_PATH=/path/to/database.db  # 커스텀 데이터베이스 경로 (기본값: ~/.config/better-ccflare/better-ccflare.db)
                                       # 개발/테스트 시 별도 데이터베이스 사용 가능

# 로깅 및 디버깅
LOG_LEVEL=INFO                         # 로그 레벨 (ERROR, WARN, INFO, DEBUG)
LOG_FORMAT=json                        # 로그 형식 (json 또는 text)
better-ccflare_DEBUG=0                  # 디버그 모드 활성화 (1이면 활성화)

# SSL/TLS 설정
SSL_KEY_PATH=/path/to/key.pem          # SSL 개인키 경로 (HTTPS용)
SSL_CERT_PATH=/path/to/cert.pem        # SSL 인증서 경로 (HTTPS용)

# 로드 밸런싱
LB_STRATEGY=session                    # 로드 밸런싱 전략 (기본값: session)
SESSION_DURATION_MS=18000000           # 세션 지속 시간 (밀리초, 5시간)

# 재시도 설정
RETRY_ATTEMPTS=3                       # 재시도 횟수
RETRY_DELAY_MS=1000                   # 초기 재시도 지연 (밀리초)
RETRY_BACKOFF=2                        # 재시도 백오프 배수
```

**보안 참고사항**:
- 보안 강화를 위해 `BETTER_CCFLARE_HOST=127.0.0.1`로 로컬호스트에만 바인딩하세요
- 민감한 값이 포함된 `.env` 파일을 버전 관리에 커밋하지 마세요
- 프로덕션 배포에는 환경별 설정을 사용하세요

### .env 파일 사용

better-ccflare는 손쉬운 설정 관리를 위해 `.env` 파일을 자동으로 지원합니다:

```bash
# 예시 .env 파일 복사
cp .env.example .env
# 설정 편집
nano .env
```

**모든 배포 방법에서 지원됩니다**:
- **CLI 바이너리**: 현재 작업 디렉토리에서 `.env` 자동 로드
- **Docker Compose**: `docker-compose.yml`과 같은 디렉토리의 `.env` 자동 로드
- **Docker**: `.env` 파일 마운트 또는 변수 직접 전달

**`.env` 파일 예시**:
```bash
# 서버 설정
PORT=8080

# SSL/TLS 설정 (선택사항)
SSL_KEY_PATH=/path/to/ssl/key.pem
SSL_CERT_PATH=/path/to/ssl/cert.pem

# 로드 밸런싱
LB_STRATEGY=session

# 로깅 및 디버깅
LOG_LEVEL=INFO
LOG_FORMAT=pretty

# 데이터베이스 설정
DATA_RETENTION_DAYS=7
REQUEST_RETENTION_DAYS=365
```

### Docker (멀티 플랫폼: linux/amd64, linux/arm64)

```bash
# docker-compose로 빠른 시작
curl -O https://raw.githubusercontent.com/tombii/better-ccflare/main/docker-compose.yml

# 선택사항: .env 파일 생성 및 설정
cp .env.example .env
nano .env

# docker-compose로 시작 (.env 파일 자동 로드)
docker-compose up -d

# 또는 docker run으로 환경 변수 지정
docker run -d \
  --name better-ccflare \
  -p 8080:8080 \
  -v better-ccflare-data:/data \
  -e SSL_KEY_PATH=/path/to/ssl/key.pem \
  -e SSL_CERT_PATH=/path/to/ssl/cert.pem \
  ghcr.io/tombii/better-ccflare:latest

# 로그 확인
docker logs -f better-ccflare

# 계정 관리
docker exec -it better-ccflare better-ccflare --add-account myaccount --mode claude-oauth --priority 0
docker exec -it better-ccflare better-ccflare --list
```

**사용 가능한 Docker 태그:**
- `latest` - 최신 안정 릴리즈
- `main` - main 브랜치 최신 빌드
- `1.2.28`, `1.2`, `1` - 특정 버전 태그
- `sha-abc123` - 커밋별 태그

자세한 Docker 문서는 [DOCKER.md](DOCKER.md)를 참고하세요.

## Claude SDK 설정

### 옵션 1: OAuth를 이용한 Claude CLI 사용 (Claude Pro/Team이 있는 경우 권장)

Claude Pro 또는 Team 구독이 있고 Claude CLI에 로그인되어 있는 경우:

```bash
# 기본 URL만 설정 - API 키 불필요!
export ANTHROPIC_BASE_URL=http://localhost:8080

# better-ccflare 대시보드에서 계정을 설정하세요

# Claude CLI 시작 (기존 로그인 사용)
claude
```

**중요:** OAuth 로그인이 활성화된 상태에서 Claude CLI를 사용할 때는 `ANTHROPIC_AUTH_TOKEN`을 설정하지 **마세요**. 둘 다 설정하면 Claude CLI에서 인증 방법 충돌 경고가 발생합니다.

### 옵션 2: API 키 인증 사용

Claude CLI의 OAuth 로그인을 사용하지 않거나 API 키 인증을 선호하는 경우:

```bash
# 현재 Claude CLI에 로그인되어 있다면 먼저 로그아웃
claude /logout

# 기본 URL과 API 키 모두 설정
export ANTHROPIC_BASE_URL=http://localhost:8080

# better-ccflare에 API 키가 설정되지 않은 경우 (개방 접근):
export ANTHROPIC_AUTH_TOKEN=dummy-key

# better-ccflare에 API 키가 설정된 경우 (보호됨):
# 먼저 키 생성: better-ccflare --generate-api-key "My VPS"
export ANTHROPIC_AUTH_TOKEN=btr-abcdef1234567890...  # 실제 better-ccflare API 키 사용

# better-ccflare 대시보드에서 계정을 설정하세요

# Claude CLI 시작
claude
```

### 옵션 3: 원격/헤드리스 VPS 설정 (보안 프록시)

신뢰할 수 없는/임시 머신에 OAuth 자격 증명을 저장하지 않고 신뢰할 수 있는 서버에서 better-ccflare를 사용하세요:

**신뢰할 수 있는 서버 (better-ccflare 실행 중):**
```bash
# OAuth로 Claude 계정 추가
better-ccflare --add-account myaccount --mode claude-oauth --priority 0

# 원격 접근을 위한 API 키 생성
better-ccflare --generate-api-key "Remote VPS"
# 생성된 키 저장: btr-abcdef1234567890...

# 서버 시작 (원격 접근 가능하도록 설정)
better-ccflare --serve
```

**신뢰할 수 없는/임시 VPS:**
```bash
# 원격 better-ccflare URL과 API 키 설정
export ANTHROPIC_BASE_URL=https://your-server.com:8080
export ANTHROPIC_AUTH_TOKEN=btr-abcdef1234567890...  # better-ccflare API 키

# Claude CLI 시작 (로그인 불필요 - better-ccflare가 인증 처리)
claude
```

**동작 방식:**
- Claude Code CLI가 better-ccflare API 키로 요청 전송
- better-ccflare가 API 키를 검증하고 저장된 OAuth 자격 증명으로 요청 프록시
- OAuth 자격 증명은 신뢰할 수 있는 서버에 안전하게 보관
- 민감한 자격 증명 없이 어떤 머신에서도 Claude Code 사용 가능

### 어떤 방법을 사용해야 하나요?

- **Claude Pro/Team이 있고 로컬에서 작업?** 옵션 1(OAuth만) - 더 간단하고 API 키 불필요
- **신뢰할 수 없는/임시 머신에서 작업?** 옵션 3(원격 VPS 설정) - 자격 증명 보안 유지
- **better-ccflare에서 API 키만 사용?** 옵션 2(로그아웃 + API 키)
- **인증 충돌 경고 발생?** 두 방법이 동시에 활성화됨 - 위의 단계에 따라 하나를 선택하세요

### SSL/HTTPS 설정

better-ccflare에서 HTTPS를 활성화하려면 SSL 인증서가 필요합니다:

#### 옵션 1: 자체 서명 인증서 생성 (개발/로컬 사용)

```bash
# better-ccflare 호스트에서 자체 서명 인증서 생성
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes \
  -subj "/C=KR/ST=Seoul/L=Seoul/O=Organization/CN=yourhostname"

# SSL로 better-ccflare 시작
export SSL_KEY_PATH=/path/to/key.pem
export SSL_CERT_PATH=/path/to/cert.pem
better-ccflare

# 또는 커맨드라인 플래그 사용
better-ccflare --ssl-key /path/to/key.pem --ssl-cert /path/to/cert.pem
```

**클라이언트 머신에서 자체 서명 인증서 신뢰:**

- **Linux (Ubuntu/Debian):**
  ```bash
  sudo cp cert.pem /usr/local/share/ca-certificates/better-ccflare.crt
  sudo update-ca-certificates
  ```

- **Linux (Arch/Manjaro):**
  ```bash
  sudo cp cert.pem /etc/ca-certificates/trust-source/anchors/better-ccflare.crt
  sudo trust extract-compat
  ```

- **macOS:**
  ```bash
  sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain cert.pem
  ```

- **Windows (관리자 권한 PowerShell):**
  ```powershell
  Import-Certificate -FilePath cert.pem -CertStoreLocation Cert:\LocalMachine\Root
  ```

인증서를 시스템 신뢰 저장소에 추가한 후 환경 설정:

```bash
# ~/.bashrc 또는 ~/.zshrc에 추가
export NODE_OPTIONS="--use-system-ca"
export ANTHROPIC_BASE_URL=https://yourhostname:8080
```

`NODE_OPTIONS="--use-system-ca"`는 Claude Code 및 기타 Node.js 기반 클라이언트가 시스템 인증서 저장소를 사용하기 위해 **필수**입니다.

#### 옵션 2: 프로덕션 인증서 사용

도메인이 있는 서버에서 운영하는 경우 Let's Encrypt 또는 인증서 공급자를 사용하세요:

```bash
# Let's Encrypt 인증서 사용
export SSL_KEY_PATH=/etc/letsencrypt/live/yourdomain.com/privkey.pem
export SSL_CERT_PATH=/etc/letsencrypt/live/yourdomain.com/fullchain.pem
better-ccflare

export ANTHROPIC_BASE_URL=https://yourdomain.com:8080
```

#### 옵션 3: Traefik을 이용한 Docker (프로덕션 권장)

Docker 배포에는 Let's Encrypt로 TLS를 자동 처리하는 [Traefik](https://traefik.io/) 사용을 권장합니다:

```yaml
# docker-compose.yml
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    command:
      - "--providers.docker=true"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
      - "--certificatesresolvers.myresolver.acme.email=your-email@example.com"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt

  better-ccflare:
    image: ghcr.io/tombii/better-ccflare:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.ccflare.rule=Host(`your-domain.com`)"
      - "traefik.http.routers.ccflare.entrypoints=websecure"
      - "traefik.http.routers.ccflare.tls.certresolver=myresolver"
    volumes:
      - ~/.config/better-ccflare:/root/.config/better-ccflare
```

```bash
export ANTHROPIC_BASE_URL=https://your-domain.com
```

## Windows 문제 해결

### 문제: npm 설치 후 "명령이 잘못되었거나 찾을 수 없음" 오류

Windows에서 npm으로 설치 후 다음과 같은 오류가 발생하면:

```
The command "C:\Program Files\nodejs\\node_modules\better-ccflare\dist\better-ccflare" is either
misspelled or could not be found.
```

이는 npm이 Windows에서 래퍼 스크립트를 생성할 때 경로에 이중 백슬래시를 사용하는 **알려진 npm 버그**입니다.

### 해결 방법

**옵션 1: `npx` 사용 (권장)**
```powershell
npx better-ccflare
```

**옵션 2: 사전 컴파일 바이너리 사용**

[GitHub Releases](https://github.com/tombii/better-ccflare/releases/latest)에서 Windows 실행 파일을 다운로드하세요.

**옵션 3: npm 업데이트**
```powershell
npm install -g npm@latest
npm install -g better-ccflare
```

**옵션 4: 직접 실행**
```powershell
node "%APPDATA%\npm\node_modules\better-ccflare\dist\better-ccflare"
```

**옵션 5: Bun 패키지 매니저 사용**

Bun은 이 버그가 없으며 Windows에서 올바르게 작동합니다:
```powershell
bun install -g better-ccflare
better-ccflare
```

## 주요 기능

### 🎯 지능형 로드 밸런싱
- **세션 기반** - Claude OAuth 계정의 대화 컨텍스트 유지 (5시간 사용 윈도우), 다른 공급자는 종량제
- **자동 폴백** - 사용 윈도우가 초기화되면 높은 우선순위의 Claude OAuth 계정으로 자동 전환
- **자동 갱신** - 사용 윈도우 초기화 시 새 윈도우 자동 시작
- **사용 윈도우 정렬** - 최적의 자원 활용을 위해 Claude OAuth 사용 윈도우 초기화와 세션 자동 정렬

### 📈 실시간 분석
- 최적화된 배치 처리로 요청별 토큰 사용량 추적
- 지능형 캐싱을 통한 응답 시간 모니터링
- 레이트 리밋 감지 및 경고
- 비용 추정 및 예산 관리
- 성능 향상을 위한 요청 중복 제거
- 더 빠른 초기 로딩을 위한 지연 로딩 분석 컴포넌트
- 계정, 모델, API 키, 요청 상태별 고급 필터링
- API 키 성능 추적 및 상세 분석

### 🛠️ 개발자 도구
- 강력한 CLI (`better-ccflare`)
- 웹 대시보드 (`http://localhost:8080/dashboard`)
- 계정 관리용 CLI
- 자동화를 위한 REST API

### 🔒 프로덕션 준비
- 계정 간 자동 장애 조치
- OAuth 토큰 갱신 처리
- 지속성을 위한 SQLite 데이터베이스
- 설정 가능한 재시도 로직
- 엔터프라이즈 배포를 위한 커스텀 엔드포인트 지원
- 요청 배치 및 캐싱으로 향상된 성능

### ☁️ 다중 공급자 지원
- **Claude OAuth** - 5시간 사용 윈도우와 세션 추적을 갖춘 Anthropic OAuth 계정
- **Claude Console API** - 종량제 모델의 Anthropic API 키 계정 (세션 추적 없음)
- **AWS Bedrock** - SigV4 인증, 추론 프로파일 지원(지리적/글로벌/지역적), AWS CLI 프로파일을 통한 자동 자격 증명 체인 해결
- **Vertex AI** - 서비스 계정 인증을 통한 Google Cloud Vertex AI 통합
- **z.ai, Minimax** - 종량제 모델의 API 키 기반 공급자
- **OpenRouter** - 네이티브 API 지원 및 모델 매핑을 통한 OpenRouter 통합
- **Kilo** - 사용량 추적을 포함한 Kilo API 통합
- **Anthropic 호환** - 종량제 모델의 커스텀 Anthropic 호환 공급자
- **OpenAI 호환** - Claude API 형식의 OpenAI 호환 공급자 (Together AI 등)
- **범용 API 형식** - Claude API 형식으로 OpenAI 호환 공급자 사용
- **자동 형식 변환** - Anthropic과 OpenAI 요청/응답 형식 간 원활한 변환
- **스트리밍 지원** - OpenAI 호환 공급자의 스트리밍 응답 완전 지원

## 데이터베이스 문제 해결

"All accounts failed" 오류가 발생하면 데이터베이스가 시작 시 자동으로 무결성 검사를 실행하고 필요한 경우 복구를 안내합니다. 수동으로 실행할 수도 있습니다:

```bash
bun run cli --repair-db
```

이 명령은 무결성 검사, NULL 값 수정, 제약 조건 검증, 데이터베이스 최적화를 수행합니다. 자세한 내용은 [문제 해결 가이드](docs/troubleshooting.md#database-corruption-or-integrity-errors)를 참고하세요.

## 문서

전체 문서는 [`docs/`](docs/) 디렉토리에 있습니다:
- [시작하기](docs/index.md)
- [CLI 명령어](docs/cli.md)
- [문제 해결](docs/troubleshooting.md)
- [아키텍처](docs/architecture.md)
- [API 레퍼런스](docs/api-http.md)
- [설정](docs/configuration.md)
- [로드 밸런싱 전략](docs/load-balancing.md)
- [자동 폴백 가이드](docs/auto-fallback.md)
- [자동 갱신 가이드](docs/auto-refresh.md)
- [OpenAI 호환 공급자](docs/providers.md)

## 스크린샷

<table>
  <tr>
    <td><img src="apps/lander/src/screenshot-dashboard.png" alt="대시보드"/></td>
    <td><img src="apps/lander/src/screenshot-logs.png" alt="로그"/></td>
  </tr>
  <tr>
    <td align="center"><b>실시간 대시보드</b></td>
    <td align="center"><b>요청 로그</b></td>
  </tr>
  <tr>
    <td colspan="2"><img src="apps/lander/src/screenshot-analytics.png" alt="분석"/></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><b>분석 및 사용량 추적</b></td>
  </tr>
</table>

## 요구사항

**설치용:**
- **npm** 또는 **bun** 패키지 매니저 (npm/bun 설치 시)
- **Node.js** >= 18.0.0 (npm으로 설치 시)
- **Bun** >= 1.2.8 (bun으로 설치하거나 소스에서 실행 시)
- **또는 사전 컴파일 바이너리 다운로드** - 런타임 의존성 불필요!

**사용용:**
- Claude API 계정 (Free, Pro, Team), z.ai 코드 플랜 계정, 또는 Minimax 계정

## 플랫폼 지원

| 플랫폼 | 아키텍처 | 상태 |
|--------|----------|------|
| Linux | x86_64 | ✅ 지원 (npm + 바이너리) |
| Linux | ARM64 (aarch64) | ✅ 지원 (바이너리 전용) |
| macOS | Intel (x64) | ✅ 지원 (npm + 바이너리) |
| macOS | Apple Silicon (ARM64) | ✅ 지원 (바이너리 전용) |
| Windows | x86_64 | ✅ 지원 (바이너리 전용) |

**지원되는 환경:**
- Oracle Cloud ARM 인스턴스 (Ampere Altra)
- AWS Graviton 인스턴스
- Raspberry Pi 3/4/5 (64비트 OS)
- x86_64 또는 ARM64 Linux/macOS/Windows 시스템

**지원되지 않는 환경:**
- ARM32 기기 (Raspberry Pi Zero, Pi 1, Pi 2, 또는 32비트 OS)

## 감사의 말

원래 아이디어와 구현에 감사드립니다: [snipeship/ccflare](https://github.com/snipeship/ccflare)

**기여자 여러분께 특별히 감사드립니다:**
- [@bitcoin4cashqc](https://github.com/bitcoin4cashqc) - 종합 문서와 함께 SSL/HTTPS 지원 구현
- [@anonym-uz](https://github.com/anonym-uz) - 중요한 자동 일시정지 버그 수정, 분석 성능 최적화, 요청 본문 truncation, 점진적 vacuum 구현
- [@makhweeb](https://github.com/makhweeb) - 향상된 요청 처리 및 분석 개선
- [@jw409](https://github.com/jw409) - WSL2 및 컴파일 바이너리에서 OAuth 계정 추가 수정 (신뢰할 수 없는 prompt()를 readline으로 교체)
- [@materemias](https://github.com/materemias) - Vertex AI 공급자 구현 테스트 및 검증, OAuth API 키 인증 디버깅, AWS Bedrock 지원 요청 및 검증
- [@tqtensor](https://github.com/tqtensor) - 스마트 청크 캡핑, 메모리 모니터링, 최적화된 정리를 통한 OOM 킬 방지 메모리 누수 수정
- [@lunetics](https://github.com/lunetics) - API, CLI, 대시보드를 통한 강제 레이트 리밋 초기화 기능, OOM 킬 방지를 위한 주기적 데이터 보존 정리, 모델 레지스트리 동기화

## 기여

기여를 환영합니다! 가이드라인은 [CONTRIBUTING.md](docs/contributing.md)를 참고하세요.

### 코드 리뷰 프로세스

이 저장소에는 자동화된 Claude 코드 리뷰 시스템이 포함되어 있습니다:
- **자동 리뷰**: 새 풀 리퀘스트가 열리면 자동으로 실행
- **수동 리뷰**: PR에 `/claude-review` 댓글을 달면 기여자가 수동으로 트리거 가능

## 라이선스

MIT - 자세한 내용은 [LICENSE](LICENSE)를 참고하세요

---

<p align="center">
  개발자를 위해 ❤️로 만들어졌습니다
</p>
