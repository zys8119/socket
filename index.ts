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
        console.log(data.emit, data.userId)
        const emitMap:any = {
            async webrtcLogin(){
                sendAll(ev.toString())
            },
            async webrtcStart(){
                sendAll(ev.toString())
            },
            async webrtcResponse(){
                sendAll(ev.toString())
            }
        }
        if(emitMap[data.emit]){
            await emitMap[data.emit]?.()
        }
    })
    socket.on('close', ()=>{
        const index = socketList.indexOf((e:any)=>e === socket)
        if(index > -1){
            socketList.splice(index,1)
        }
    })
})
