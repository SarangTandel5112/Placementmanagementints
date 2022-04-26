import { Request} from "express";
interface RequestInterface extends Request{
    user?:any;
}
export default RequestInterface;