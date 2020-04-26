'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
module.exports = {



    async justfind(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.category.search(ctx.query);
        } else {
            entities = await strapi.services.category.find(ctx.query);
        }

        //a bit of a tweak yeaa
        entities = entities.map(ctg => {

            // //only send 6 blogs per category
            // ctg.blogs = ctg.blogs.filter((e, i) => {
            //     if (i < 5) {
            //         return true;
            //     }
            // });
            //delete content
            ctg.blogs = ctg.blogs.map((e) => {
                delete e.content;
                return e;
            });
            return ctg;
        });




        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.category }));
    },
};
