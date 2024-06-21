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
