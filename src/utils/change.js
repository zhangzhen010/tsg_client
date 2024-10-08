import {reactive} from "vue";

export const setTing = reactive({
    setVisible:false,
    changeSet(){
        this.setVisible = true
    },
    closeSet(){
        this.setVisible = false
    }
})

export const tipbox = reactive({
    setVisible:false,
    openSet(){
        this.setVisible = true
    },
    closeSet(){
        this.setVisible = false
    }
})

export const tipText = reactive({
    setVisible:false,
    setText:'',
    openSet(val){
        this.setText = val
        this.setVisible = true
    },
    closeSet(){
        this.setText = ''
        this.setVisible = false
    }
})

