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
