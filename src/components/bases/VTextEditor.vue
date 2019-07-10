<template>
  <div class="editor">
    <!-- Editer Menu Bar -->
    <EditorMenuBar :editor="context">
      <div class="menubar" slot-scope="{ commands, isActive }">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click.self.prevent="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click.self.prevent="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click.self.prevent="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 4 }) }"
          @click.self.prevent="commands.heading({ level: 4 })"
        >
          H4
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 5 }) }"
          @click.self.prevent="commands.heading({ level: 5 })"
        >
          H5
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 6 }) }"
          @click.self.prevent="commands.heading({ level: 6 })"
        >
          H6
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click.self.prevent="commands.paragraph"
        >
          P
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click.self.prevent="commands.bold"
        >
          B
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click.self.prevent="commands.italic"
        >
          I
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click.self.prevent="commands.strike"
        >
          S
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click.self.prevent="commands.underline"
        >
          U
        </button>
      </div>
    </EditorMenuBar>
    <!-- Editer -->
    <EditorContent class="editor__content" :editor="context" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  HardBreak,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline
} from "tiptap-extensions";
export default {
  name: "v-text-editor",
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    content: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      context: null
    };
  },
  computed: {
    contextHTML() {
      if (this.context) return this.context.getHTML();
      return "";
    }
  },
  mounted() {
    this.context = new Editor({
      extensions: [
        new HardBreak(),
        new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline()
      ],
      content: this.content,
      onUpdate: this.handleOnChange
      // onInit: this.handleInit
      // onFocus() {},
      // onBlur() {}
    });
  },
  methods: {
    handleOnChange() {
      this.$emit("edit", this.contextHTML);
    }
  },
  beforeDestroy() {
    this.context.destroy();
  }
};
// https://github.com/scrumpy/tiptap/tree/master/examples/Components/Routes/Basic
</script>

<style scoped>
.editor {
  position: relative;
}

.editor__content {
  word-wrap: break-word;
  @apply text-gray-800;
}
.editor__content:focus {
  @apply outline-none;
}

.editor__content * {
  caret-color: currentColor;
}

.editor__content pre {
  padding: 0.7rem 1rem;
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 0.8rem;
  overflow-x: auto;
}

.editor__content pre code {
  display: block;
}

.editor__content p code {
  display: inline-block;
  padding: 0 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
}

.editor__content ol,
.editor__content ul {
  padding-left: 1rem;
}

.editor__content li > ol,
.editor__content li > p,
.editor__content li > ul {
  margin: 0;
}

.editor__content a {
  color: inherit;
}

.editor__content blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
  padding-left: 0.8rem;
  font-style: italic;
}

.editor__content blockquote p {
  margin: 0;
}

.editor__content img {
  max-width: 100%;
  border-radius: 3px;
}

.editor__content table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.editor__content table td,
.editor__content table th {
  min-width: 1em;
  border: 2px solid #ddd;
  padding: 3px 5px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}

.editor__content table td > *,
.editor__content table th > * {
  margin-bottom: 0;
}

.editor__content table th {
  font-weight: 700;
  text-align: left;
}

.editor__content table .selectedCell:after {
  z-index: 2;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}

.editor__content table .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  z-index: 20;
  background-color: #adf;
  pointer-events: none;
}

.editor__content .tableWrapper {
  margin: 1em 0;
  overflow-x: auto;
}

.editor__content .resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

.menubar {
  @apply border-gray-300 border-solid border-b pb-2;
  margin-bottom: 1rem;
  -webkit-transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}

.menubar.is-hidden {
  visibility: hidden;
  opacity: 0;
}

.menubar.is-focused {
  visibility: visible;
  opacity: 1;
  -webkit-transition: visibility 0.2s, opacity 0.2s;
  transition: visibility 0.2s, opacity 0.2s;
}

.menubar__button {
  font-weight: 700;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  background: rgba(0, 0, 0, 0);
  border: 0;
  color: #000;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}

.menubar__button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menubar__button.is-active {
  background-color: rgba(0, 0, 0, 0.1);
}

.menububble {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.2s, visibility 0.2s;
  transition: opacity 0.2s, visibility 0.2s;
}

.menububble.is-active {
  opacity: 1;
  visibility: visible;
}

.menububble__button {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  background: rgba(0, 0, 0, 0);
  border: 0;
  color: #fff;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}

.menububble__button:last-child {
  margin-right: 0;
}

.menububble__button:hover {
  background-color: hsla(0, 0%, 100%, 0.1);
}

.menububble__button.is-active {
  background-color: hsla(0, 0%, 100%, 0.2);
}

.menububble__form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.menububble__input {
  font: inherit;
  border: none;
  background: rgba(0, 0, 0, 0);
  color: #fff;
}

.icon[data-v-2b9db09d] {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.3rem;
  top: -0.05rem;
  fill: currentColor;
}

.icon__svg[data-v-2b9db09d] {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
}

.icon[data-v-2b9db09d]:first-child {
  margin-left: 0;
}

.icon[data-v-2b9db09d]:last-child {
  margin-right: 0;
}

.icon use > svg circle[data-v-2b9db09d],
.icon use > svg g[data-v-2b9db09d],
.icon use > svg path[data-v-2b9db09d],
.icon use > svg rect[data-v-2b9db09d],
body > svg circle[data-v-2b9db09d],
body > svg g[data-v-2b9db09d],
body > svg path[data-v-2b9db09d],
body > svg rect[data-v-2b9db09d],
symbol circle[data-v-2b9db09d],
symbol g[data-v-2b9db09d],
symbol path[data-v-2b9db09d],
symbol rect[data-v-2b9db09d] {
  fill: currentColor;
  stroke: none;
}

.icon use > svg [d="M0 0h24v24H0z"][data-v-2b9db09d],
body > svg [d="M0 0h24v24H0z"][data-v-2b9db09d],
symbol [d="M0 0h24v24H0z"][data-v-2b9db09d] {
  display: none;
}

.navigation[data-v-802d4490] {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0.75rem;
  background-color: #000;
  color: #fff;
}

.navigation__logo[data-v-802d4490] {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}

.navigation__icon[data-v-802d4490] {
  width: 1.5rem;
  height: 1.5rem;
}

.navigation__link[data-v-802d4490] {
  display: inline-block;
  color: hsla(0, 0%, 100%, 0.5);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.1rem 0.5rem;
  border-radius: 3px;
}

.navigation__link[data-v-802d4490]:hover {
  color: #fff;
  background-color: hsla(0, 0%, 100%, 0.1);
}

.navigation__github-link[data-v-802d4490] {
  margin-left: 0.5rem;
}

.hero[data-v-5a80d244] {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 3rem 1rem;
}

.hero__inner[data-v-5a80d244] {
  margin: 0 auto;
  max-width: 30rem;
}

.hero__logo[data-v-5a80d244] {
  width: 4rem;
  height: 4rem;
}

.hero__logo path[data-v-5a80d244] {
  fill: #fff;
}

.subnavigation[data-v-460c8f74] {
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  text-align: center;
}

@media (min-width: 600px) {
  .subnavigation[data-v-460c8f74] {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
}

.subnavigation__link[data-v-460c8f74] {
  display: inline-block;
  color: hsla(0, 0%, 100%, 0.5);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.1rem 0.5rem;
  border-radius: 3px;
}

.subnavigation__link[data-v-460c8f74]:hover {
  color: #fff;
  background-color: hsla(0, 0%, 100%, 0.1);
}

.subnavigation__link.is-exact-active[data-v-460c8f74] {
  color: #fff;
  background-color: hsla(0, 0%, 100%, 0.2);
}

.ad[data-v-d8041bf2] {
  display: block;
  padding: 1rem;
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
  transition: transform 0.2s, -webkit-transform 0.2s;
  margin: 3rem auto 0;
  width: 15rem;
}

@media (min-width: 1020px) {
  .ad[data-v-d8041bf2] {
    position: fixed;
    left: 0;
    bottom: 0;
    margin-top: 0;
  }
}

.ad__image[data-v-d8041bf2] {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 5px;
  overflow: hidden;
  -webkit-transition: -webkit-box-shadow 0.2s;
  transition: -webkit-box-shadow 0.2s;
  transition: box-shadow 0.2s;
  transition: box-shadow 0.2s, -webkit-box-shadow 0.2s;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05),
    0 2px 10px 0 rgba(0, 0, 0, 0.07);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 2px 10px 0 rgba(0, 0, 0, 0.07);
}

.ad[data-v-d8041bf2]:hover {
  -webkit-transform: translateY(-5px);
  -ms-transform: translateY(-5px);
  transform: translateY(-5px);
}

.ad:hover .ad__image[data-v-d8041bf2] {
  -webkit-box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.07),
    0 5px 20px 0 rgba(0, 0, 0, 0.06), 0 8px 40px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.07), 0 5px 20px 0 rgba(0, 0, 0, 0.06),
    0 8px 40px 0 rgba(0, 0, 0, 0.04);
}

.page__content {
  padding: 4rem 1rem;
}

.page__footer {
  text-align: center;
  margin-bottom: 2rem;
}

.page__source-link {
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.1);
  color: #000;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
}
</style>
