# 🌟 PaLMath: Personal Adaptive Learning Mathematics

개인 맞춤형 인공지능 수학 학습 플랫폼 **PaLMath**입니다.  
본 프로젝트는 초·중·고 수학 교육과정 매핑, 마스코트 "라고"와 함께하는 인터랙티브 슬라이드 개념 학습, 스페이스드 리피티션(망각 방지) 복습 시스템, 시험지 자동 출제 및 OMR 채점 연동 등의 프리미엄 기능을 제공합니다.

---

## 💻 1. 로컬 환경에서 실행하는 방법
로컬 컴퓨터에서 개발 서버를 실행하려면 Python이 설치되어 있어야 합니다.

1. 터미널(Command Prompt 또는 PowerShell)을 열고 프로젝트 폴더(`C:\Users\user\Downloads\palmath`)로 이동합니다.
2. 아래 명령어를 실행하여 로컬 서버를 구동합니다:
   ```bash
   python server.py
   ```
3. 서버가 실행되면 웹 브라우저를 열고 `http://localhost:8000`으로 접속합니다.

---

## 🚀 2. Vercel & GitHub 배포 방법 (로컬에 Git이 설치되어 있지 않은 경우)
컴퓨터에 Git 프로그램이 설치되어 있지 않아도, GitHub 웹사이트와 Vercel을 활용하여 무료로 고성능 클라우드 배포를 진행할 수 있습니다.

### 1단계: GitHub에 코드 올리기 (웹 드래그 앤 드롭)
1. **GitHub 로그인**: [GitHub 공식 홈페이지](https://github.com/)에 접속하여 회원가입 또는 로그인합니다.
2. **새 리포지토리 생성**: 우측 상단의 `+` 버튼을 누르고 **`New repository`**를 선택합니다.
   - **Repository name**에 `palmath`를 입력합니다.
   - 옵션은 기본값(Public 또는 Private)으로 둔 채 최하단의 **`Create repository`**를 클릭합니다.
3. **웹 업로드 화면 진입**: 리포지토리가 생성되면 나타나는 안내 화면에서 **`uploading an existing file`** 링크를 클릭합니다.
4. **드래그 앤 드롭 업로드**: 내 컴퓨터의 `C:\Users\user\Downloads\palmath` 폴더 내에 있는 다음 파일 및 폴더들을 웹 브라우저의 업로드 영역으로 드래그하여 놓습니다.
   - **폴더**: `public`, `api`
   - **파일**: `server.py`, `vercel.json`, `.gitignore`, `README.md`
   *(주의: 폴더 통째로 드래그해야 내부 파일 구조가 유지됩니다.)*
5. **업로드 완료**: 파일 목록이 모두 로드되면 하단의 녹색 **`Commit changes`** 버튼을 클릭하여 업로드를 완료합니다.

### 2단계: Vercel에 연동 및 배포하기
1. **Vercel 로그인**: [Vercel 공식 홈페이지](https://vercel.com/)에 접속하여 **`Continue with GitHub`**를 선택해 로그인합니다.
2. **프로젝트 가져오기**: 대시보드 우측 상단의 **`Add New`** ➔ **`Project`**를 클릭합니다.
3. **리포지토리 임포트**: 방금 생성하여 코드를 올린 `palmath` 리포지토리 오른쪽에 있는 **`Import`** 버튼을 클릭합니다.
4. **배포 시작 (자동 설정)**:
   - 본 프로젝트에는 `vercel.json` 설정이 들어있어 빌드 명령어(Build Command)나 프레임워크 설정을 건드릴 필요가 없습니다.
   - 하단의 **`Deploy`** 버튼을 클릭하면 수초 이내에 배포가 완료되며, 세상에 하나뿐인 고유한 `https://...vercel.app` 무료 도메인 주소가 발급됩니다!
