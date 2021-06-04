import * as KakaoModule from "@react-native-seoul/kakao-login";

export default {

    async signInWithKakao() : Promise<any>{
        try{
            const token : KakaoModule.KakaoOAuthToken = await KakaoModule.login()
            if(token !== null && token !== undefined){
               return await this.getInfo()
            }
        }catch(e){
            return null;
        }
    },

    async signOutWithKakao(){
        await KakaoModule.logout();
    },

    async getInfo() : Promise<any>{
        const profile : KakaoModule.KakaoProfile | any= await KakaoModule.getProfile()
        return new Promise((resolve ,reject)=>{
            resolve(profile);
        });
    },

    async unlinkKakao(){
        // 노 구현
    }
}