import fs from "fs/promises";
import path from "path";

/**
 * 这是专门在服务器端运行的数据获取文件
 * 这里我们从本地文件系统读取 SKILL.md，
 * 未来如果有了数据库，就改成从数据库或 GitHub API 读取。
 */

// 假设我们现在从上两层目录（workspace根目录）读取对应名称的文件夹
const WORKSPACE_DIR = path.resolve(process.cwd(), "..");

export async function getSkillMarkdown(skillId: string): Promise<string | null> {
    try {
        const filePath = path.join(WORKSPACE_DIR, skillId, "SKILL.md");
        const content = await fs.readFile(filePath, "utf-8");
        return content;
    } catch (error) {
        console.error(`Error reading markdown for skill ${skillId}:`, error);
        return null;
    }
}
