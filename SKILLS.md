# 모던 기술 스택 마이그레이션 플랜

## 현재 상태

- **빌드 도구**: Create React App (CRA) with react-scripts 5.0.1
- **언어**: JavaScript
- **패키지 매니저**: npm
- **React**: 19.1.0
- **HTTP 클라이언트**: axios (1개 파일), fetch (나머지)
- **스타일링**: CSS 파일 (9개) + Material-UI

---

## 마이그레이션 항목

### 1. CRA → Vite

**이유**:
- CRA 유지보수 중단 (2023년 이후)
- 개발 서버 시작: 30초 → 2초 (ESBuild)
- HMR: 2-3초 → 300ms
- 더 작은 번들 크기 (Rolldown)

### 2. JavaScript → TypeScript

**이유**:
- 현업에서 필수 ..
- 타입 안정성으로 런타임 에러 방지
- 강력한 자동완성 및 리팩토링
- 자체 문서화 효과
- yarn v4도 고려 대상이지만, 제대로 쓰려면 학습 비용이 들어서 pnpm 추천
- 해당 기능은 package.json packageManager 필드를 활용하고 corepack을 활용해서 프로젝트를 사용하는 모든 사람과 버전을 맞춥니다.


### 3. npm → pnpm

**이유**:
- 50-70% 디스크 공간 절약
- 2배 빠른 설치 속도
- 유령 의존성 방지
- npm 완벽 호환

### 4. axios → fetch

**이유**:
- 요즘엔 axios가 헤비하다고 생각해 내장 fetch를 사용하는 편입니다. 추가 번들도 없고 사용할 때 무리가 없습니다.
- axios는 1개 파일에서만 사용
- ~500KB 번들 크기 감소
- 네이티브 Web API 사용
- 프로젝트 전체 일관성

**대상**: `src/hooks/useFileExplorer.js`

### 5. export default → named export

**이유**:
- **트리쉐이킹 최적화**: default export는 번들러가 사용하지 않는 코드 제거 어려움
- **IDE 지원 향상**: Command/Ctrl + . 으로 import 자동 완성 정확도 증가
- **리팩토링 안전성**: 이름 변경 시 모든 참조 자동 업데이트
- **명시적 import**: 어떤 모듈을 가져오는지 명확하게 표시

```js
// Before
export default useFileExplorer;
import useFileExplorer from './useFileExplorer';

// After
export { useFileExplorer };
import { useFileExplorer } from './useFileExplorer';
```

### 6. CSS 현대화

현재 일반 .css로 작성이 됐는데, .css의 문제점은 프로젝트 규모가 커지면 커질 수록 유지보수가 안된 .css가 엄청 많아집니다. 그게 그대로 로드 되면 웹 어플리케이션 성능에 병목이 생깁니다.

그래서 현재는 zero-runtime 기법을 써서, 정적 분석으로 컴파일 단계에서만 CSS를 뽑아서 정말 사용하는 CSS만 남기는 기법이 많이 사용되고 있습니다. 그 중 아래의 리스트 중 하나를 선택하면 좋습니다. 

**옵션 1: Tailwind CSS**
- 유틸리티 우선 접근법
- 최소 번들 크기 (PurgeCSS 자동)
- 빠른 개발 속도
- 풍부한 생태계 및 플러그인
- MUI와 병행 사용 가능

**옵션 2: Vanilla Extract**
- TypeScript 기반 Zero-runtime CSS-in-TS
- 빌드 타임 CSS 생성 (런타임 오버헤드 없음)
- 완벽한 타입 안정성
- CSS Modules처럼 스코프 자동화
- Vite 플러그인 지원

**옵션 3: StyleX (Meta)**
- Meta에서 개발한 최신 CSS-in-JS
- 원자적 CSS 생성으로 최소 번들
- 컴파일 타임 최적화
- TypeScript 지원
- 동적 스타일링 강력

### 7. Biome (ESLint + Prettier 대체)

해당 프로젝트는 Prettier (코드 포맷팅) + ESLint (코드 컨벤션)의 설정이 부재합니다.
이런 것만 잘 설정해도 리액트의 제대로 된 규칙을 따를 수 있습니다. 다만 위 스택은 현재는 Biome이라는 속도가 빠른 러스트 툴 체인으로 옮겨지는 추세입니다.

**이유**:
- 단일 도구로 린팅 + 포맷팅 통합
- ESLint + Prettier 대비 **25배 빠른 속도**
- Rust 기반 고성능
- Zero config (기본 설정만으로 사용 가능)
- TypeScript 네이티브 지원
- ESLint/Prettier 마이그레이션 명령어 제공

---

## 예상 효과

**성능**:
- 개발 서버: 30초 → 2초 (93% ↓)
- HMR: 2-3초 → 300ms (90% ↓)
- 빌드 시간: 30-40% ↓
- 번들 크기: axios 제거 ~500KB + Vite 최적화 10-20% ↓

**개발 경험**:
- 타입 안정성 및 자동완성
- CSS 스코핑으로 충돌 방지
- 일관된 코드 스타일

**유지보수성**:
- 안전한 리팩토링
- HTTP 클라이언트 일관성
- 모듈화된 CSS 관리
