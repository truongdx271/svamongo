'use strict';

module.exports = function (Account) {

    Account.beforeRemote('login', function (ctx, accInstance, next) {
        //Set time to live TOKEN
        ctx.req.body.ttl = 30*60;
        // if (ctx.result) {
        //     //ctx.result.ttl = 500;
        //     console.log(ctx.result);
        // }
        next();
    });
    Account.afterRemote('login', function (ctx, accInstance, next) {
        if (ctx.result) {
            console.log(ctx.result);
        }
        next();
    });
};
