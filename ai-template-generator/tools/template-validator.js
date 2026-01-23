#!/usr/bin/env node

/**
 * AI Template Generator - Template Validator
 * 用于验证AI生成项目模板的完整性和正确性
 */

const fs = require('fs');
const path = require('path');

class TemplateValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.validatedFiles = [];
    }

    /**
     * 验证模板结构
     * @param {string} templatePath - 模板路径
     * @param {string} framework - 技术栈名称
     */
    async validateTemplate(templatePath, framework) {
        console.log(`🔍 开始验证 ${framework} 模板...`);
        
        // 重置状态
        this.errors = [];
        this.warnings = [];
        this.validatedFiles = [];

        try {
            // 1. 验证必需文件存在
            await this.validateRequiredFiles(templatePath);
            
            // 2. 验证文档结构
            await this.validateDocumentStructure(templatePath);
            
            // 3. 验证代码模板标记
            await this.validateCodeTemplates(templatePath);
            
            // 4. 验证占位符格式
            await this.validatePlaceholders(templatePath);
            
            // 5. 生成验证报告
            this.generateReport(framework);
            
            return {
                success: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings,
                validatedFiles: this.validatedFiles
            };
            
        } catch (error) {
            this.errors.push(`验证过程中发生错误: ${error.message}`);
            return {
                success: false,
                errors: this.errors,
                warnings: this.warnings,
                validatedFiles: this.validatedFiles
            };
        }
    }

    /**
     * 验证必需文件是否存在
     */
    async validateRequiredFiles(templatePath) {
        const requiredFiles = [
            '00-main-prompt.md',
            '01-project-overview.md',
            '02-config.md',
            '03-structure-templates.md',
            '04-code-templates.md',
            '05-deployment-templates.md',
            '06-usage-instructions.md'
        ];

        for (const file of requiredFiles) {
            const filePath = path.join(templatePath, file);
            if (!fs.existsSync(filePath)) {
                this.errors.push(`缺少必需文件: ${file}`);
            } else {
                this.validatedFiles.push(file);
            }
        }
    }

    /**
     * 验证文档结构
     */
    async validateDocumentStructure(templatePath) {
        const files = fs.readdirSync(templatePath).filter(f => f.endsWith('.md'));
        
        for (const file of files) {
            const filePath = path.join(templatePath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // 验证标题结构
            if (!content.match(/^# /m)) {
                this.warnings.push(`${file}: 缺少主标题`);
            }
            
            // 验证代码块格式
            const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
            for (const block of codeBlocks) {
                if (!block.match(/```\w+/)) {
                    this.warnings.push(`${file}: 代码块缺少语言标识`);
                }
            }
            
            this.validatedFiles.push(file);
        }
    }

    /**
     * 验证代码模板标记
     */
    async validateCodeTemplates(templatePath) {
        const files = fs.readdirSync(templatePath).filter(f => f.endsWith('.md'));
        
        for (const file of files) {
            const filePath = path.join(templatePath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // 查找CODE_TEMPLATE标记
            const templateMatches = content.match(/\[CODE_TEMPLATE\]/g);
            if (templateMatches) {
                console.log(`✓ ${file}: 找到 ${templateMatches.length} 个代码模板标记`);
            }
            
            // 验证CODE_TEMPLATE后是否有代码块
            const templatePattern = /\[CODE_TEMPLATE\][\s\S]*?```[\s\S]*?```/g;
            let match;
            let templateCount = 0;
            while ((match = templatePattern.exec(content)) !== null) {
                templateCount++;
            }
            
            if (templateMatches && templateCount !== templateMatches.length) {
                this.warnings.push(`${file}: CODE_TEMPLATE标记与代码块数量不匹配`);
            }
        }
    }

    /**
     * 验证占位符格式
     */
    async validatePlaceholders(templatePath) {
        const files = fs.readdirSync(templatePath).filter(f => f.endsWith('.md'));
        const placeholderRegex = /\$\{[A-Z_][A-Z0-9_]*\}/g;
        
        for (const file of files) {
            const filePath = path.join(templatePath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            const placeholders = content.match(placeholderRegex) || [];
            if (placeholders.length > 0) {
                console.log(`✓ ${file}: 找到 ${placeholders.length} 个占位符`);
                
                // 验证占位符格式
                for (const placeholder of placeholders) {
                    if (!placeholder.match(/^\$\{[A-Z_][A-Z0-9_]*\}$/)) {
                        this.warnings.push(`${file}: 占位符格式不正确: ${placeholder}`);
                    }
                }
            }
        }
    }

    /**
     * 生成验证报告
     */
    generateReport(framework) {
        console.log(`\n📊 ${framework} 模板验证报告`);
        console.log('=' .repeat(50));
        
        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('✅ 验证通过！模板结构完整且正确。');
        } else {
            if (this.errors.length > 0) {
                console.log('\n❌ 错误:');
                this.errors.forEach(error => console.log(`  - ${error}`));
            }
            
            if (this.warnings.length > 0) {
                console.log('\n⚠️ 警告:');
                this.warnings.forEach(warning => console.log(`  - ${warning}`));
            }
        }
        
        console.log(`\n📋 验证的文件: ${this.validatedFiles.length} 个`);
        this.validatedFiles.forEach(file => console.log(`  ✓ ${file}`));
    }
}

/**
 * CLI接口
 */
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('使用方法: node template-validator.js --template <template-name>');
        console.log('示例: node template-validator.js --template react-craco');
        process.exit(1);
    }
    
    const templateIndex = args.indexOf('--template');
    if (templateIndex === -1 || !args[templateIndex + 1]) {
        console.log('错误: 请指定模板名称');
        process.exit(1);
    }
    
    const templateName = args[templateIndex + 1];
    const templatePath = path.join(__dirname, '../docs/templates', templateName);
    
    if (!fs.existsSync(templatePath)) {
        console.log(`错误: 模板不存在: ${templatePath}`);
        process.exit(1);
    }
    
    const validator = new TemplateValidator();
    const result = await validator.validateTemplate(templatePath, templateName);
    
    process.exit(result.success ? 0 : 1);
}

// 如果直接运行此脚本
if (require.main === module) {
    main().catch(console.error);
}

module.exports = TemplateValidator;