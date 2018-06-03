const format = msg => {
    msg = msg.split("\n").join(" ")
    msg = msg.split("  ").join(" ")
    return msg.trim()
}

export const EMPTY_MODELS_MESSAGE = format(`
    NO MODELS HAVE BEEN CREATED YET.
`)

export const EMPTY_CONTENTS_MESSAGE = format(`
    NO CONTENT HAVE BEEN CREATED YET.
`)