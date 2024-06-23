/**
 * Notion インスタンス
 */
import { NotionToMarkdown } from "notion-to-md";

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

interface NotionPost {
  id: string;
  title: string;
  tags: string[];
  img: string[];
  createdAt: string;
  author: string
};

export async function getAllPosts(): Promise<NotionPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    sorts: [
      { //createdAtカラムの値で降順に並べる
        property: 'created_at',
        direction: 'descending',
      },
    ]
  })

  const posts = response.results

  const postsProperties = posts.map((post: any) => {
    // レコードidの取り出し
    const id = post.id

    // titleプロパティの取り出し
    const title = post.properties.title.title[0]?.plain_text;

    // multi_selectプロパティの取り出し（例：types）
    const tags = post.properties.tags.multi_select.map((item: any) => item.name);

    // filesプロパティの取り出し（例：file）
    const img = post.properties.file.files.map((file: any) => file.file.url);

    // dateプロパティの取り出し
    const createdAt = post.properties.created_at.date.start;

    // peopleプロパティの取り出し（例：author）
    const author = post.properties.author.select.name;

    // プロパティをまとめたオブジェクトを返す
    return { id, title, tags, img, createdAt, author };
  });

  return postsProperties
}

export async function getPageContent(pageId: string) {
  const mdblocks = await n2m.pageToMarkdown(pageId, 2);
  console.log("Markdown Content:", mdblocks);

  return mdblocks;
}