import express  from 'express';
import cors from "cors"
import data from "./chat.json" assert { type: "json" };
const app = express()

app.use(cors({
    origin:  process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials:true
}))

app.use(express.json({limit:"20kb"})) // it allows json 

app.use(express.urlencoded({extended:true,limit:"16kb"})) // extended allow to nesting the payload

app.use(express.static("public")) // for public static asset



app.use((err, req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(err)
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }
    console.log("error details",err)
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});
app.get("/chat",(req,res)=>{
    const chat = Object.values(data.mapping);

    const allChats = chat.map((chat) => ({
        sender: chat.message?.author?.role,
        message: typeof chat.message?.content?.parts?.[0] === "string" 
          ? chat.message?.content?.parts?.[0] 
          : JSON.stringify(chat.message?.content?.parts?.[0]) || "", // Convert objects to string safely
      }));
      
      const chats = allChats.filter((chat) => chat.message);
    res.send({length:chats.length,chats:chats})
})
export {app}