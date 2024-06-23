# Detail
## article과 category의 CRUD 제작 (mongoDB)

<details>
  <summary>자세히 보기</summary>

  - article의 CRUD
  
    ![](https://velog.velcdn.com/images/katej927/post/c357997a-b313-450a-a8be-a0207ca92baf/image.gif)
    
    - 방법

  	  1. MongoDB 설정 ([코드 링크](https://github.com/katej927/kate-devlog/blob/main/src/libs/mongodb.ts))
         
         - MongoDB와의 연결
  
           `mongoose` 라이브러리 활용
    
         - MongoDB URI

           환경 변수로 관리되며, 이를 통해 데이터베이스에 연결함
       2. 스키마 정의 ([코드 링크](https://github.com/katej927/kate-devlog/blob/main/src/models/article.ts))

          `articleSchema`는 `title`, `content`, `category` 필드를 가지며, `content`는 `ArticleContent` 모델을, `category`는 `Category` 모델을 참조함. `timestamps` 옵션을 통해 자동으로 `createdAt`과 `updatedAt` 필드를 추가함.
       3. CRUD 구현 ([코드 링크](https://github.com/katej927/kate-devlog/tree/main/src/app/api/articles))

          - **Create**: 새 article 생성 시, `Article.create()` 사용
  
          - **Read**: article을 조회 시, `Article.find()` 또는 `Article.findOne()` 사용
          - **Update**: article 수정 시, `Article.findByIdAndUpdate()` 사용
          - **Delete**: article 삭제 시, `Article.findByIdAndDelete()` 사용
  
    - 코드 [자세히 보기 →](https://github.com/katej927/kate-devlog/tree/main/src/app/api/articles)
      
       ```tsx
       
      (... 생략)

      // GET 만 발췌
      export const GET = async (request: NextRequest) => {
        const searchTerm = request.nextUrl.searchParams.get('searchTerm')

        await connectMongoDB()

        const searchCondition = {
          $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { 'content.text': { $regex: searchTerm, $options: 'i' } },
          ],
        }

        const articles = searchTerm
          ? await Article.aggregate([
              {
                $lookup: {
                  from: 'articlecontents',
                  localField: 'content',
                  foreignField: '_id',
                  as: 'content',
                },
              },
              {
                $unwind: {
                  path: '$content',
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $match: searchCondition,
              },
              {
                $project: {
                  _id: 1,
                  title: 1,
                  content: { _id: 1 },
                  createdAt: 1,
                  updatedAt: 1,
                },
              },
              {
                $sort: { createdAt: -1 },
              },
            ])
          : await Article.find().sort({ createdAt: -1 })

        return NextResponse.json({ articles }, { status: 200 })
      }

      (... 생략)
      ```
      
- category의 CRUD
  
  ![](https://velog.velcdn.com/images/katej927/post/addcc05c-1049-46ab-988a-f0b2f4a505e5/image.gif)
  - 방법
    1. MongoDB 설정 ([코드 링크](https://github.com/katej927/kate-devlog/blob/main/src/libs/mongodb.ts))
        - MongoDB와의 연결
  
            - `mongoose` 라이브러리 활용
        - MongoDB URI
            - 환경 변수로 관리되며, 이를 통해 데이터베이스에 연결함
    2. 스키마 정의 ([코드 링크](https://github.com/katej927/kate-devlog/blob/main/src/models/category.ts))
        
        `categorySchema`는 `categoryName`과 `articles` 필드를 가지며, `articles`는 `Article` 모델을 참조함.
        
        - 참고 ([코드 링크](https://github.com/katej927/kate-devlog/blob/main/src/models/article.ts))

            article CRUD 시, category도 함께 업데이트됨. `articleSchema`는 `category` 필드를 참조함.
            
    3. CRUD 구현 ([코드 링크](https://github.com/katej927/kate-devlog/tree/main/src/app/api/categories))
        - **Create**: 새 category 생성 시, `Category.create()` 사용
  
        - **Read**: category를 조회 시, `Category.find()` , `findOne()`, `aggregate`를 사용
        - **Update**: category 수정 시, `Category.findOneAndUpdate()`를 사용
        - **Delete**: category 삭제 시, `Category.deleteOne()`를 사용합니다.
  - 코드 [자세히 보기 →](https://github.com/katej927/kate-devlog/tree/main/src/app/api/categories)
    
       ```tsx
       (...생략)

       // GET만 발췌
      export const GET = async (request: NextRequest) => {
        const articlesType = request.nextUrl.searchParams.get('articlesType')

        try {
          await connectMongoDB()

          let categories
          switch (articlesType) {
            case 'omit':
              categories = await Category.find({}, '-articles')
              break
            case 'count':
              categories = await Category.aggregate([
                {
                  $lookup: {
                    from: 'articles',
                    localField: 'articles',
                    foreignField: '_id',
                    as: 'articlesData',
                  },
                },
                {
                  $addFields: {
                    articleCount: { $size: '$articlesData' },
                    latestArticleTimestamp: { $max: '$articlesData.createdAt' },
                  },
                },
                {
                  $project: {
                    articlesData: 0,
                    articles: 0,
                  },
                },
              ])
              break
            default:
              throw new Error('Invalid articlesType')
          }

          return NextResponse.json(categories)
        } catch (error) {
          console.error('Error fetching categories: ', error)
          return NextResponse.json(
            { error: 'Failed to fetch categories.' },
            { status: 500 },
          )
        }
      }

       ```


- 트러블 슈팅 [다른 기록도 보기 →](https://velog.io/@katej927/Trouble-shooting-kate-devlog-article%EA%B3%BC-category%EC%9D%98-CRUD-%EC%A0%9C%EC%9E%91-%EA%B4%80%EB%A0%A8)
    
   **[ server/client component와 use hook ]**
    
   - [`src/app/editArticle/[id]/page.tsx`](https://github.com/f-lab-edu/dev-blog/pull/6/files#diff-6fa6b0eef3f04c54ed52c02dbc90275542dcecf68c81f635ae504b6421f0adaa)

   server와 client component를 처음 사용하게 되면서 사용할 수 있는 기능에 제약이 있는 것을 잘 알지 못했다.
    백엔드에서 데이터를 가져오는 로직을 위해 async/await도 써야 하고 (server component 기능) router를 사용하고 함수도 내려줘야 하는데 (client component 기능) 모두 사용하려니 계속 에러가 나서 헤맸고 매우 답답했다.

   전 회사에서라면 10분내로 답 안 나오면 바로 질문하라고 해서 사수님의 도움을 받으며 해결했을테지만 멘토링에서는 멘토님이 끝까지 찾길 추천하셨고 아니면 따끔하게 지적받기에 계속 찾아봤다.
    꽤 오랜 시간이 걸렸고 포기하고 멘토님께 그냥 질문드려 해결하고 싶은 순간들도 있었으나, 돌아올 답이 무엇인지 알 것도 같고 그냥 한 번 찾아보았다. 개발자가 스스로 찾는 것도 중요하기 때문이다. (회사에서는 시간 관계 상의 이유로 빠르게 질문하는 것을 권유한 것으로 안다.)
    아마도 에러메세지를 쳤고 원어를 해석해내는 고통을 견디면서 stackoverflow에서 우연히 use를 사용하면 해결 가능하다는 것을 봤고 그것이 내가 알지 못한 hook이며 근래에 추가 되었다는 것을 알게 되었다.
    그래서 use hook에 대해 공식문서와 블로그에서 어떤 기능을 하는 hook인지 찾아보았고 내가 원하던 기능을 하는 알맞은 function임을 알았다.
    
   뿌듯했고 성취감을 느꼈다. 얼마 전, preview 구현하면서도 이번에도 (비록 오랜 시간이 걸렸지만) 스스로 해결해냈다.
    
   **단순히 끝날 줄 알았던 update와 delete였는데 새로이 업데이트된 기능으로 구현하는데 차질이 많았고 스스로 해결하려다 보니 오랜 시간이 걸렸으나 뿌듯했다.얻은 점은 조금씩, 스스로 문제 해결하는 방법을 찾는 것 같다는 점이다. 에러 로그를 이해하고 부족하면 에러 로그를 검색하고 (원어라 고통스럽지만) issue탭이나 stackoverflow에서 나와 비슷한 문제를 겪는 이들이 있는 것을 확인하고 그들이 어떻게 해결해내고 있는지 알 수 있다.앞으로도 이런 방식을 조금 더 빨리 실행해서 스스로 해결할 때 속도를 높이는 것이 좋을 것 같다.**
</details>

## WYSIWYG 에디터 추가 


<details>
  <summary>자세히 보기</summary>

![](https://velog.velcdn.com/images/katej927/post/c8464648-6ce7-4646-9a9c-c01b77e512d4/image.gif)

- 방법

  - 화면 UI (write/edit 페이지)

  	```
  	  ┌----------------------------------------------------------------┐
  	  |                                                                |
  	  | Title                                                          |
  	  | ┌-------- Editor --------┐ ┌------------- Preview ------------┐|
  	  | |                        | |                                  ||
  	  | |                        | |                                  ||
  	  | |                        | |                                  ||
  	  | |                        | |                                  ||
  	  | |                        | |                                  ||
  	  | |                        | |                                  ||
  	  | |                        | |                                  ||
  	  | |                        | |                                  ||
  	  | └------------------------┘ └----------------------------------┘|
  	  └----------------------------------------------------------------┘
  	```

  - article에 대한 interface 구조
  
    ```tsx
      interface ArticleInterface {
        title: string
        content: { text: string; html: string }
      }
    ```
    - 이유
  
      - text는 보다 빠른 검색을 하게 하고, 글 목록에서 글 내용의 일부를 보여주기 위해
  
      - html은 글 내용 렌더링을 위해
  - firebase 활용
    - 사용 이유 : 이미지 url을 만들어주도록 하기 위함.

- 코드 [자세히 보기 →](https://github.com/katej927/kate-devlog/tree/main/src/components/ArticleForm/Editor)
    
    ```tsx
    'use client'
    
    import { useMemo, useRef } from 'react'
    import ReactQuill from 'react-quill'
    import 'react-quill/dist/quill.snow.css'
    
    import { ArticleContentInterface } from '@/apis/articles'
    
    import { FORMATS, convertModules } from './_shared'
    import { HandleChangeNewContentType } from '../_shared'
    
    interface Props {
      contentHtml: ArticleContentInterface['html']
      onChangeContent: (content: HandleChangeNewContentType) => void
    }
    
    const Editor = ({ contentHtml, onChangeContent }: Props) => {
      const quillRef = useRef<ReactQuill>()
    
      const modules = useMemo(() => convertModules(quillRef), [])
    
      return (
        <ReactQuill
          theme="snow"
          style={{
            height: '550px',
            display: 'inline-block',
          }}
          onChange={(value, delta, source, editor) =>
            onChangeContent({
              text: editor.getText(),
              html: editor.getHTML(),
            })
          }
          modules={modules}
          formats={FORMATS}
          ref={(element) => {
            if (element !== null) {
              quillRef.current = element
            }
          }}
          placeholder="내용을 입력해주세요."
          value={contentHtml}
        />
      )
    }
    
    export default Editor
    ```

- 트러블 슈팅 [다른 기록도 보기 →](https://velog.io/@katej927/Trouble-shooting-kate-devlog-2-WYSIWYG-%EC%97%90%EB%94%94%ED%84%B0)
    
    **[ issue 탭의 힘 ]**
    
    에디터의 데이터를 어떻게 저장해야 할지 걱정이었다.
    
    에디터의 값을 받아보니 왠걸 태그까지 같이 저장해주고 있었다.
    
    이걸로 어떻게 검색 기능을 넣지?라는 생각이 들었고 챗 지피티와 구글링을 열심히 했다.
    
    챗 지피티에서는 (비록 좀 부실해보이지만) 해결방법은 있다는 것에 안도감을 느꼈고, 그로 인해 차분히 서칭할 수 있었다.
    
    서칭하면서 구글링 해서 나온 issue 탭에 나와 비슷한 고민을 가진 사람들이 이미 적어둔 해결책을 보고 이 react-quill이라는 에디터의 데이터를 저장하기 위해서는 에디터에서 만들어둔 방법이 따로 없다는 것을 알았다. (이걸로 라이브러리 쓰다 바꾸는 유저들도 있더라) 하지만 에디터의 내장된 메서드인 delta라는 객체와 태그로된 문자열을 함께 저장하기를 추천했다. delta for editor, html for rendering이 최선의 아이디어 였다.
    
    나는 이에 더해 나의 아이디어를 덧붙였다. 저렇게 저장하기에는 검색할 때 성능이 더딜 것 같다는 생각이 들었고 계속 시도해보니 에디터가 꼭 delta로만 렌더링 되지 않고 html 문자열로도 렌더링 되는 것을 알 수 있었다. 직접 넣어봐서 알 수 있었다. 덕분에 조금이라도 성능을 개선하기 위해 나는 글을 그대로 저장하는 문자열(\n이 들어가긴 한다)과 렌더링을 위한 html 문자열을 저장해두기로 했다.
    
    이렇게 하기까지 많은 시간과 용기와 인내가 필요했다. 여기까지 하고도 나는 db에 잘 연결할 수 있을지 걱정했는데 생각보다 간단히 수정되어서 좋았다.
    
    매번 걱정하는데 실제로 발을 넣어보면 그렇게 무서운 건 아닌 것 같다.
    
    **그냥 찾아보고 해보는 게 좋을 것 같다. 너무 두려워 하지말자.**
    
    **그리고 앞으로도 issue탭을 먼저 활용하면 더 빨리 해결할 수 있을 것 같다. (챗 지피티는 간단한/직관적인 문제 해결 정도에 도움 되는 듯)**

</details>


## 성능 최적화 (article의 제목과 내용의 schema 분리) 

<details>
  <summary>자세히 보기</summary>

> network의 time 5배 개선
> 

| action | image |
| --- | --- |
| 분리 전 | <img src='https://github.com/katej927/dev-blog-forked/assets/69146527/0731cbb8-79c8-4ceb-b4e4-964a6160e2d5' height='200'/> |
| 분리 후 | <img src='https://github.com/katej927/dev-blog-forked/assets/69146527/bb1d8e52-df59-4e37-b627-b0c4d1f5d9b9' height='200'/> |


- 방법 [관련 PR 보기 →](https://github.com/katej927/kate-devlog/pull/6)

   - mongoDB의 collection이 articles와 articleContents로 분리됨.
        
     > ✓ articles ⇒ article의 개요를 담음
     
     >   ✓ articleContents ⇒ article의 본문을 담음
      

     - 본문이 필요할 때, articleContents를 가져옴
  
       방법: ```find().populate()```
  
  - Schema 분리
    - ```articleContentSchema```, ```articleSchema```
  
    - 두 스키마간 relation 설정
      - 방법 : id로 연결
        ```tsx
        content: {
          type: Schema.Types.ObjectId,
          ref: 'ArticleContent',
          required: true,
        }
        ```
  
- 코드 [자세히 보기 →](https://github.com/katej927/kate-devlog/blob/main/src/models/article.ts)
    
    ```tsx
    import mongoose, { Schema } from 'mongoose'
    
    const articleContentSchema = new Schema({
      text: {
        type: String,
        required: true,
      },
      html: {
        type: String,
        required: true,
      },
    })
    
    const articleSchema = new Schema(
      {
        title: { type: String, required: true },
        content: {
          type: Schema.Types.ObjectId,
          ref: 'ArticleContent',
          required: true,
        },
        category: {
          type: Schema.Types.ObjectId,
          ref: 'Category',
          required: false,
        },
      },
      { timestamps: true },
    )
    
    const ArticleContent =
      mongoose.models.ArticleContent ||
      mongoose.model('ArticleContent', articleContentSchema)
    
    const Article =
      mongoose.models.Article || mongoose.model('Article', articleSchema)
    
    export { Article, ArticleContent }
    ```

- 트러블 슈팅 [다른 기록도 보기 →](https://velog.io/@katej927/Trouble-shooting-kate-devlog-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94#-%EA%B3%BC%EC%97%B0-%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C-%EC%8B%B6%EC%97%88%EB%8D%98-%EA%B2%83%EC%9D%84-%EB%8F%84%EC%A0%84%ED%95%98%EA%B3%A0-%EC%84%B1%EA%B3%B5%ED%96%88%EB%8B%A4-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%EB%A5%BC-%EC%9C%84%ED%95%9C-%EB%B0%B1%EC%97%94%EB%93%9C-%EB%A1%9C%EC%A7%81-%EC%88%98%EC%A0%95-%EC%84%B1%EA%B3%B5)
    
    **[ 과연 할 수 있을까 싶었던 것을 도전하고 성공했다. (성능 최적화를 위한 백엔드 로직 수정 성공) ]**
    
    - 무엇을 하고 싶었는가?
        
        > 성능 최적화를 하고 싶었다.
        > 
        
        어느 부분을 하고 싶었냐면, PR 제목처럼 post에서 글의 내용과 개요를 분리하고 싶었다.

    - 왜 하고 싶었는가?
        
        > 렌더링을 빠르게 하고 페이지가 가볍기를 바랬다.
        > 
        
        개요는 목록 UI에서 간단하면서 빠르게 보여주고 싶었다. 그런데 기존의 로직대로라면 개요 (제목, 간단한 설명) 정도만 보여주는데 모든 글의 내용을 load 받았어야 했다. content가 모든 글에 항상 붙어있었기 때문이다.
        
        지금이야 문제 없겠지만 앞으로 글이 많아지면 무거워질테고 그러면 렌더링이 느려질 것이라고 생각했다.
        
        느린 렌더링은 많이 비선호하는 편이고 프론트엔드 개발자로서도 받아들이기 어려운 부분이었다.
        
        비단 느린 렌더링 뿐 아니라 굳이 사용하지 않는 데이터를 들고 다닐 이유가 없다고 생각했다.

    - 어떤 부분에서 구현을 망설였는가?
        
        > 백엔드를 잘 몰라서 못할 것만 같았다.
        > 
        
        괜히 실수했다가 꼬이면 어쩌지? 하는 걱정도 들었다.
        
    - 어떻게 구현했는가?
        
        > 백엔드 구현 로직 확인chatGPT로 수정 키워드 뽑아내기mongoose로 relation 설정하기 (populate 활용)
        > 
        1. 백엔드 구현 로직 확인
            
            우선 article을 구현하면서 참고했던 레퍼런스([Step-by-Step Guide: Create a Next.js 13 CRUD App with MongoDB from Scratch](https://youtu.be/wNWyMsrpbz0?si=HqccCslQlj0oIERU))를 다시 보면서 어떤 식으로 백엔드 코드를 짰었는지 다시 점검했다.
            
            그래도 잘 모르겠고 어떤 부분을 수정해야 할지 감이 잘 오질 않았다.
            
        2. chatGPT로 수정 키워드 뽑아내기
            
            막막해서 chatGPT에게 물어보았다. 나의 Schema와 이 상태에서 내가 원하는 로직은 어떤 것인데 어떻게 구현해야 할지 모르겠다고.
            
            생각 보다 답을 잘 알려주었는데 그 코드가 어떻게 동작하는지 잘 모르겠고 정확성도 신뢰하기가 어려웠다. 그래서 수정된 부분이면서 중요 키워드로 보이는 코드를 따서 구글링 해보았다.
            
            해당 키워드는 `Schema.Types.ObjectId` 였다.
            
        3. mongoose로 relation 설정하기 (populate 활용)
            
            검색하니 바로 눈에 띄는 제목이 보였다. ‘[**mongoose로 relation 설정하기 (populate 이용하기)**](https://fierycoding.tistory.com/35)’
            
            읽어보니 내가 딱 원하던 내용이었다.
            
            각 모델을 생성하고 아래의 코드를 통해 연결 할 수 있었다.
            
            ```
            연결할 key: {
                type: Schema.Types.ObjectId, // id로 연결
                ref: 'Seller',
                required: true
              }
            ```
            
            그 후, `find().populate()` 를 통해 연결된 객체까지 조회할 수 있음을 알 수 있었다.
            
    - 소감
        
        해낼 수 있을까 걱정도 되었는데 늘 하나씩, 차분히 해내기로 마음 먹고 난 후로 하나씩 실마리를 풀어감을 느꼈다.
        
        그리고 이번에 해결했던 방법처럼 아예 감을 잡기 힘들때는 chatGPT에 키워드를 뽑고 자세한 것은 구글링을 통해 이해할 수 있지 않을까 하는 생각이 들었다.
        
        계속 차분히 해나가면 해낼 수 있구나 하는 자신감도 얻고 있다.
        
        중간중간 머리도 아팠지만.. 연속 2시간 반을 자리에서 스트레이트로 구현하는 날 보며 나는 여전히, 처음 프론트를 할 때 처럼 시간 가는 줄 모르고 하는 구나.
        
        개발하길 잘한 것 같다는 생각이 들어서 보람찼다.
        
        아무튼.. 이번에도 좋은 경험을 한 것 같다. 수고했다.🤝

</details>


## 검색 기능 추가 (debounce, mongoDB의 Aggregation 프레임워크)

<details>
  <summary>자세히 보기</summary>

  
  ![](https://velog.velcdn.com/images/katej927/post/82fb0f06-638d-49b3-b972-99ccce696faa/image.gif)
  
  
- 방법
  
    - 컴포넌트 기본 구현 ([코드 링크](https://github.com/katej927/kate-devlog/blob/main/src/containers/Home/Search/index.tsx))
  
        - **디바운스 처리**
            
            > 사용자 입력을 디바운스 처리하여 불필요한 검색 요청을 줄임 (`useDebounce` 커스텀 훅  활용)
            > 
        - **API 요청**

            검색어가 변경될 때마다 `/api/articles` 엔드포인트로 요청을 보내 검색 결과를 처리함
            
    - 검색 입력 디바운스 처리 ([코드 링크](https://github.com/katej927/kate-devlog/blob/main/src/hooks/useDebounce.ts))
        - **네트워크 및 서버 부하 최적화**

            사용자가 입력을 멈춘 후 일정 시간(500ms)이 지나야 실제 검색 요청을 보내 네트워크 및 서버 부하를 최소화함
            
    - 데이터베이스 연동 및 검색 처리 ([코드 링크](https://github.com/katej927/kate-devlog/blob/main/src/app/api/articles/route.ts))
  
        - MongoDB와 연동하여 Aggregation 프레임워크를 사용하여 데이터베이스에서 검색 및 필터링 작업을 수행
  
            - 구체적인 구현 조건
  
                - article의 title(제목)과 content(본문)에서 검색을 하되, return 할 때는 조건에 부합하는 content의 _id까지만 나오도록 함. (본문 내용은 반환하지 않게끔 함.)
                - 본문 내용은 반환하지 않게끔 하는 이유
  
                    
                    검색 시에 보여지는 내용이 article의 개요 부분들이라 굳이 article 클릭 전에 content 데이터까지 들고 다닐 이유가 없다고 생각해서.
  
- [`src/app/api/articles/route.ts`](https://github.com/katej927/kate-devlog/blob/main/src/app/api/articles/route.ts)
    
    ```tsx
    export const GET = async (request: NextRequest) => {
      const searchTerm = request.nextUrl.searchParams.get('searchTerm')
    
      await connectMongoDB()
    
      const searchCondition = {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { 'content.text': { $regex: searchTerm, $options: 'i' } },
        ],
      }
    
      const articles = searchTerm
        ? await Article.aggregate([ // 👈 mongoDB의 Aggregation 프레임워크
            {
              $lookup: {
                from: 'articlecontents',
                localField: 'content',
                foreignField: '_id',
                as: 'content',
              },
            },
            {
              $unwind: {
                path: '$content',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $match: searchCondition,
            },
            {
              $project: {
                _id: 1,
                title: 1,
                content: { _id: 1 },
                createdAt: 1,
                updatedAt: 1,
              },
            },
            {
              $sort: { createdAt: -1 },
            },
          ])
        : await Article.find().sort({ createdAt: -1 })
    
      return NextResponse.json({ articles }, { status: 200 })
    }
    ```

- 트러블 슈팅 [다른 기록도 보기 →](https://velog.io/@katej927/Trouble-shooting-kate-devlog-%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5)
    
    **[ [해낸 케이스 1] server component를 사용하기 위해 page.js 의 내장된 parameter, searchParams를 사용하다. ]**
    
    독자에게 보여지는 글은 가급적 SSR로 보여주고 싶었다. 좀 더 빠른 렌더링, SEO 를 위해서이다.
    
    그런데 작성하다보니 searchParams가 필요했는데 나는 nextjs에 능숙하지 않아서 useSearchParams를 사용해야만 하는 줄 알았다. **그래도 방법이 있나 하고 구글링을 해봤다.**
    
    나와 같은 고민을 하는 사람들이 많았고 결국 비교적 빠르고 간단히 해결방법을 찾았다. `nextjs searchparams server component` 라고 검색해봤고 거기에는 nextjs 공식문서를 레퍼런스로 달면서 page.js에서 searchParams를 가져와 사용하는 예시를 보여주었다.
    
    어쩐지 그 전에 강의를 들으면서 searchParams를 props로 받았지만 내려주는 곳이 없어 의아하게 생각하며 넘어간 바로 그 searchParams 였다. (심지어 난 봤고 유심히 코드를 까보았음에도 잘 몰라서 그냥 넘어간 것 이였다.)
    
    바로 내 프로젝트에서 console.log를 찍어보니 내가 원하던 값이 잘 나왔다.
    
    얼마나 잘 알려져있는 parameter인지는 모르겠으나 꽤나 유용히 사용될 것 같다. 스스로 문제를 해결하는 좋은 경험을 한 번 더 쌓을 수 있어서 기뻤다.
    
    **‘그래도 방법이 있나 찾아보는 것’ 이런 마음가짐이 중요한 것 같다.**
  

</details>


## authentication (회원가입, 로그인) 기능 추가 (NextAuth.js)


<details>
  <summary>자세히 보기</summary>

  ![](https://velog.velcdn.com/images/katej927/post/9690414f-23fe-4c89-8bf2-fa30550d0917/image.gif)
  
- 설명 ([관련 PR 링크 →](https://github.com/katej927/kate-devlog/pull/4))
  
    - 회원가입
  
        - 이미 존재하는 회원인지 (email로) 여부 파악함
  
            - 방법 : `mongoDB`에서 `findeOne`으로 `email` 찾음
        - 비밀번호 암호화
            - 방법 : `bcrypt`의 `hash` 활용
    - 로그인
        - 사용자가 로그인 했다면 register, login 페이지 접근 불가
  
            - 방법: `getServerSession`으로 `session`이 있다면, 홈으로 redirect
    - 그 외
        - 회원가입과 로그인의 공통된 ui를 위한 form component를 제작
  
            - 이유 : 회원가입과 로그인은 거의 비슷한 ui를 가졌기 때문에 둘을 위한 UI 컴포넌트 제작
        - 비로그인 상태일 경우, 글 작성 및 수정 페이지 접근 불가
            - 방법 : `next-auth`의 `middleware` 활용
  
  
- 트러블 슈팅 [다른 기록도 보기 →](https://velog.io/@katej927/Trouble-shooting-kate-devlog-authentication-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B8%B0%EB%8A%A5)
    
    **[‘무지성 검색’이 무엇인지, 어떻게 하면 ‘지성 검색’을 할 수 있는지 조금 알 것 같다. (feat. TypeError [ERR_INVALID_URL]: Invalid URL)]**
    
    전에 멘토님께 무지성 검색을 하지 말라는 말을 들었다.
    
    매우 속상하고 신경이 쓰였는데, 왜 그런 말을 하셨는지 알 것 같다.
    
    조금 어감이 쎄긴 했으나 ‘해당 에러가 왜 생겼는지 좀 더 생각해보며 찾아보라’ 정도로 이해하면 좋을 것 같다.
    
    왜냐면 이번에 `TypeError [ERR_INVALID_URL]: Invalid URL` 에러를 처리하며 (마음 고생도 함께 처리함) 깨닫는 게 있었기 때문이다.
    
    해당 에러를 처리 하면서 나오는 에러 문은 알아들을 수 없는 에러문으로 가득 찼었다..
    
    ```
    Error occurred prerendering page "/auth/register". Read more: <https://nextjs.org/docs/messages/prerender-error>
    TypeError [ERR_INVALID_URL]: Invalid URL
        at new NodeError (node:internal/errors:405:5)
        at new URL (node:internal/url:676:13)
        at t.default (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/chunks/41.js:1:22140)
        at 74284 (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/chunks/41.js:1:15075)
        at __webpack_require__ (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/webpack-runtime.js:1:161)
        at 45029 (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/chunks/192.js:1:964)
        at __webpack_require__ (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/webpack-runtime.js:1:161)
        at I (/home/runner/work/dev-blog-forked/dev-blog-forked/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:43:5587)
        at C (/home/runner/work/dev-blog-forked/dev-blog-forked/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:43:4266)
        at rp (/home/runner/work/dev-blog-forked/dev-blog-forked/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:27:25013)
    TypeError [ERR_INVALID_URL]: Invalid URL
        at new NodeError (node:internal/errors:405:5)
        at new URL (node:internal/url:676:13)
        at t.default (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/chunks/41.js:1:22140)
        at 74284 (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/chunks/41.js:1:15075)
        at __webpack_require__ (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/webpack-runtime.js:1:161)
        at 45029 (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/chunks/192.js:1:964)
        at __webpack_require__ (/home/runner/work/dev-blog-forked/dev-blog-forked/.next/server/webpack-runtime.js:1:161)
        at I (/home/runner/work/dev-blog-forked/dev-blog-forked/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:43:5587)
        at C (/home/runner/work/dev-blog-forked/dev-blog-forked/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:43:4266)
        at rp (/home/runner/work/dev-blog-forked/dev-blog-forked/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:27:25013) {
      input: '',
      code: 'ERR_INVALID_URL'
    }
    
    ```
    
    작업 도중 실수로 올린 PR에는 문제가 없었는데 뜬금없이 다 완료하고 나니 이런 에러가 github action에서 발생했다.
    
    local에서 build할 때도 나오지 않았고 그래서 더 해결하기 어려워했던 것 같다. 또한 구글링을 해도 비슷한 에러가 많이 발생했었는지 discussion에 많이 올라와있었다.
    
    확인했을 때, 종종 `NEXTAUTH_URL` 이라는 단어가 올라오는 것을 봤는데, 나는 다른 변수명으로 local url과 production url을 사용하고 있었고 전에 올려둔 PR에서는 에러가 나지 않았기 때문에 이 부분에 대해서는 이상이 없을 것이라고 생각해서 넘겼다.
    
    그 상태에서 구글링에 나온 다른 해결법을 찾아도 도저히 해결이 안되었고 나는 하는 수 없이 최후의 보루로 남겨둔, ‘에러 없던 커밋까지 다시 롤백해보기’전략을 선택했다. 하나하나 주석처리를 하며 확인하던 중 대규모로 수정했고 invalid url error라는 에러랑은 관련이 없어보이는 부분 까지 다시 롤백하려니 현타가 와서 다시 방법을 찾아보기 시작했다.
    
    그러자 전에 무심코 스쳐지나갔던 `NEXTAUTH_URL` 이 눈에 띄었다. 여러 번 보이던 저 단어.. 하지만 내가 참고한 강의안에는 보이지 않았던 단어. 난 이 단어에 대해 지나치지 않기로 마음먹고 discussions을 다시 확인 하던 차에 어떤 이가 해결방법으로 보낸 [next-auth의 공식문서 링크](https://next-auth.js.org/configuration/options)를 발견했다. ([참고한 discussion 링크](https://github.com/nextauthjs/next-auth/discussions/7801))
    
    ![](https://velog.velcdn.com/images/katej927/post/7d494410-0d77-4276-810f-2c17ee71bd97/image.png)

    
    아예 `NEXTAUTH_URL` 를 써야 한다고 써져있었다..! (ㅎㅎ..a)
    
    이에 나는 재빨리, 하지만 반신반의하면서 바로 .env.local에는 해당 변수명으로 local url을, .env.production에는 정식 url을 적었고 vercel에도 설정했다. 또한 process.env에서 가져오는 url도 `NEXTAUTH_URL` 로 바꿨다.
    
    노심초사한 결과, 결국 build가 잘 되었음을 확인 할 수 있었다.
    
    ---
    
    ### ◆ + 추가 에러 발견
    
    하지만 잘 해결되었다고 생각하고 PR을 정리하던 도중 어떤 url에서는 `NEXTAUTH_URL` 가 undefined로 뜨고 어디서는 잘 나오는 버그를 발견했다.
    
    태도를 조금 바꾸어 너무 절망하지 않고 하나 잘 끝냈으니 이것도 잘 끝낼 거라고 스스로를 다독이면서 하나하나 찾아나갔다.
    
    그리고 결국 정말 문제를 해결할 수 있었다.
    
    원인은 `NEXTAUTH_URL` 가 server side에서만 렌더링 되는 것이였다. 이러한 특징을 발견한 나는 바로 ssr, csr용 url을 구분하여 적용했고 문제가 해결됨을 볼 수 있었다. (햅삐 엔딩이다 ^ㅇ^)
    
    ---
    
    ### ◆ 과정 속에서 깨달은 점들
    
    내가 이 과정 속에서 깨달은 것은 뭐든 해결책에서 반복적으로 나오는 키워드들은 다시 확인해보고 적용해보자는 것이다. 그리고 error에서 나온 키워드를 중점적으로 찾으면 진짜 버그의 원인을 알 수 있다는 것이다. (여기서는 `Invalid URL` 였으나 나는 이를 아주 중점적으로 보진 않았다.)
    
    또한 PR은 최대한 쪼개서 올리자는 것, test code를 빨리 짜보자는 것이다. PR을 더 잘게 쪼개어 올렸더라면 더 좁은 단위에서 버그를 찾아볼 수 있었을 것이고 test code를 짰더라면 바로 에러를 찾기 좋았을 것이다. (이 case에서는 prod가 아니여서 못 찾았을수도 있지만 그 추적 범위를 좁히는데 도움이 되었을 것 같다.)
    
    이걸 해낼 수 있을까 많이 두렵고 걱정도 되었다. 이 큰 규모의 PR을 merge할 수도, 많은 노력과 성과가 있기에 그대로 둘 수도 없어 걱정이 많았다.
    
    하지만 결국 해냈다. 꽤나 간단한 방법으로 말이다.
    
    결국 할 수 있으니 바로 풀리지 않았다고 너무 상심하지 않는 것도 개발자의 좋은 태도가 아닐까 싶다. (어제 풀리지 않아서 많이 속상했었다.)
    
    많은 깨달음을 준 버그였다. 수고했다 내 자신. 🤝
  
</details>



## SEO 향상을 위한 meta tag, robots.txt, sitemap 구현

<details>
  <summary>자세히 보기</summary>
  

  | action | image |
  | --- | --- |
  | 1. robots.txt | <img src='https://github.com/katej927/kate-devlog/assets/69146527/6b578355-d1e3-475b-b2c2-58969c89b8a8' height='200'/> |
  | 2. sitemap.xml | <img src='https://github.com/katej927/kate-devlog/assets/69146527/688450fe-958a-4aa4-8521-f6b5b60de850' height='200'/> |
  
  - [`src/app/sitemap.ts`](https://github.com/katej927/kate-devlog/blob/main/src/app/sitemap.ts)
    
    ```tsx
    const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
      const articles = await loadArticles()
      const categories = await loadCategories()
    
      const basicSitemap: MetadataRoute.Sitemap = [
        { url: `${DOMAIN}`, lastModified: articles?.[0].updatedAt },
        { url: `${DOMAIN}/category`, lastModified: articles?.[0].updatedAt },
      ]
    
      const articlesSitemap: MetadataRoute.Sitemap =
        articles?.map(({ _id, updatedAt }) => ({
          url: `${DOMAIN}/article/${_id}`,
          lastModified: updatedAt,
        })) ?? []
    
      const categoriesSitemap: MetadataRoute.Sitemap =
        categories?.map(({ _id, latestArticleTimestamp }) => ({
          url: `${DOMAIN}/category/${_id}`,
          lastModified: latestArticleTimestamp,
        })) ?? []
    
      return [...basicSitemap, ...categoriesSitemap, ...articlesSitemap]
    }
    
    export default Sitemap
    ```
    
- [`src/app/robots.ts`](https://github.com/katej927/kate-devlog/blob/main/src/app/robots.ts)
    
    ```tsx
    import { MetadataRoute } from 'next'
    
    import { DOMAIN } from '@/constants/common'
    
    export default function robots(): MetadataRoute.Robots {
      return {
        rules: {
          userAgent: '*',
          allow: '/',
          disallow: ['/src/app/article/edit/', '/src/app/article/write/'],
        },
        sitemap: `${DOMAIN}/sitemap.xml`,
      }
    }
    ```
    
- [`src/constants/metaDatas.ts`](https://github.com/katej927/kate-devlog/blob/fe412edff2f41cddbd743ce4927ae13edb944dd8/src/constants/metaDatas.ts)
    
   ```tsx
    export const LAYOUT_METADATA = {
      title: 'kate-devlog',
      description: 'A dev blog written with the aim of reviewing',
      keywords: ['kate', 'devlog', 'frontend'],
      verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
    }
   ```
  
 - 트러블 슈팅 [다른 기록도 보기 →](https://velog.io/@katej927/Trouble-shooting-kate-devlog-SEO)
    
    **[ 지나고 나면 별 거 아니지만 당시에는 어려웠던 것들 ]**
    
    SEO에 대해 스스로 찾아보는 것이 처음이라서 초반엔 뭐부터 해야할지 감도 오지를 않았다.
    
    그러다가 SEO에 대한 다양한 방법을 개괄적으로 알려주는 [한 블로그](https://yoonhu.vercel.app/makeblog/make_nextjs_blog6#nextjs-google-meta-%ED%83%9C%EA%B7%B8-%EB%84%A3%EA%B8%B0)를 찾게 되었다. 여기서는 목차랑 대략적인 내용만 참고했고 그것들이 무엇을 의미하는지 자세한 것은 따로 구글링을 해서 알아보았다.
    
    따로 찾아본 목록은 아래와 같다.
    
    1. google meta tag 넣기

        meta태그가 무엇인지, 어떻게 해야 nextjs에 넣을 수 있는지 몰랐다. 블로그에서는 generateMetadata 함수를 활용해서 `head`의 `meta`태그를 설정해 주었는데 이것도 알 수가 없어서 구글링을 해보았다.
        
        비록 공식문서가 아닌 [블로그](https://curryyou.tistory.com/550)로 내용을 찾아보았지만 꽤나 유용한 내용을 알아낼 수 있었다.
        
        Next.js는 metaData API를 통해 meta data를 추가 정의 하고 metadata 객체는 정적 메타데이터를, generateMetadata함수는 동적 메타 데이터를 정의할 때 사용한다는 것을 알 수 있었다.
        
        나는 시간 관계상 이들이 무엇을 의미하는지 정도만 파악하고 가장 기본적인 속성만 추가하고 metadata의 다양한 속성은 나중에 추가하고자 한다.
        
    2. sitemap.xml, Robots.ts
        
        이 둘 또한 블로그에 소개된 내용을 바탕으로 이해를 했으며 블로그 글을 참고하여 작성해 보았고 잘 나오는 것을 확인 했다.
        
    - 소감

        처음에는 뭘 어떻게 해야 할지 몰라서 많이 막막했다.
        
        하지만 하나씩 차근차근 풀어나가고 목차를 바탕으로 최대한 공식문서 또는 이에 준하는 레퍼런스를 참고하면 문제를 잘 풀어나갈 수 있지 않을까 하는 생각이 들었다.
        
        지금 이를 정리하면서 내가 어떻게 하면 문제를 잘 풀어낼 수 있었던 것인지 정리가 된 것 같고 그래서 감사하다.
        
        고생했다. 내 자신.
  
</details>
