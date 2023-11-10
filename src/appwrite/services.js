import {Client,Databases,Storage,ID,Query} from 'appwrite';
import Config from '../config/config';

export class BlogServices{
    client=new Client();
    databases;
    storage;
    
    constructor(){
        this.client.setEndpoint(Config.appWriteUrl);
        this.client.setProject(Config.appWriteProjectId);
        this.databases=new Databases(this.client);
        this.storage=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    slug
                })
        } catch (error) {
            throw error;
        }
    }
    async updatePost({title,slug,content,featuredImage,status,userId,blogId}){
        try {
            return await this.databases.updateDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                blogId,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    slug
                }
            )
        } catch (error) {
            throw error;
        }
    }
    async deletePost({blogId}){
        try {
            await this.databases.deleteDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                blogId
            )
            return true;
        } catch (error) {
            throw error;
        }
    }
    async getPost({blogId}){
        try {
            return await this.databases.getDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                blogId
            )
            
        } catch (error) {
            throw error;
        }
    }
    async getAllActivePost(queries=[Query.equal("status",["active"])]){
        try {
            return await this.databases.listDocuments(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                queries
            );
        } catch (error) {
            throw error;
        }
    }

    // File Upload Services
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                Config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }
    // Delete File Services
    async deleteFile(fileId){
        try {
             await this.storage.deleteFile(
                Config.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error;
        }
    }
    // File Preview
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            Config.appWriteBucketId,
            fileId
        )
    }
}

const blogServices=new BlogServices();
export default blogServices;