
const PageView = require('./models/PageView')

const pageViewMid = async (req, res, next) => {
    console.log('reqUrl', req.url)

    const path = req.url

    let pageView = await PageView.findOne({path})

    if (pageView === null) {
            pageView = new PageView({
                path: req.url,
                userAgent: req.get('User-Agent')
        })
        await pageView.save()
        console.log('esto es pageView', pageView)

    }

    pageView.count++
    await pageView.save()
    
    const pageViews = await PageView.find().lean()
    console.log('pagesviews: ', pageViews)
    next ()
}

module.exports = pageViewMid