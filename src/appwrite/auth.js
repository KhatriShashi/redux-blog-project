import {Client,Account,ID} from 'appwrite';
import Config from '../config/config';
export class AuthService{
     client = new Client();
     account;
     constructor(){
        this.client.setEndpoint(Config.appWriteUrl);
        this.client.setProject(Config.appWriteProjectId);
        this.account = new Account(this.client);
     }
     async createAccount({email,password,username}){
        try{
           const userAccount=await this.account.create(ID.unique(),email,password,username);
           if(userAccount){
            // call another method
            this.login({email,password});
           }else{
             return userAccount;
           }

        }catch(error){
            throw error;
        }
     }
     async login({email,password}){
        try{
          return await this.account.createEmailSession(email, password);
        }catch(error){
            throw error;
        }
     }
     async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
     }
     async logout(){
        try {
             return await this.account.deleteSessions();
         } catch (error) {
            throw error;
         }
     }

}

const authService=new AuthService();
export default authService;