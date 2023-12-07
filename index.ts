import {WebSocketServer} from "ws"
const wss = new WebSocketServer({
    port:3000,
    path:'/websocket'
})
wss.on('connection', socket=>{
    socket.on('message', async ev=>{
        let data:{
            [key:string]:any
            data:any
            userId?:any
            emit:any
        }
        try {
            data = JSON.parse(ev.toString())
        }catch (e){
            data = {} as any
        }
        const emitMap:any = {
            async webrtcLogin(){
                console.log(111)
            }
        }
        if(emitMap[data.emit]){
            await emitMap[data.emit]?.()
        }
    })
})
