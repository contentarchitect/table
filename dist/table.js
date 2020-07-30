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

	const isOldIE = typeof navigator !== 'undefined' &&
	    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
	function createInjector(context) {
	    return (id, style) => addStyle(id, style);
	}
	let HEAD;
	const styles = {};
	function addStyle(id, css) {
	    const group = isOldIE ? css.media || 'default' : id;
	    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
	    if (!style.ids.has(id)) {
	        style.ids.add(id);
	        let code = css.source;
	        if (css.map) {
	            // https://developer.chrome.com/devtools/docs/javascript-debugging
	            // this makes source maps inside style tags work properly in Chrome
	            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
	            // http://stackoverflow.com/a/26603875
	            code +=
	                '\n/*# sourceMappingURL=data:application/json;base64,' +
	                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
	                    ' */';
	        }
	        if (!style.element) {
	            style.element = document.createElement('style');
	            style.element.type = 'text/css';
	            if (css.media)
	                style.element.setAttribute('media', css.media);
	            if (HEAD === undefined) {
	                HEAD = document.head || document.getElementsByTagName('head')[0];
	            }
	            HEAD.appendChild(style.element);
	        }
	        if ('styleSheet' in style.element) {
	            style.styles.push(code);
	            style.element.styleSheet.cssText = style.styles
	                .filter(Boolean)
	                .join('\n');
	        }
	        else {
	            const index = style.ids.size - 1;
	            const textNode = document.createTextNode(code);
	            const nodes = style.element.childNodes;
	            if (nodes[index])
	                style.element.removeChild(nodes[index]);
	            if (nodes.length)
	                style.element.insertBefore(textNode, nodes[index]);
	            else
	                style.element.appendChild(textNode);
	        }
	    }
	}

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("table", [
	    _c("caption", {
	      directives: [
	        {
	          name: "edit",
	          rawName: "v-edit:[captionSettings]",
	          value: _vm.value.caption,
	          expression: "value.caption",
	          arg: _vm.captionSettings
	        }
	      ]
	    }),
	    _vm._v(" "),
	    _vm.value.thead
	      ? _c("thead", [
	          _c(
	            "tr",
	            _vm._l(_vm.value.data[0], function(col, i) {
	              return _c("th", {
	                directives: [
	                  {
	                    name: "edit",
	                    rawName: "v-edit.block.complex",
	                    value: { obj: _vm.value.data[0][i], exp: "value" },
	                    expression: "{ obj: value.data[0][i], exp: 'value' }",
	                    modifiers: { block: true, complex: true }
	                  }
	                ],
	                key: i
	              })
	            }),
	            0
	          )
	        ])
	      : _vm._e(),
	    _vm._v(" "),
	    _c(
	      "tbody",
	      _vm._l(_vm.tbody, function(row, i) {
	        return _c(
	          "tr",
	          { key: row.id },
	          _vm._l(row, function(col, j) {
	            return _c("td", {
	              directives: [
	                {
	                  name: "edit",
	                  rawName: "v-edit.block.complex",
	                  value: { obj: _vm.tbody[i][j], exp: "value" },
	                  expression: "{ obj: tbody[i][j], exp: 'value' }",
	                  modifiers: { block: true, complex: true }
	                }
	              ],
	              key: j
	            })
	          }),
	          0
	        )
	      }),
	      0
	    )
	  ])
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__ = function (inject) {
	    if (!inject) return
	    inject("data-v-672ea060_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"view.vue"}, media: undefined });

	  };
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__ = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    createInjector,
	    undefined,
	    undefined
	  );

	//

	var script$1 = {
		components: { CssGrid: editor.CssGrid, CaInput: editor.CaInput, "v-button": editor.Button },
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

	/* script */
	const __vue_script__$1 = script$1;

	/* template */
	var __vue_render__$1 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("css-grid", { attrs: { columns: ["2fr", "3fr"], gap: "8px 0" } }, [
	    _c("label", { attrs: { for: "" } }, [_vm._v("Cols")]),
	    _vm._v(" "),
	    _c(
	      "div",
	      { staticClass: "table-control" },
	      [
	        _c("v-button", { on: { click: _vm.decreaseColsCount } }, [_vm._v("-")]),
	        _vm._v(" "),
	        _c("span", [_vm._v(_vm._s(_vm.cols))]),
	        _vm._v(" "),
	        _c("v-button", { on: { click: _vm.increaseColsCount } }, [_vm._v("+")])
	      ],
	      1
	    ),
	    _vm._v(" "),
	    _c("label", { attrs: { for: "" } }, [_vm._v("Rows")]),
	    _vm._v(" "),
	    _c(
	      "div",
	      { staticClass: "table-control" },
	      [
	        _c("v-button", { on: { click: _vm.decreaseRowsCount } }, [_vm._v("-")]),
	        _vm._v(" "),
	        _c("span", [_vm._v(_vm._s(_vm.rows))]),
	        _vm._v(" "),
	        _c("v-button", { on: { click: _vm.increaseRowsCount } }, [_vm._v("+")])
	      ],
	      1
	    ),
	    _vm._v(" "),
	    _c("label", { attrs: { for: "" } }, [_vm._v("Table head")]),
	    _vm._v(" "),
	    _c("div", { staticClass: "table-control" }, [
	      _c("input", {
	        directives: [
	          {
	            name: "model",
	            rawName: "v-model",
	            value: _vm.value.thead,
	            expression: "value.thead"
	          }
	        ],
	        attrs: { type: "checkbox" },
	        domProps: {
	          checked: Array.isArray(_vm.value.thead)
	            ? _vm._i(_vm.value.thead, null) > -1
	            : _vm.value.thead
	        },
	        on: {
	          change: function($event) {
	            var $$a = _vm.value.thead,
	              $$el = $event.target,
	              $$c = $$el.checked ? true : false;
	            if (Array.isArray($$a)) {
	              var $$v = null,
	                $$i = _vm._i($$a, $$v);
	              if ($$el.checked) {
	                $$i < 0 && _vm.$set(_vm.value, "thead", $$a.concat([$$v]));
	              } else {
	                $$i > -1 &&
	                  _vm.$set(
	                    _vm.value,
	                    "thead",
	                    $$a.slice(0, $$i).concat($$a.slice($$i + 1))
	                  );
	              }
	            } else {
	              _vm.$set(_vm.value, "thead", $$c);
	            }
	          }
	        }
	      })
	    ])
	  ])
	};
	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$1 = function (inject) {
	    if (!inject) return
	    inject("data-v-a2f86986_0", { source: "\n.table-control[data-v-a2f86986] {\r\n\tdisplay: flex;\r\n\talign-items: stretch;\n}\n.table-control span[data-v-a2f86986] {\r\n\tflex: 1;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\n}\r\n", map: {"version":3,"sources":["/mnt/d/projects/@contentarchitect/table/src/settings.vue"],"names":[],"mappings":";AAgEA;CACA,aAAA;CACA,oBAAA;AACA;AAEA;CACA,OAAA;CACA,aAAA;CACA,uBAAA;CACA,mBAAA;AACA","file":"settings.vue","sourcesContent":["<template>\r\n\t<css-grid :columns=\"['2fr', '3fr']\" gap=\"8px 0\">\r\n\t\t<label for=\"\">Cols</label>\r\n\t\t<div class=\"table-control\">\r\n\t\t\t<v-button @click=\"decreaseColsCount\">-</v-button>\r\n\t\t\t<span>{{cols}}</span>\r\n\t\t\t<v-button @click=\"increaseColsCount\">+</v-button>\r\n\t\t</div>\r\n\r\n\t\t<label for=\"\">Rows</label>\r\n\t\t<div class=\"table-control\">\r\n\t\t\t<v-button @click=\"decreaseRowsCount\">-</v-button>\r\n\t\t\t<span>{{rows}}</span>\r\n\t\t\t<v-button @click=\"increaseRowsCount\">+</v-button>\r\n\t\t</div>\r\n\r\n\t\t<label for=\"\">Table head</label>\r\n\t\t<div class=\"table-control\">\r\n\t\t\t<input type=\"checkbox\" v-model=\"value.thead\" />\r\n\t\t</div>\r\n\t</css-grid>\r\n</template>\r\n\r\n<script>\r\nimport { CssGrid, CaInput, Button } from \"@contentarchitect/editor\"\r\n\r\nexport default {\r\n\tcomponents: { CssGrid, CaInput, \"v-button\": Button },\r\n\tprops: ['value'],\r\n\tdata () {\r\n\t\treturn {\r\n\t\t\temptyCell: { value: \"\" }\r\n\t\t}\r\n\t},\r\n\tcomputed: {\r\n\t\trows () {\r\n\t\t\treturn this.value.data.length\r\n\t\t},\r\n\t\tcols () {\r\n\t\t\treturn this.value.data[0].length\r\n\t\t}\r\n\t},\r\n\tmethods: {\r\n\t\tincreaseColsCount () {\r\n\t\t\tthis.value.data.forEach((row, i) => {\r\n\t\t\t\trow.push({ ...this.emptyCell })\r\n\t\t\t});\r\n\t\t},\r\n\t\tdecreaseColsCount () {\r\n\t\t\tthis.value.data.forEach((row, i) => row.pop());\r\n\t\t},\r\n\t\tincreaseRowsCount () {\r\n\t\t\tconst row = Array(this.cols).fill().map(() => ({ ...this.emptyCell }))\r\n\t\t\trow.id = Math.random()\r\n\t\t\tthis.value.data.push(row)\r\n\t\t},\r\n\t\tdecreaseRowsCount () {\r\n\t\t\tthis.value.data.pop()\r\n\t\t},\r\n\t},\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.table-control {\r\n\tdisplay: flex;\r\n\talign-items: stretch;\r\n}\r\n\r\n.table-control span {\r\n\tflex: 1;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n}\r\n</style>"]}, media: undefined });

	  };
	  /* scoped */
	  const __vue_scope_id__$1 = "data-v-a2f86986";
	  /* module identifier */
	  const __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$1 = false;
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    false,
	    createInjector,
	    undefined,
	    undefined
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
