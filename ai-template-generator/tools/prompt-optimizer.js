#!/usr/bin/env node

/**
 * AI Template Generator - Prompt Optimizer
 * 用于优化和测试AI prompt的效果
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class PromptOptimizer {
    constructor() {
        this.testResults = [];
        this.optimizationHistory = [];
    }

    /**
     * 优化prompt
     * @param {string} promptPath - prompt文件路径
     * @param {Object} options - 优化选项
     */
    async optimizePrompt(promptPath, options = {}) {
        console.log(`🚀 开始优化 prompt: ${promptPath}`);
        
        const {
            targetModel = 'deepseek-v3',
            iterations = 3,
            testTemplate = 'react-craco',
            optimizationLevel = 'basic'
        } = options;

        try {
            // 1. 分析现有prompt
            const analysis = await this.analyzePrompt(promptPath);
            console.log('📊 Prompt分析结果:', analysis);
            
            // 2. 根据分析结果生成优化建议
            const suggestions = this.generateOptimizationSuggestions(analysis, optimizationLevel);
            console.log('💡 优化建议:', suggestions);
            
            // 3. 应用优化建议
            const optimizedPrompts = await this.applyOptimizations(promptPath, suggestions);
            
            // 4. 测试优化效果
            const testResults = await this.testPrompts(optimizedPrompts, {
                targetModel,
                testTemplate,
                iterations
            });
            
            // 5. 选择最佳版本
            const bestPrompt = this.selectBestPrompt(testResults);
            
            // 6. 生成优化报告
            this.generateOptimizationReport(analysis, suggestions, testResults, bestPrompt);
            
            return {
                originalPrompt: promptPath,
                optimizedPrompt: bestPrompt,
                analysis,
                suggestions,
                testResults,
                improvement: this.calculateImprovement(testResults)
            };
            
        } catch (error) {
            console.error('优化过程中发生错误:', error.message);
            throw error;
        }
    }

    /**
     * 分析prompt结构
     */
    async analyzePrompt(promptPath) {
        const content = fs.readFileSync(promptPath, 'utf8');
        
        const analysis = {
            length: content.length,
            lineCount: content.split('\n').length,
            sections: this.extractSections(content),
            codeTemplates: (content.match(/\[CODE_TEMPLATE\]/g) || []).length,
            placeholders: (content.match(/\$\{[A-Z_][A-Z0-9_]*\}/g) || []).length,
            hasOutputFormat: content.includes('输出格式要求'),
            hasSteps: content.match(/\d+\./g)?.length || 0,
            hasRequirements: content.includes('核心要求'),
            language: this.detectLanguage(content)
        };
        
        return analysis;
    }

    /**
     * 提取prompt的章节结构
     */
    extractSections(content) {
        const sections = [];
        const lines = content.split('\n');
        
        lines.forEach(line => {
            if (line.match(/^## /)) {
                sections.push({
                    type: 'h2',
                    title: line.replace('## ', ''),
                    line: lines.indexOf(line)
                });
            } else if (line.match(/^### /)) {
                sections.push({
                    type: 'h3',
                    title: line.replace('### ', ''),
                    line: lines.indexOf(line)
                });
            }
        });
        
        return sections;
    }

    /**
     * 检测prompt语言
     */
    detectLanguage(content) {
        const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length;
        const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
        
        return chineseChars > englishWords ? 'chinese' : 'english';
    }

    /**
     * 生成优化建议
     */
    generateOptimizationSuggestions(analysis, optimizationLevel) {
        const suggestions = [];
        
        // 基础优化建议
        if (analysis.sections.length < 5) {
            suggestions.push({
                type: 'structure',
                priority: 'high',
                description: '增加章节结构，使prompt更有层次',
                action: '添加更多 ## 标题来组织内容'
            });
        }
        
        if (analysis.hasSteps < 5) {
            suggestions.push({
                type: 'content',
                priority: 'high',
                description: '增加更详细的执行步骤',
                action: '将执行过程分解为6个具体步骤'
            });
        }
        
        if (!analysis.hasOutputFormat) {
            suggestions.push({
                type: 'format',
                priority: 'medium',
                description: '添加明确的输出格式要求',
                action: '添加 🔍 输出格式要求 部分'
            });
        }
        
        // 高级优化建议
        if (optimizationLevel === 'advanced') {
            if (analysis.codeTemplates === 0) {
                suggestions.push({
                    type: 'content',
                    priority: 'medium',
                    description: '添加代码模板标记',
                    action: '在适当位置添加 [CODE_TEMPLATE] 标记'
                });
            }
            
            if (analysis.placeholders === 0) {
                suggestions.push({
                    type: 'content',
                    priority: 'low',
                    description: '添加占位符提高可定制性',
                    action: '添加 ${VARIABLE_NAME} 格式的占位符'
                });
            }
        }
        
        return suggestions;
    }

    /**
     * 应用优化建议
     */
    async applyOptimizations(promptPath, suggestions) {
        const content = fs.readFileSync(promptPath, 'utf8');
        const variations = [];
        
        // 原始版本
        variations.push({
            name: 'original',
            content: content,
            optimizations: []
        });
        
        // 应用每个优化建议生成变体
        for (const suggestion of suggestions) {
            const optimized = await this.applySuggestion(content, suggestion);
            variations.push({
                name: `optimized-${suggestion.type}`,
                content: optimized,
                optimizations: [suggestion]
            });
        }
        
        // 组合优化版本
        const combinedOptimizations = suggestions.filter(s => s.priority === 'high');
        if (combinedOptimizations.length > 1) {
            let combined = content;
            for (const suggestion of combinedOptimizations) {
                combined = await this.applySuggestion(combined, suggestion);
            }
            variations.push({
                name: 'optimized-combined',
                content: combined,
                optimizations: combinedOptimizations
            });
        }
        
        return variations;
    }

    /**
     * 应用单个优化建议
     */
    async applySuggestion(content, suggestion) {
        let optimized = content;
        
        switch (suggestion.type) {
            case 'structure':
                optimized = this.enhanceStructure(content);
                break;
            case 'content':
                optimized = this.enhanceContent(content);
                break;
            case 'format':
                optimized = this.enhanceFormat(content);
                break;
        }
        
        return optimized;
    }

    /**
     * 增强结构
     */
    enhanceStructure(content) {
        // 添加更多章节标记
        if (!content.includes('## 🎯 核心要求')) {
            content = content.replace('## 📋 执行步骤', '## 📋 执行步骤\n\n## 🎯 核心要求');
        }
        
        if (!content.includes('## 🔍 输出格式要求')) {
            content += '\n\n## 🔍 输出格式要求\n请按以下格式组织输出：\n\n```\n## 项目生成完成\n\n### 生成的文件列表\n[列出所有生成的文件路径]\n\n### 关键配置说明\n[简要说明重要配置的内容和作用]\n\n### 下一步操作\n[告诉用户如何使用生成的项目]\n\n### 验证清单\n[检查项目完整性的清单]\n```';
        }
        
        return content;
    }

    /**
     * 增强内容
     */
    enhanceContent(content) {
        // 增加详细步骤
        if (content.match(/\d+\./g)?.length < 6) {
            const stepsSection = content.match(/## 📋 执行步骤[\s\S]*?(?=##|$)/);
            if (stepsSection) {
                const enhancedSteps = stepsSection[0] + '\n7. [步骤7 - 最终验证和清理]';
                content = content.replace(stepsSection[0], enhancedSteps);
            }
        }
        
        return content;
    }

    /**
     * 增强格式
     */
    enhanceFormat(content) {
        // 添加更多emoji和格式化
        content = content.replace(/^# /gm, '# 🎯 ');
        content = content.replace(/^## /gm, '## 📋 ');
        content = content.replace(/^### /gm, '### 📝 ');
        
        return content;
    }

    /**
     * 测试prompt效果
     */
    async testPrompts(prompts, options) {
        const testResults = [];
        
        for (const prompt of prompts) {
            console.log(`🧪 测试 prompt: ${prompt.name}`);
            
            const result = await this.testSinglePrompt(prompt, options);
            testResults.push({
                promptName: prompt.name,
                ...result
            });
        }
        
        return testResults;
    }

    /**
     * 测试单个prompt
     */
    async testSinglePrompt(prompt, options) {
        const startTime = Date.now();
        
        try {
            // 模拟AI生成 (这里应该调用实际的AI API)
            const generationResult = await this.simulateAIGeneration(prompt.content, options);
            
            const duration = Date.now() - startTime;
            
            // 评估生成结果
            const score = this.evaluateGenerationResult(generationResult);
            
            return {
                duration,
                score,
                success: generationResult.success,
                completeness: generationResult.completeness,
                errors: generationResult.errors || []
            };
            
        } catch (error) {
            return {
                duration: Date.now() - startTime,
                score: 0,
                success: false,
                errors: [error.message]
            };
        }
    }

    /**
     * 模拟AI生成过程
     */
    async simulateAIGeneration(prompt, options) {
        // 这里应该调用实际的AI API
        // 为了演示，我们返回模拟结果
        
        const delay = Math.random() * 5000 + 5000; // 5-10秒
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return {
            success: Math.random() > 0.2, // 80% 成功率
            completeness: Math.random() * 100, // 0-100% 完整性
            errors: Math.random() > 0.7 ? ['模拟错误'] : []
        };
    }

    /**
     * 评估生成结果
     */
    evaluateGenerationResult(result) {
        let score = 0;
        
        if (result.success) score += 40;
        score += result.completeness * 0.6; // 60% 权重
        
        if (result.errors && result.errors.length > 0) {
            score -= result.errors.length * 10;
        }
        
        return Math.max(0, Math.min(100, score));
    }

    /**
     * 选择最佳prompt
     */
    selectBestPrompt(testResults) {
        return testResults.reduce((best, current) => 
            current.score > best.score ? current : best
        );
    }

    /**
     * 计算改进效果
     */
    calculateImprovement(testResults) {
        const original = testResults.find(r => r.promptName === 'original');
        const best = testResults.reduce((best, current) => 
            current.score > best.score ? current : best
        );
        
        if (!original) return 0;
        
        return {
            scoreImprovement: best.score - original.score,
            timeImprovement: original.duration - best.duration,
            improvementPercentage: ((best.score - original.score) / original.score * 100).toFixed(2)
        };
    }

    /**
     * 生成优化报告
     */
    generateOptimizationReport(analysis, suggestions, testResults, bestPrompt) {
        console.log('\n📊 Prompt优化报告');
        console.log('=' .repeat(50));
        
        console.log('\n📈 原始分析:');
        console.log(`  - 内容长度: ${analysis.length} 字符`);
        console.log(`  - 章节数量: ${analysis.sections.length}`);
        console.log(`  - 代码模板: ${analysis.codeTemplates}`);
        console.log(`  - 占位符: ${analysis.placeholders}`);
        
        console.log('\n💡 优化建议:');
        suggestions.forEach(suggestion => {
            console.log(`  - ${suggestion.description} (${suggestion.priority})`);
        });
        
        console.log('\n🧪 测试结果:');
        testResults.forEach(result => {
            console.log(`  - ${result.promptName}: ${result.score.toFixed(1)}分 (${result.duration}ms)`);
        });
        
        console.log(`\n🏆 最佳版本: ${bestPrompt.promptName} (${bestPrompt.score.toFixed(1)}分)`);
        
        const improvement = this.calculateImprovement(testResults);
        if (improvement.scoreImprovement > 0) {
            console.log(`\n✅ 改进效果: +${improvement.scoreImprovement.toFixed(1)}分 (${improvement.improvementPercentage}%)`);
        }
    }
}

/**
 * CLI接口
 */
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('使用方法: node prompt-optimizer.js <prompt-file> [options]');
        console.log('示例: node prompt-optimizer.js ../templates/react-craco/00-main-prompt.md --model deepseek-v3');
        process.exit(1);
    }
    
    const promptPath = args[0];
    const options = {
        targetModel: args.includes('--model') ? args[args.indexOf('--model') + 1] : 'deepseek-v3',
        iterations: args.includes('--iterations') ? parseInt(args[args.indexOf('--iterations') + 1]) : 3,
        testTemplate: args.includes('--template') ? args[args.indexOf('--template') + 1] : 'react-craco',
        optimizationLevel: args.includes('--advanced') ? 'advanced' : 'basic'
    };
    
    if (!fs.existsSync(promptPath)) {
        console.log(`错误: 文件不存在: ${promptPath}`);
        process.exit(1);
    }
    
    const optimizer = new PromptOptimizer();
    try {
        const result = await optimizer.optimizePrompt(promptPath, options);
        
        // 保存优化后的prompt
        if (result.optimizedPrompt) {
            const outputPath = promptPath.replace('.md', '.optimized.md');
            fs.writeFileSync(outputPath, result.optimizedPrompt.content);
            console.log(`\n💾 优化后的prompt已保存到: ${outputPath}`);
        }
        
    } catch (error) {
        console.error('优化失败:', error.message);
        process.exit(1);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main().catch(console.error);
}

module.exports = PromptOptimizer;