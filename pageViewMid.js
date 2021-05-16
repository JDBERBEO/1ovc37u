
const PageView = require('./models/PageView')

const pageViewMid = async (req, res, next) => {
    console.log('reqUrl', req.url)

    const pageView = new PageView({
        path: req.url,
        userAgent: req.get('User-Agent')
    })
    await pageView.save()
    console.log('esto es pageView', pageView)
    
    next ()
}

module.exports = pageViewMid