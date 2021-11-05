<!-- https://github.com/wangeditor-team/wangEditor-v5/issues/248 -->
<!-- React 环境下，注册插件是否有效？需验证 -->
<template>
  <div class="home">
    <h1>registerPlugin</h1>
    <p>
      <button @click="handleClick">点击</button>
    </p>
    <div>
      <!-- 工具栏 -->
      <div id="toolbar-container" style="border-bottom: 1px solid #ccc"></div>
      <!-- 编辑器 -->
      <div
        id="editor-container"
        style="height: 500px; border-bottom: 1px solid #ccc"
      ></div>
    </div>
  </div>
</template>

<script>
import { Boot, createEditor, createToolbar } from "@wangeditor/editor";
import { IDomEditor, DomEditor } from "@wangeditor/core";
import { Editor, Transforms } from 'slate'
import { onMounted } from "vue";

export default {
  name: 'registerPlugin',
  setup() {
    const withBreak = (editor) => {
      const { insertBreak } = editor;
      const newEditor = editor;

      // 重写 insertBreak - 换行时插入 p
      newEditor.insertBreak = () => {
        console.log('执行了');
      }
    }

    // 及时销毁编辑器
    onMounted(() => {
      const editorConfig = {}
      editorConfig.placeholder = '请输入内容'
      editorConfig.onChange = (editor) => {
          // 当编辑器选区、内容变化时，即触发
          console.log('content', editor.children)
          console.log('html', editor.getHtml())
      }

      // 创建编辑器
      const editor = createEditor({
        selector: '#editor-container',
        config: editorConfig,
        content: [], // 默认内容，下文有解释
        mode: 'default' // 或者 'simple' ，下文有解释
      })

      // 注册到 wangEditor
      Boot.registerPlugin(withBreak(editor));

      // 创建工具栏
      createToolbar({
        editor,
        selector: '#toolbar-container',
        mode: 'default' // 或者 'simple' ，下文有解释
      })
      
    });

  }

}
</script>
