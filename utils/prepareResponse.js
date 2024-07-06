const prepareResponse = (data, message, status) => {
    return { data, message, status, }
}

const errorResponse = (message, status) => {
    return { message, status }
}

module.exports = { prepareResponse, errorResponse }