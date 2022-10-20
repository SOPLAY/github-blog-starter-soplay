# [Github-blog-starter-soplay](https://soplay.github.io/github-blog-starter-soplay) (❗️개발 진행중)

github-blog-starter-soplay 는 Nextjs + contentlayer 기반의 블로그 입니다.
mdx, md 기반의 블로그로 [prism.js](https://prismjs.com/#supported-languages)에 등록된 프로그래밍 언어의 코드 하이라이팅을 지원합니다.

## 기능

- md,mdx
- 코드 하이라이팅
- 태그, 시리즈
- SEO
- Utterance (댓글)
- sitemap (검색엔진 등록을 위한 sitemap 자동 생성)

## 블로그 시작하기

> 본 블로그는 기본적으로 git pages를 이용하여 배포합니다.

### 1. 프로젝트 포크, 및 클론

먼저 프로젝트를 본인의 레포에 포크합니다.
( 포크시 지정하는 레포명은 blog를 추천합니다 -> userNick.github.io/blog 의 형태의 주소가 됩니다.)

로컬 환경에 프로젝트를 클론합니다.

> node.js 와 yarn, git-cli가 설치되어 있어야 합니다.

클론한 폴더에서 다음 명령을 실행하여 의존성 패키지를 설치합니다.

```shell
yarn
```

### 2. blog.config.js 작성

```javascript
module.exports = {
  title: 'soplay의 블로그 스타터 킷', //블로그 이름
  author: 'SOPLAY', //블로그 저자
  description: 'soplay의 블로스 스타터 키트', //블로그 설명
  url: 'https://soplay.github.io/github-blog-starter-soplay/', //블로그 주소 ( git pages를 이용하는 경우에는 https://본인깃허브닉네임.github.io/클론한레포명/ 이 됩니다.)
  utterancRepoUrl: 'soplay/comments', //댓글 서비스 이슈 레포 설정 ( 따로 생성 안하고 클론한 레포로 지정해도 됩니다.)
  links: {
    //사용자 주소 추가
    github: 'https://github.com/soplay/',
    linkedin: '',
    notion: '',
    kakao: '',
    discord: '',
    instagram: '',
  },
};
```

blog.config.js파일을 본인의 설정에 맞게끔 수정하시면 됩니다.

### 3. 개발 서버 시작

```shell
yarn dev
```

### 5.포스트 추가

> 블로그의 url은 포스트의 title을 기반으로 생성됩니다.  
> ex) {url}/posts/{post.title}

md,mdx 포스트는 `posts/` 경로에 작성합니다.

각 포스트의 타이틀, 날자, 태그, 시리즈 등의 기본 작성 유무는 다음과 같습니다.

> image를 지정하지 않으면 이미지가 없는 포스트 카드가 생성됩니다.
> description을 적어두지 않으면 블로그의 내용중 앞부분을 slice하여 자동생성 됩니다. (50자 내외)

|   속성명    | 필요유무 |         예시         |
| :---------: | :------: | :------------------: |
|    title    |    O     |   블로그 시작하기    |
|    date     |    O     |      2022-08-31      |
| description |    X     | 블로그 시작하는 방법 |
|    image    |    X     |     ./images.png     |
|    tags     |    O     |   - blog -gitPages   |
|   serise    |    X     |    블로그 사용법     |

위 내용을 기반으로 포스트 파일(.md|.mdx) 작성법은 다음과 같습니다.

```markdown
---
title: 블로그 시작하기
date: 2022-08-31
description: 블로그 시작하는 방법
image: ./images.png
tags:
  - blog
  - gitPages
serise: 블로그 사용법
---

# 제목

## 소제목

내용
```

### 6.Git-Pages 배포하기
