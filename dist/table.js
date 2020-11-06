(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@contentarchitect/editor')) :
	typeof define === 'function' && define.amd ? define(['@contentarchitect/editor'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Table = factory(global.ContentArchitect));
}(this, (function (editor) { 'use strict';

	//

	var script = {
		props: ['value'],
		directives: {
			edit: editor.EditDirective
		},
		data () {
			return {
				captionSettings: {
					placeholder: "Table caption"
				}
			}
		},
		created () {
			this.value.data.forEach(row => {
				row.id = Math.random();
			});
		},
		methods: {
			randomKey () {
				return Math.random()
			}
		},
		computed: {
			tbody () {
				return this.value.thead
					? this.value.data.slice(1, this.value.data.length)
					: this.value.data
			}
		}
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    const options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    let hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            const originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            const existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',[_c('caption',{directives:[{name:"edit",rawName:"v-edit:[captionSettings]",value:(_vm.value.caption),expression:"value.caption",arg:_vm.captionSettings}]}),_vm._v(" "),(_vm.value.thead)?_c('thead',[_c('tr',_vm._l((_vm.value.data[0]),function(col,i){return _c('th',{directives:[{name:"edit",rawName:"v-edit.block.complex",value:({ obj: _vm.value.data[0][i], exp: 'value' }),expression:"{ obj: value.data[0][i], exp: 'value' }",modifiers:{"block":true,"complex":true}}],key:i})}),0)]):_vm._e(),_vm._v(" "),_c('tbody',_vm._l((_vm.tbody),function(row,i){return _c('tr',{key:row.id},_vm._l((row),function(col,j){return _c('td',{directives:[{name:"edit",rawName:"v-edit.block.complex",value:({ obj: _vm.tbody[i][j], exp: 'value' }),expression:"{ obj: tbody[i][j], exp: 'value' }",modifiers:{"block":true,"complex":true}}],key:j})}),0)}),0)])};
	var __vue_staticRenderFns__ = [];

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__ = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    true,
	    undefined,
	    undefined,
	    undefined
	  );

	var Add = {
	        functional: true,
	        render(_h, _vm) {
	          const { _c, _v, data, children = [] } = _vm;

	          const {
	            class: classNames,
	            staticClass,
	            style,
	            staticStyle,
	            attrs = {},
	            ...rest
	          } = data;

	          return _c(
	            'svg',
	            {
	              class: [classNames,staticClass],
	              style: [style,staticStyle],
	              attrs: Object.assign({"xmlns":"http://www.w3.org/2000/svg","height":"36","width":"36"}, attrs),
	              ...rest,
	            },
	            children.concat([_c('path',{attrs:{"d":"M29 16h-9V7a1 1 0 00-1-1h-2a1 1 0 00-1 1v9H7a1 1 0 00-1 1v2a1 1 0 001 1h9v9a1 1 0 001 1h2a1 1 0 001-1v-9h9a1 1 0 001-1v-2a1 1 0 00-1-1z"}})])
	          )
	        }
	      };

	var Remove = {
	        functional: true,
	        render(_h, _vm) {
	          const { _c, _v, data, children = [] } = _vm;

	          const {
	            class: classNames,
	            staticClass,
	            style,
	            staticStyle,
	            attrs = {},
	            ...rest
	          } = data;

	          return _c(
	            'svg',
	            {
	              class: [classNames,staticClass],
	              style: [style,staticStyle],
	              attrs: Object.assign({"xmlns":"http://www.w3.org/2000/svg","height":"36","width":"36"}, attrs),
	              ...rest,
	            },
	            children.concat([_c('rect',{attrs:{"height":"4","rx":"1","ry":"1","width":"24","x":"6","y":"16"}})])
	          )
	        }
	      };

	//

	var script$1 = {
		components: {
			CssGrid: editor.CssGrid,
			SpSwitch: editor.SpSwitch,
			SpIcon: editor.SpIcon,
			SpActionButton: editor.SpActionButton,
			Add,
			Remove,
		},
		props: ['value'],
		data () {
			return {
				emptyCell: { value: "" }
			}
		},
		computed: {
			rows () {
				return this.value.data.length
			},
			cols () {
				return this.value.data[0].length
			}
		},
		methods: {
			increaseColsCount () {
				this.value.data.forEach((row, i) => {
					row.push({ ...this.emptyCell });
				});
			},
			decreaseColsCount () {
				this.value.data.forEach((row, i) => row.pop());
			},
			increaseRowsCount () {
				const row = Array(this.cols).fill().map(() => ({ ...this.emptyCell }));
				row.id = Math.random();
				this.value.data.push(row);
			},
			decreaseRowsCount () {
				this.value.data.pop();
			},
		},
	};

	function createInjector(context, shadowRoot) {
	    return (id, style) => addStyle(style, shadowRoot);
	}
	function createStyleElement(shadowRoot) {
	    var styleElement = document.createElement('style');
	    styleElement.type = 'text/css';
	    shadowRoot.appendChild(styleElement);
	    return styleElement;
	}
	function addStyle(css, shadowRoot) {
	    const styleElement = createStyleElement(shadowRoot);
	    if (css.media)
	        styleElement.setAttribute('media', css.media);
	    if ('styleSheet' in styleElement) {
	        styleElement.styleSheet.cssText = css.source;
	    }
	    else {
	        while (styleElement.firstChild) {
	            styleElement.removeChild(styleElement.firstChild);
	        }
	        styleElement.appendChild(document.createTextNode(css.source));
	    }
	}

	/* script */
	const __vue_script__$1 = script$1;

	/* template */
	var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('css-grid',{attrs:{"columns":['2fr', '3fr'],"gap":"8px 0"}},[_c('label',{attrs:{"for":""}},[_vm._v("Cols")]),_vm._v(" "),_c('div',{staticClass:"table-control"},[_c('sp-action-button',{on:{"click":_vm.decreaseColsCount}},[_c('sp-icon',{attrs:{"icon":_vm.$options.components.Remove}})],1),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.cols))]),_vm._v(" "),_c('sp-action-button',{on:{"click":_vm.increaseColsCount}},[_c('sp-icon',{attrs:{"icon":_vm.$options.components.Add}})],1)],1),_vm._v(" "),_c('label',{attrs:{"for":""}},[_vm._v("Rows")]),_vm._v(" "),_c('div',{staticClass:"table-control"},[_c('sp-action-button',{on:{"click":_vm.decreaseRowsCount}},[_c('sp-icon',{attrs:{"icon":_vm.$options.components.Remove}})],1),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.rows))]),_vm._v(" "),_c('sp-action-button',{on:{"click":_vm.increaseRowsCount}},[_c('sp-icon',{attrs:{"icon":_vm.$options.components.Add}})],1)],1),_vm._v(" "),_c('label',{attrs:{"for":""}},[_vm._v("Table head")]),_vm._v(" "),_c('div',{staticClass:"table-control"},[_c('sp-switch',{model:{value:(_vm.value.thead),callback:function ($$v) {_vm.$set(_vm.value, "thead", $$v);},expression:"value.thead"}})],1)])};
	var __vue_staticRenderFns__$1 = [];

	  /* style */
	  const __vue_inject_styles__$1 = function (inject) {
	    if (!inject) return
	    inject("data-v-0ef8be3e_0", { source: ".table-control[data-v-0ef8be3e]{display:flex;align-items:center}.table-control span[data-v-0ef8be3e]{flex:1;display:flex;justify-content:center;align-items:center}", map: undefined, media: undefined });

	  };
	  /* scoped */
	  const __vue_scope_id__$1 = "data-v-0ef8be3e";
	  /* module identifier */
	  const __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$1 = false;

	  
	  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    true,
	    undefined,
	    undefined,
	    createInjector
	  );

	var icon = { render: function () { var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","height":"24","width":"24"}},[_c('path',{attrs:{"d":"M0 0h24v24H0z","fill":"none"}}),_c('path',{attrs:{"d":"M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"}})]) } };

	function serializeRows (rows) {
	    const data = [];

	    Array.from(rows).forEach(row => {
	        let rowData = [];
	        Array.from(row.children).forEach(col => rowData.push({ value: col.innerHTML }));
	        data.push(rowData);
	    });

	    return data;
	}

	class Table extends editor.Block {
	    static get viewComponent () {
	        return __vue_component__;
	    }

	    static get settingsComponent () {
	        return __vue_component__$1;
	    }

	    static get icon () {
	        return icon;
	    }

	    static defaultData () {
			return {
	            caption: "",
	            thead: false,
	            data: [
	                [
	                    { value: "" },
	                    { value: "" },
	                ],
	                [
	                    { value: "" },
	                    { value: "" },
	                ],
	            ]
	        }
	    }
	    
	    toHTML () {
	        let thead = this.thead && [this.data[0]].reduce((acc, row) => {
	            return acc + "<tr>" + row.reduce((acc, col) => `${acc}\n<th>${col.value}</th>`, "") + "</tr>"
	        }, "");
	        
	        let tbodyArray = this.thead ? this.data.slice(1, this.data.length) : this.data;
	        
	        let tbody = tbodyArray.reduce((acc, row) => {
	            return acc + "<tr>" + row.reduce((acc, col) => `${acc}\n<td>${col.value}</td>`, "") + "</tr>"
	        }, "");
	        
	        if (thead) {
	            thead = `<thead>${thead}</thead>`;
	            tbody = `<tbody>${tbody}</tbody>`;
	        } else {
	            thead = '';
	        }

	        return `<table>
            <caption>${this.caption}</caption>
            ${thead}
            ${tbody}
        </table>`
	    }

	    static serializeFromHTML (html) {
	        const table = html.querySelector("table");
	        if (!table) return this.defaultData()

	        let caption = table ? table.caption : "";

	        if (caption) caption = caption.innerHTML;

	        const data = [];

	        const thead = !!table.tHead;

	        if (thead) {
	            data.push(serializeRows(table.tHead.children)[0]);
	        }

	        Array.from(table.tBodies).forEach(tbody => {
	            data.push(...serializeRows(tbody.children));
	        });

			return {
				caption,
	            thead,
	            data
			}
		}

	}

	return Table;

})));
