import { Block } from "@contentarchitect/editor"
import view from "./view.vue"
import settings from "./settings.vue"
import icon from "./icon.svg"

function serializeRows (rows) {
    const data = []

    Array.from(rows).forEach(row => {
        let rowData = []
        Array.from(row.children).forEach(col => rowData.push({ value: col.innerHTML }))
        data.push(rowData)
    })

    return data;
}

export default class Table extends Block {
    static get viewComponent () {
        return view;
    }

    static get settingsComponent () {
        return settings;
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
        
        let tbodyArray = this.thead ? this.data.slice(1, this.data.length) : this.data
        
        let tbody = tbodyArray.reduce((acc, row) => {
            return acc + "<tr>" + row.reduce((acc, col) => `${acc}\n<td>${col.value}</td>`, "") + "</tr>"
        }, "");
        
        if (thead) {
            thead = `<thead>${thead}</thead>`
            tbody = `<tbody>${tbody}</tbody>`
        } else {
            thead = ''
        }

        return `<table>
            <caption>${this.caption}</caption>
            ${thead}
            ${tbody}
        </table>`
    }

    static serializeFromHTML (html) {
        const table = html.querySelector("table")
        if (!table) return this.defaultData()

        let caption = table ? table.caption : ""

        if (caption) caption = caption.innerHTML

        const data = []

        const thead = !!table.tHead

        if (thead) {
            data.push(serializeRows(table.tHead.children)[0])
        }

        Array.from(table.tBodies).forEach(tbody => {
            data.push(...serializeRows(tbody.children))
        })

		return {
			caption,
            thead,
            data
		}
	}

}