import fs from "fs"
import matter from "gray-matter"
import path from "path"

const postsDirectory = path.join(process.cwd(), "posts")

export function getPostsFiles(){
    return fs.readFileSync(postsDirectory)
}

function getPostData(fileName: string){
    const filePath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    
    // matter parses markdown content
    const {data, content} = matter(fileContent);
    // removes the file extension
    const postSlug = fileName.replace(/\.md$/, "") 

    const postData = {slug: postSlug, content, ...data}

    return postData
}

export function getAllPosts(){
    const postFiles = fs.readdirSync(postsDirectory);

    const allPosts = postFiles.map(postFile => getPostData(postFile))

    const sortedPosts = allPosts.sort((postA:any, postB: any) => postA.date > postB.date ? -1 : 1)

    return sortedPosts

}

export function getFeaturedPosts(){
    const allPosts = getAllPosts();

    const featuredPosts = allPosts.filter((post:any) => post.isFeatured)

    return featuredPosts
}

export function getPost(slug: string){
    const allPosts = getAllPosts();
    const post = allPosts.find(post => post.slug === slug)
    return post
}