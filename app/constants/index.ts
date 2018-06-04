const format = msg => {
    msg = msg.split("\n").join(" ")
    msg = msg.split("  ").join(" ")
    return msg.trim()
}

export const EMPTY_MODELS_MESSAGE = format(`
    NO MODELS HAVE BEEN CREATED YET.
`)

export const EMPTY_CONTENTS_MESSAGE = format(`
    NO CONTENTS HAVE BEEN CREATED YET.
`)

export const CANT_CREATE_CONTENT_WITHOUT_MODELS = format(`
    YOU'VE YET TO CREATE ANY MODELS
    THIS IS NEEDED TO CREATE CONTENT
`)