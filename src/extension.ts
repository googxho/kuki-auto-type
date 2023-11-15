/*
 * @Auther: googxh
 * @Date: 2023-10-17 14:21:47
 * @LastEditors: googxh 49309686+googxho@users.noreply.github.com
 * @LastEditTime: 2023-11-15 13:12:25
 * @FilePath: \any-type\src\extension.ts
 * @Description: 
 */
import { window, commands, env, Range, type ExtensionContext } from 'vscode';
import getType from './getType';

// 插件激活
export function activate(context: ExtensionContext) {

	// 注册命令 命令名必须与package.json中的command保持一致
	// const removeLog = commands.registerCommand('editor.removeLog', function () {
	//  // vscode窗口对象
	// 	const global = window;
	// 	// vscode当前编辑页面的editor对象
	// 	const editor = global.activeTextEditor;
	// 	// 如果不存在editor，就返回
	// 	if (!editor) { return; }
	// 	// vscode文档对象
	// 	const document = editor.document;
	// 	// 获取用户选中的文本信息
	// 	let txt = document.getText(editor.selection);
	// 	// 对文本信息进行正则替换，去掉console.xxx
	// 	txt = txt.replace(/\s+console.(loglinfolerrorltable)\((.*));?/g, '');// 使替换后的文本在编辑器里生效
	// 	editor.edit((edit) => {
	// 		// 获取editBuilder实例,进行真正的替换
	// 		edit.replace(editor.selection, txt);
	// 	})
	// 	// 弹出信息，提示用户删除成功
	// 	global.showInformationMessage('已删除console');
	// 	// 订阅 注册的命令
	// 	context.subscriptions.push(removeLog);
	// })

	context.subscriptions.push(
		commands.registerCommand('extension.genTsType', async () => {
			try {
				const input = await window.showInputBox({
					title: 'kuki-auto-type',
					placeHolder: '请输入JSON数据',
				});
				if (input) {
					const output = getType(input);
					insertText(output);
					await env.clipboard.writeText(output);
					window.showInformationMessage('类型生成成功, 已复制到剪贴板.');
				}
			} catch (error) {
				window.showErrorMessage(error as string);
			}
		})
	);
}

/**
 * 插入文字到编辑器
 * @param text 文字
 */
function insertText(text: string): void {
	const editor = window.activeTextEditor;
	if (editor) {
		const { selections } = editor;
		editor.edit((editBuilder) => {
			selections.forEach((selection) => {
				const { start, end } = selection;
				const range = new Range(start, end);
				editBuilder.replace(range, text);
			});
		});
	}
}
// 插件卸载
export function deactivate() { }
