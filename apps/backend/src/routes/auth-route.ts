import 'dotenv/config'
import { Router, Request, Response } from "express";
import { signupSchema } from '../validator/auth-schema';
import { generateAuthJWT, generateJWT, verifyJWT } from "../utils/jwt";

const router: Router = Router();
const NODE_ENV = process.env.NODE_ENV!;
const BACKEND_URL = process.env.BACKEND_URL!;

router.get("/", (req, res) => {
    res.send("hellow world")
})

router.post("/signup", (req: Request, res: Response) => {
    const { data, success } = signupSchema.safeParse({ ...req.body })

    if (!success) {
        res.status(500).json({ message: "Invalid Request Body" })
        return;
    }

    const token = generateJWT(data?.email);

    if (NODE_ENV === 'local') {
        console.log(`${BACKEND_URL}/api/auth/signin/post?token=${token}`);
    } else {
        // sendMail
    }

    res.json({ message: "Mail is sent to given email address" })

})

router.post("/signin", (req: Request, res: Response) => {
    const { data, success } = signupSchema.safeParse(req.body)

    if (!success) {
        res.status(500).json({ message: "Invalid Request Body" })
    }

    const token = generateJWT(data!.email);

    if (NODE_ENV === 'local') {
        console.log(`${BACKEND_URL}/api/auth/signin/post?token=${token}`);
    } else {
        // sendMail
    }

    res.json({ message: "Mail is sent to given email address" })

})


router.get("/signin/post", (req: Request, res: Response) => {
    // const { data, success } = signupSchema.safeParse(req.body)
    const token = req.query.token as string;

    console.log({ token });

    if (!token || token.length < 0) {
        res.status(500).json({ message: "Invalid Request Body" })
        return;
    }

    const { email } = verifyJWT(token)!;

    console.log({ email });

    if (!email) {
        res.json({ message: "token is expired or invalid" })
        return;
    }

    const authCookie = generateAuthJWT(email)
    res.cookie('authToken', authCookie)
    res.json({msg:"success"})
})


export default router;