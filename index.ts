import {WebSocketServer} from "ws"
const wss = new WebSocketServer({
    port:3000,
    path:'/websocket'
})
const socketList:any[] = []
const sendAll = (data:any)=>{
    socketList.forEach(e=>{
        e.send?.(data)
    })
}
wss.on('connection', socket=>{
    socketList.push(socket)
    socket.on('message', async ev=>{
        console.log(ev.toString())
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
                sendAll(ev.toString())
            },
            async aa(){
                sendAll(ev.toString())
            },
            async bb(){
                sendAll(ev.toString())
            }
        }
        if(emitMap[data.emit]){
            await emitMap[data.emit]?.()
        }
    })
})
