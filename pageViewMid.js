const pageViewMid = (req, res, next) => {
    console.log('reqUrl', req.url)
    next ()
}

module.exports = pageViewMid