<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar
      :editorId="editorId"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <!-- 编辑器 -->
    <Editor
      :editorId="editorId"
      :mode="mode"
      :defaultConfig="editorConfig"
      :defaultContent="getDefaultContent"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
      style="height: 500px"
    />
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 也可以在 <style> 中 import

import { computed, onUnmounted, onMounted } from "vue";
import {
  Editor,
  Toolbar,
  getEditor,
  removeEditor,
} from "@wangeditor/editor-for-vue";
import { i18nChangeLanguage } from "@wangeditor/editor";
import cloneDeep from "lodash.clonedeep";

export default {
  name: "MyEditor",
  components: { Editor, Toolbar },
  setup() {
    const editorId = "wangeEditor-1";

    // 默认内容
    const defaultContent = [
      {
        type: "paragraph",
        children: [{ text: "一行文字" }],
      },
    ];

    // 注意，深度拷贝 content ，否则会报错
    const getDefaultContent = computed(() => cloneDeep(defaultContent));

    // 编辑器配置
    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {
        insertImage: {
          checkImage(src) {
            console.log("image src", src);
            if (src.indexOf("http") !== 0) {
              return "图片网址必须以 http/https 开头";
            }
            return true;
          },
        },
      },
    };

    // 编辑器回调函数
    const handleCreated = (editor) => {
      console.log("created", editor);
    };
    const handleChange = (editor) => {
      console.log("change:", editor.children);
    };
    const handleDestroyed = (editor) => {
      console.log("destroyed", editor);
    };
    const handleFocus = (editor) => {
      console.log("focus", editor);
    };
    const handleBlur = (editor) => {
      console.log("blur", editor);
    };
    const customAlert = (info, type) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    const customPaste = (editor, event, callback) => {
      console.log("ClipboardEvent 粘贴事件对象", event);

      // 自定义插入内容
      editor.insertText("xxx");

      // 返回值（注意，vue 事件的返回值，不能用 return）
      callback(false); // 返回 false ，阻止默认粘贴行为
      // callback(true) // 返回 true ，继续默认的粘贴行为
    };

    onMounted(() => {
      i18nChangeLanguage('en');
    });

    // 及时销毁编辑器
    onUnmounted(() => {
      const editor = getEditor(editorId);
      if (editor == null) return;

      // 销毁，并移除 editor
      editor.destroy();
      removeEditor(editorId);
    });

    return {
      editorId,
      mode: "default",
      getDefaultContent,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
    };
  },
};
</script>
