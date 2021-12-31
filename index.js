const print = console.log
const len = val => val.length
const int = parseInt
const sort = (iter, key=e=>e) => iter.map(e => e).sort((a, b) => key(a) - key(b))
const min = (iter, key=e=>e) => sort(iter, key).at(0)
const max = (iter, key=e=>e) => sort(iter, key).at(-1)

var TEXT = "Sample Text Written Here", LINE_LENGTH = 50, ENDING = "#", PADDING = ":"
var OUTPUT = ""

window.onload = setup

function setup() {
    // Create the textarea inner text
    document.getElementById("text-input").innerHTML = "Documentation Boxing\n--------------------\n\nA codebase is as good as its weakest comment. Generate beautiful 'documentation boxes' on this site and simply click a button to copy them.\nIt just works."
    // Setup the line length input
    document.getElementById("length-input").onkeydown = event => {
        let key = event.key
        // print(key)
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Delete", "Backspace", ..."0123456789".split("")].includes(key)) event.preventDefault()
    }
    
    // Get the result
    generate_documentation_box()

    // Auto-Update
    document.querySelectorAll(":is(textarea, input)").forEach(ele => {
        ele.onkeyup = event => {
            generate_documentation_box()
            document.getElementById("copy-button").classList.remove("copied")
        }
    })
}

function generate_documentation_box() {
    TEXT = document.getElementById("text-input").value
    LINE_LENGTH = int(document.getElementById("length-input").value)??0
    ENDING = document.getElementById("ending-input").value
    PADDING = document.getElementById("padding-input").value
    OUTPUT = get_documentation()
    document.getElementById("result").innerHTML = process_output(OUTPUT).replace(/\n/g, "").replace(/ /g, "&nbsp;")
}

function process_output(output) {
    output = output.split("\n")
    let final_output = []
    final_output.push(`<div><e>${output.at(0)}</e></div>`)
    for(let i = 1; i < output.length - 1; ++i) {
        let line = ""
        line += `<e>${ENDING}</e>`
        line += `<pd>${PADDING}</pd>`
        line += `<t>${output[i].substr(len(ENDING)+len(PADDING), LINE_LENGTH - 2*(len(ENDING)+len(PADDING)))}</t>`
        line += `<pd>${Array.from(PADDING).reverse().join("")}</pd>`
        line += `<e>${ENDING}</e>`
        final_output.push(`<div>${line}</div>`)
    }
    final_output.push(`<div><e>${output.at(-1)}</e></div>`)
    return final_output.join("\n")
}

function get_documentation() {
    TEXT = TEXT.trim().split("\n")
    TEXT = TEXT.map(line=>line.replace(/\s+/g, " "))

    // Constraints
    let LARGEST_WORD = max(TEXT.map(line=>max(line.split(/\s+/g), len)), len)
    let MIN_LENGTH = 2*len(ENDING) + 2*len(PADDING) + len(LARGEST_WORD)
    LINE_LENGTH = Math.max(LINE_LENGTH, MIN_LENGTH)

    let effective_length = LINE_LENGTH - 2*len(ENDING) - 2*len(PADDING)
    let running_length = 0
    let final = []
    for(let line of TEXT) {
        running_length = 0
        let lines = [[]]
        for(let word of line.split(/\s+/g)) {
            if(running_length + len(lines[len(lines)-1]) + len(word) > effective_length) {
                // Push this word to the new line
                running_length = len(word)
                lines.push([word])
            }
            else {
                lines[len(lines)-1].push(word)
                running_length += len(word)
            }
        }
        final.push(...lines)
    }
    final = final.map(line => line.join(" "))
    let output = [Array(LINE_LENGTH).fill(ENDING).join("")]
    for(let line of final) {
        let right_spaces = int(effective_length / 2) - int(len(line) / 2)
        output.push(ENDING + PADDING + Array(effective_length - right_spaces - len(line)).fill(" ").join("") + line + Array(right_spaces).fill(" ").join("") + Array.from(PADDING).reverse().join("") + ENDING)
    }
    "".s
    output.push(Array(LINE_LENGTH).fill(ENDING).join(""))

    output = output.join("\n")
    return output
}

function copy() {
    navigator.clipboard.writeText(OUTPUT)
}