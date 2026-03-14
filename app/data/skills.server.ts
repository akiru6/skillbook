import React from "react";

/**
 * 这是一个服务端渲染的数据获取函数。
 * 当此网站部署在云端（如 Cloudflare, Vercel）时，它不再拥有你本地的那些文件夹结构。
 * 因此，我们将本地的 fs 读取修改为了直接从你的 GitHub 仓库实时拉取最新的技能元数据。
 */

export async function getSkillMarkdown(skillId: string, lang: string = "zh"): Promise<string | null> {
    const rawBaseUrl = "https://raw.githubusercontent.com/akiru6/accounting-skills/main";
    
    try {
        // Build the URL for the specific language, or default to SKILL.md for zh
        const fileName = lang === 'en' ? 'SKILL_en.md' : 'SKILL.md';
        let url = `${rawBaseUrl}/${skillId}/${fileName}`;
        
        let response = await fetch(url);

        // Fallback: If not found, try the universal SKILL.md
        if (!response.ok && fileName !== 'SKILL.md') {
            url = `${rawBaseUrl}/${skillId}/SKILL.md`;
            response = await fetch(url);
        }

        if (!response.ok) {
            console.warn(`Failed to fetch markdown for ${skillId} from GitHub. Expected 200 OK, got ${response.status}`);
            return null;
        }

        const content = await response.text();
        return content;
    } catch (error) {
        console.error(`Error requesting markdown for skill ${skillId}:`, error);
        return null;
    }
}
