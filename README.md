# [Github-blog-starter-soplay](https://soplay.github.io/github-blog-starter-soplay)

## 설명

`Github-blog-starter-soplay` 는 Nextjs + contentlayer 기반의 블로그 입니다.
mdx, md 기반의 블로그로 [prism.js](https://prismjs.com/#supported-languages)에 등록된 프로그래밍 언어의 코드 하이라이팅을 지원합니다.

## 기능

- md,mdx
- 코드 하이라이팅
- 태그, 시리즈
- SEO
- Utterance (댓글)
- sitemap (검색엔진 등록을 위한 sitemap 자동 생성)
- 최적화를 통한 빠른 반응 속도
- git-action을 통한 이미지 압축 및 빌드, 배포

> 로컬을 통해 lighthouse test를 했을때 결과입니다.  
> Next.js의 imageblur효과를 적용했더니 Largest Contentful Paint 시간이 layzloading되는 시간 만큼 늘어났지만 로딩 속도는 빠릅니다.
> ![lighthousImageScore](https://user-images.githubusercontent.com/40691745/197182140-88eba5d8-3b63-4af9-9be3-9afaf0c1b5f2.png)  
> 자동 생성되는 sitemap의 주소는 다음과 같습니다.
>
> ```
> {본인의 블로그 주소}/sitemap.xml
> ```

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

---

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

---

### 3. 개발 서버 시작

```shell
yarn dev
```

---

### 4. 포스트 추가

> 블로그의 url은 포스트의 title을 기반으로 생성됩니다.
>
> ```
> ex) {url}/posts/{post.title}
> ```

md,mdx 포스트는 `posts/` 경로에 작성합니다.

각 포스트의 타이틀, 날자, 태그, 시리즈 등의 기본 작성 유무는 다음과 같습니다.

> image를 지정하지 않으면 이미지가 없는 포스트 카드가 생성됩니다.
> description을 적어두지 않으면 블로그의 내용중 앞부분을 slice하여 자동생성 됩니다. (50자 내외)

|   속성명    | 필수유무 |         예시         |
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

#### ✅ 글의 내용중 추가하는 이미지는 Next.js의 최적화된 이미지 사용을 위해 다음과 같이 사용해주세요

> 이미지 태그 사용중 원격 주소에서 이미지를 가져오는 경우에는 blog.config.js 파일에서 remoteImageDomains 배열에 도메인을 추가해주셔야 합니다. ( 비추천 )

| 속성명 | 필수유무 |     타입     |    예시     | 비고                                                             |
| :----: | :------: | :----------: | :---------: | ---------------------------------------------------------------- |
|  src   |    O     |    string    | ./image.png |
|  alt   |    X     |    string    | 이미지 설명 |
|  size  |    X     | "sm" or "md" |     md      | sm(width:480, height:240), md(width:720, height:360)이 적용된다. |
| width  |    X     |    string    |     300     | size옵션 적용시 필요없음                                         |
| height |    X     |    string    |     170     | size옵션 적용시 필요없음                                         |

> size="sm"이 기본 옵션입니다.
> size or width,height 둘중 한가지만 적용하면 됩니다.

```markdown
<!-- size옵션 생략 -->
<!-- (이경우에는 width:480, height:240이 기본으로 적용된다.) -->
<Image src='./ffavicon.png' alt='imageTest' />

<!-- size옵션 "md"지정 -->
<!-- (이 경우에는 width:720, height:360이 기본으로 적용된다.) -->
<Image src='./ffavicon.png' alt='imageTest' size="md"/>

<!-- width, height 지정 -->
<Image src='./ffavicon.png' alt='imageTest' width="150" height="300"/>
```

### 5. Git-Pages 배포하기

> Git-Pages 배포는 git-action을 통해 자동 배포 스크립트가 작성되어 있습니다.
>
> 따로 해야 하는 설정은 git-pages 설정에서 Source 를 `GitHub Actions`로 설정해 주면 됩니다.

![스크린샷 2022-10-22 오후 9 53 51](https://user-images.githubusercontent.com/40691745/197340297-e35a5296-c5af-46da-bbfa-e68f155ae4b6.png)

---

### 마치며

사용하시면서 문제가 발견되면 이슈를 남겨주시면 감사합니다.
