const { Client } = require("@notionhq/client");

/**
 * Notion インスタンス
 */
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});