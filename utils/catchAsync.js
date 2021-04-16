//middleware
module.exports = function(func){
    return (req, res, next) => {
        func(req, res, next).catch(next); //catches any error and passes it to next
    }
}
//func is also a function