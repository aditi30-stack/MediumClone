import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import {createPostInput, signupInput, updatePostInput} from "@proj13xb/medium-common"



export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c,next)=>{
    const token = c.req.header('authorization') || ""
    try {
        const user = await verify(token, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id)
            await next()

        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }


    } catch(e) {
        c.status(500);
        return c.json({
            message: "Invalid token"
        })
    }


})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: "Inputs not correct",
            
        })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        }, 
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })
})



blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id:true,
            author: {
                select: {
                    name:true
                }

            }

            
        }
    });

	return c.json(posts);
})

blogRouter.get('/myPosts', async(c)=>{
    const authorId = c.get('userId')
    console.log(authorId)
    

    if(!authorId) {
        c.status(403)
        return c.json({
            message: "User not authenticated"
        })

    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({
            where: {
                authorId: Number(authorId)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                },
                date: true
            }
        })
        
        return c.json(blogs)
    
    } catch(e) {
        c.status(500)
        return c.json({
            message: "An Error occurred while fetching blogs"
        })
    }

})




blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.blog.findUnique({
		where: {
			id: Number(id)
		},
        select: {
            id:true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }
	});

	return c.json(post);
})

blogRouter.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.blog.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                authorId: true
            }
        });

        if (!post) {
            c.status(404);
            return c.json({
                message: "Post not found"
            });
        }

        if (post.authorId !== Number(authorId)) {
            c.status(403);
            return c.json({
                message: "You are not authorized to delete this post"
            });
        }

        await prisma.blog.delete({
            where: {
                id: Number(id)
            }
        });

        return c.json({
            message: "Post deleted successfully"
        });
    } catch (e) {
        c.status(500);
        return c.json({
            message: "An error occurred while deleting the post"
        });
    }
});


