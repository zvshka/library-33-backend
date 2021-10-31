export default (req, res, next) => {
    try {
        req.user = {}
        next()
    } catch (e) {

    }
}