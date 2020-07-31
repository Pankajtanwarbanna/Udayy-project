module.exports = function (router) {


    // Subtraction on the Go API
    router.post('/subtraction', function (req, res) {

        let error = false;

        Object.keys(req.body).map(function(key) {
            req.body[key] = parseInt(req.body[key]);
            if(isNaN(req.body[key])) {
                error = true;
                console.log(key);
                res.json({
                    success : false,
                    message : 'ERROR : ' + key.toUpperCase() + ' is not a valid number.'
                });
            }
        });

        if(!error) {
            let _b = {
                quesCount : req.body.quesCount,
                flag : req.body.flag,
                digitMinuend : req.body.digitMinuend,
                digitSubtrahend : req.body.digitSubtrahend
            };

            let result = [];

            while (_b.quesCount--) {
                let minuend = (Math.floor(Math.random() * (Math.pow(10,_b.digitMinuend )- 1 - Math.pow(10, _b.digitMinuend-1))) + (Math.pow(10, _b.digitMinuend-1)));
                let subtrahend = (Math.floor(Math.random() * (+(Math.pow(10,_b.digitSubtrahend)-1) - +(Math.pow(10, _b.digitSubtrahend-1)))) + +(Math.pow(10, _b.digitSubtrahend-1)));

                if(_b.flag) {
                    if(minuend%10 >= subtrahend%10) {
                        minuend = minuend - (minuend%10) + (subtrahend%10) - 1;
                    }
                } else {
                    let p = 0;
                    let len = Math.min(_b.digitMinuend,_b.digitSubtrahend);

                    while(len--) {
                        let diff = Math.floor(minuend/Math.pow(10, p))%10 - Math.floor(subtrahend/Math.pow(10, p))%10;
                        //console.log(diff);
                        if(diff < 0) {
                            minuend = ( Math.floor(minuend/Math.pow(10, p)) + -(diff))*Math.pow(10, p) + minuend%Math.pow(10, p)
                        }
                        p++;
                    }
                }

                result.push({ minuend : minuend, subtrahend : subtrahend })

            }

            res.json({
                success : true,
                result : result
            })
        }

    });
    return router;
};
