import {reactive} from "vue";

export const store = reactive({
    joinList: [],
    loginToken:false,
    changePrize:false,
    MessageText:'',
    MessageVisible:false,
    setList(value) {
        this.joinList = value
    },
    clearList(){
        this.joinList = []
    },
    changeNum(){
        this.changePrize = !this.changePrize
    },
    changeLogin(){
        this.loginToken = !this.loginToken
    },
    closeMessage(){
        this.MessageText = ''
        this.MessageVisible = false
    },
    changeMessage(val){
        this.MessageText = val
        this.MessageVisible = !this.MessageVisible
    }
})
